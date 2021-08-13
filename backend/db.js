const mysql = require("mysql2/promise");

async function addDataRates(valueRate) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "steplix",
  });

  const query = `INSERT INTO rates (id_currency,\`value\`) VALUES (${valueRate.id_currency},'${valueRate.value}');`;

  const result = await connection.query(query);
  await connection.close();

  return result;
}

async function selectCurrencies() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "steplix",
  });

  const query = `SELECT * FROM currencies;`;
  const queryResult = await connection.query(query);
  await connection.close();

  return queryResult[0];
}

async function selectLastPrice(symbol) {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "steplix",
  });

  const query = `SELECT rates.* from rates JOIN currencies ON rates.id_currency = currencies.id WHERE symbol='${symbol}' ORDER BY created_at DESC LIMIT 1;`;
  const queryResult = await connection.query(query);
  const rate = queryResult[0][0];

  const queryCurrency = `SELECT * from currencies WHERE id = ${rate.id_currency};`;
  const queryCurrencyResult = await connection.query(queryCurrency);
  const currency = queryCurrencyResult[0][0];

  rate.currency = currency;

  await connection.close();

  return rate;
}

module.exports = {
  selectLastPrice,
  selectCurrencies,
  addDataRates,
};
