import mongoose from 'mongoose';
import fs from "fs";

import PriceAPI from "./ptcgPriceAPI";
import Card from "../models/Card";

mongoose.connect('mongodb://localhost/gottatcg', { useMongoClient: true });

mongoose.Promise = global.Promise;

function updatePrices(){
  const priceApi = new PriceAPI();
  const priceApiSets = priceApi.GrabSets();
  priceApiSets.forEach(set => {
    priceApi.PriceBySet(set, (status, prices) => {
      if (prices.cards === undefined) {
        fs.appendFile("error.txt", `${set}\n`)
        return;
      }
      if (status !== 200){
        return;
      }
      let tSet = set
      if (tSet === ("Sun Moon" || "Black White")) {
        tSet = set.replace(" ", " & ")
      }
      prices.cards.forEach(price => {
        Card.findOneAndUpdate(
          { "set": tSet, "number": Number(price.number) },
          { $set: {"price": Number(price.price)} }
        ).exec((err, doc) => {
          if (err) { console.log("error") }
          console.log(`${tSet}-${price.number}`);
        })
      });
    })
  })
}

updatePrices();
