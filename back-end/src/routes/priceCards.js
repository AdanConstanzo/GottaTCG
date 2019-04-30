import express from 'express';

import PriceAPI from "../utils/ptcgPriceAPI";

const router = express.Router();

router.get("/", (req, res) => {

  const { setname } = req.query;
  const SetName = setname.split(' ').join("%20");
  const priceAPI = new PriceAPI();
  priceAPI.PriceBySet(SetName, (status, result) => {
    res.send(result);
  })
  // getJsonHTTP(options, (statusCode, result) => {
  //   // I could work with the result html/json here.  I could also just return it
  //   res.statusCode = statusCode;
  //   res.send(result);
  // });

})

export default router;