const axios = require('axios');
const csv = require('csvtojson');
const {
  fikenGetCustomerId,
  fikenPostCustomer,
  fikenPostSale,
} = require('./fiken');
const {
  shopifyOrderToFikenCustomer,
  shopifyOrderToFikenSale,
} = require('./shopify');

const fikenImport = (token, companySlug, csvFilePath) => {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  axios.defaults.headers.common['Content-type'] = 'application/json';

  csv()
    .fromFile(csvFilePath)
    .then(json => {
      json.map(async shopifyPurchase => {
        let fikenCustomerId = await fikenGetCustomerId(shopifyPurchase.Email, companySlug);

        if (!fikenCustomerId) {
          const fikenCustomer = shopifyOrderToFikenCustomer(shopifyPurchase, companySlug);
          const response = await fikenPostCustomer(fikenCustomer, companySlug); // eslint-disable-next-line no-console
          if (response.status !== 201) console.log('Post customer did not result in 201.');
          fikenCustomerId = await fikenGetCustomerId(shopifyPurchase.Email, companySlug);
        }

        const fikenSale = shopifyOrderToFikenSale(shopifyPurchase, fikenCustomerId);
        return fikenPostSale(fikenSale, companySlug); // eslint-disable-next-line no-console
      });
    }).catch(err => console.error(err.message));
  return undefined;
};

module.exports.fikenImport = fikenImport;
