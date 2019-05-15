import express from "express";
import path from "path";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import Promise from "bluebird";

import auth from "./routes/auth";
import users from "./routes/user";
import cards from './routes/cards';
import collection from './routes/collection';
import sets from './routes/set';
import types from './routes/pokemon_type';
import decks from './routes/decks';
import voting from './routes/voting';
import priceCards from './routes/priceCards';
import comment from './routes/comment';

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./static")));
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});


mongoose.Promise = Promise;
mongoose.connect(process.env.MONGODB_URL, { useMongoClient: true });


app.use("/api/auth", auth);
app.use("/api/users", users);
app.use("/api/cards", cards);
app.use("/api/collection", collection);
app.use("/api/sets", sets);
app.use("/api/types", types);
app.use("/api/decks", decks);
app.use('/api/voting', voting);
app.use("/api/priceCards", priceCards);
app.use("/api/comment", comment);

// app.get("/*", (req, res) => {
//     res.sendFile(path.join(__dirname, "index.html"));
// });

app.listen(8080, () => {
    console.clear();
    console.log("Running on localhost:8080");
});
