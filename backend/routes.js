const express = require("express");
const router = express.Router();
const { selectLastPrice, selectCurrencies, addDataRates } = require("./db");

  router.get("/currencies", async (req, res) => {
  const result = await selectCurrencies();
  return res.json(result);
});

router.get("/rates", (req, res) => {
  res.send("Rates");
});

router.get("/rates/:symbol", async (req, res) => {
  const { params } = req;
  const { symbol } = params;
  const result = await selectLastPrice(symbol);
  return res.json(result);
});

router.post("/rates", async (req, res) => {
  const { body } = req;

  await addDataRates(body);
  return res.sendStatus(201);
});

module.exports = router;
