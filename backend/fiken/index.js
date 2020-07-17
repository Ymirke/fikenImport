const axios = require('axios');
const csv = require('csvtojson');
const {
  shopifyOrderToFikenCustomer,
  shopifyOrderToFikenSale,
  fikenGetCustomerId,
  fikenPostCustomer,
  fikenPostSale,
} = require('./fiken.js');

const fikenImport = (token, companySlug, csvFilePath) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.defaults.headers.common['Content-type'] = 'application/json';

  csv()
    .fromFile(csvFilePath)
    .then(json => {
      json.map(async shopifyPurchase => {
        let fikenCustomerId = await fikenGetCustomerId(shopifyPurchase, companySlug);

        if (!fikenCustomerId) {
          const fikenCustomer = shopifyOrderToFikenCustomer(shopifyPurchase, companySlug);
          const response = fikenPostCustomer(fikenCustomer, companySlug); // eslint-disable-next-line no-console
          if (response.status !== 201) console.log('Post customer did not result in 201.');
          fikenCustomerId = await fikenGetCustomerId(shopifyPurchase, companySlug);
        }

        const fikenSale = shopifyOrderToFikenSale(shopifyPurchase, fikenCustomerId);
        return fikenPostSale(fikenSale, companySlug); // eslint-disable-next-line no-console
      });
    }).catch(err => console.error(err.message));
  return undefined;
};

module.exports.fikenImport = fikenImport;
