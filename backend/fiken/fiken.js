const axios = require('axios');

const fikenGetCustomerId = async (email, companySlug) => {
  try {
    const uriEmail = encodeURI(email);
    const response = await axios.get(`https://api.fiken.no/api/v2/companies/${companySlug}/contacts?page=0&pageSize=100&email=${uriEmail}`);
    if (response.status === 200 && response.data.length) {
      return response.data[0].contactId;
    }
    return false;
  } catch (err) { // eslint-disable-next-line no-console
    console.error(err.message, 'fikenGetCustomerId');
  }
  return undefined;
};

const fikenPostCustomer = async (fikenCustomerObj, companySlug) => {
  try {
    const response = await axios.post(`https://api.fiken.no/api/v2/companies/${companySlug}/contacts`, fikenCustomerObj);
    if (response.status === 201) {
      return response.data;
    }
    throw new Error('Error posting fikenCustomer');
  } catch (err) { // eslint-disable-next-line no-console
    console.error(err.message, 'fikenPostCustomer');
  }
  return undefined;
};

const fikenPostSale = async (fikenObj, companySlug) => {
  try {
    const response = await axios.post(`https://api.fiken.no/api/v2/companies/${companySlug}/sales`, fikenObj);
    if (response.status === 201) { // eslint-disable-next-line no-console
      return console.log('Purchase added successfully');
    }
    throw new Error('Error posting fikenSale');
  } catch (err) { // eslint-disable-next-line no-console
    console.error('fikenPostSale', err);
  }
  return undefined;
};

module.exports = {
  fikenGetCustomerId,
  fikenPostCustomer,
  fikenPostSale,
}
