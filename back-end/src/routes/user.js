import express from "express";
import mongoose from 'mongoose';
import multer from 'multer';
import path from 'path';
import Grid from 'gridfs-stream';
import GridFsStorage from 'multer-gridfs-storage';
import crypto from 'crypto';


import User from "../models/User";
import parseErrors from "../utils/parseErrors";
import { sendConfirmationEmail } from "../mailer";
import authentication from '../middlewares/authenticate'; 


let gfs;
const mongoURI = "mongodb://localhost/gottatcg";

mongoose.connect('uri', (err) => {
    if (!err) {
        gfs = Grid(mongoose.db, mongoose.mongo);
        gfs.collection('uploads');
    } else {
        const conn = mongoose.createConnection(mongoURI);
        conn
            .once('open', () => {
                gfs = Grid(conn.db, mongoose.mongo);
                gfs.collection('uploads');
            })

    }
    // If no error, successfully connected
});

const router = express.Router();

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename,
                    bucketName: 'uploads'
                };
                return resolve(fileInfo);
            });
        });
    }
});

// filtes for images extensions only.
const imageFilter = (req, file, cb) =>{
    // accept image only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    return cb(null, true);
};


const upload = multer({ storage, fileFilter:imageFilter });
// html name must be file to match upload.
const sUpload = upload.single('file');


// creates an account
router.post("/", (req, res) => {
    const { email, password, username } = req.body.user;
    const user = new User({ email });
    user.setPassword(password);
    user.username = username;
    user.setConfirmationToken();
    user
        .save()
        .then(userRecord => {
            sendConfirmationEmail(userRecord);
            res.json({ user: userRecord.toAuthJSON(), _id: userRecord._id });
        })
        .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));
});


// email.
router.put('/', authentication, (req, res) => {
  const change = {};
  // loops through all user keys from body and appends only changed values ( in case accidently sent too much information ).
  req.body.user.forEach(ele  => {
    if ( req.body.user[ele] !== req.currentUser[ele] && req.currentUser[ele] !== undefined )
      change[ele] = req.body.user[ele];
  });

  if (Object.keys(change).length > 0) {
    User
    .findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(req.currentUser._id) },
      { $set: change },
      { new: true, runValidators: true, context: 'query'  },
      (err, userDoc) =>{
        if(err) {
          res.status(400).json({ errors: parseErrors(err.errors) });
          return;
        }
        
        if (change.email !== undefined) {
          res.status(201).json({ user: userDoc.toAuthJSON() });
        } else {
          res.status(201).json({ user: userDoc });
        }
      });
  } else {
    res.status(200).json({message: "no change made."});
  }
});

/**
 * @description Returns username of a user
 * @param {String} Id - id of the user by query
 */
router.get('/public', (req,res) => {
    const { id } = req.query;
    User
        .findOne({ _id: mongoose.Types.ObjectId(id)}, {username:1})
        .exec((error,user) => {
            res.send(user)
        });

});

// route for posting image.
router.post('/userImage', sUpload, (req, res) => {

    if (!req.file) {
        return res.json({ error: "No file" })
    }
    
    const { UserId } = req.query;
   
    return User.findByIdAndUpdate(
        { _id: mongoose.Types.ObjectId(UserId) },
        { $set: { profileId: req.file.id, profileImage: req.file.filename }})
        .exec((err, doc)=>{
            if (err) return err;
            return res.status(200).json({ profileImage: doc.profileImage })
        })
});


/**
 * @description Returns static image
 * @param { String } filename - the file name of the image
 * @returns The statice image of the file name
 */
router.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        // Check if file
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exists'
            });
        }

        // Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            // Read output to browser
            const readstream = gfs.createReadStream(file.filename);
            return readstream.pipe(res);
        }
        return res.status(404).json({
            err: 'Not an image'
        });
    });
});

/**
 * @description Returns current user from user token
 * @requires Authentication
 * @returns username, email, profileImage, profileId
 */
// Returns current user that is logged on from token.
router.get('/', authentication, (req, res) => {
    User
        .findOne({ _id: mongoose.Types.ObjectId(req.currentUser._id) }, { username: 1, email: 1, profileImage: 1, profileId: 1 })
        .exec((err, user) => {
            if (err) return res.send(user);
            return res.status(200).json({user});
        })
})

export default router;
