const download = require('image-downloader');
const mongoose = require("mongoose");
const fs = require('fs');

mongoose.connect('mongodb://localhost/gottatcg', { useMongoClient: true });

mongoose.Promise = global.Promise;


const Card = require('../models/Card');
const Set = require('../models/Sets');

function DownloadSet(err, cards) {
  if (err) return err;
  cards.forEach((ele) => {
    if (!fs.existsSync(`images/cards/${ele.set_code}`)) {
      fs.mkdirSync(`images/cards/${ele.set_code}`);
    }
    const option = {
      url: ele.image_url.replace("/images/cards/", "https://images.pokemontcg.io/"),
      dest: `images/cards/${ele.set_code}/${ele.number}.png` 
    }
    download.image(option)
    .then((filename) => {
      console.log('File saved to', filename)
    }).catch((error) => {
      throw error
    });
  })
}


function GetSet(set){
  Card.find({ set_code: set.code })
  .exec(DownloadSet)
}

Set
  .find()
  .exec((err, sets) => {
    let count = 1;
    GetSet(sets[0]);
    const interval = setInterval(() => {
      GetSet(sets[count])
      if (count === sets.length-1) {
        clearInterval(interval);
        mongoose.disconnect()
        return;
      }
      count += 1
    }, 10000);
  })


