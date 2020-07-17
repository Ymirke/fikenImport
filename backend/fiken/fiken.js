const axios = require('axios');

const shopifyOrderToFikenCustomer = shopifyObj => {
  const fikenCustomerObj = {
    name: shopifyObj.Name, // Order number (name), as names aren't unique.
    email: shopifyObj.Email,
    organizationNumber: null,
    phoneNumber: shopifyObj.Phone,
    memberNumber: null,
    customer: true,
    supplier: false,
    contactPerson: [
      {
        name: shopifyObj['Billing Name'],
        email: shopifyObj.Email,
        phoneNumber: shopifyObj['Billing Phone'],
        address: {
          streetAddress: shopifyObj['Billing Street'],
          city: shopifyObj['Billing City'],
          postCode: shopifyObj['Billing Zip'],
          country: shopifyObj['Billing Country'],
        },
      },
    ],
    currency: shopifyObj.Currency,
    language: 'English',
    inactive: false,
    address: {
      streetAddress: shopifyObj['Shipping Street'],
      city: shopifyObj['Shipping City'],
      postCode: shopifyObj['Shipping Zip'],
      country: shopifyObj['Shipping Country'],
    },
    groups: [
      'Shopify', 'webstore',
    ],
  };

  return fikenCustomerObj;
};

const shopifyOrderToFikenSale = (shopifyObj, fikenCustomerId) => {
  const dateRegex = /\d{4}-\d{2}-\d{2}/gmi;
  const dateMatch = shopifyObj['Paid at'].match(dateRegex);

  const fikenSaleObj = {
    saleNumber: shopifyObj.Id,
    date: dateMatch[0],
    kind: 'external_invoice',
    settled: true,
    totalPaid: shopifyObj.Total * 100,
    outstandingBalance: 0,
    lines: [
      {
        description: `Shopify - ${shopifyObj.Name}`,
        netPrice: (shopifyObj.Total * 100 * 75) / 100,
        vat: (shopifyObj.Total * 100 * 18.75) / 100,
        account: 3000,
        vatType: 'HIGH',
        projectId: null,
      },
    ],
    customerId: fikenCustomerId,
    currency: shopifyObj.Currency,
    dueDate: dateMatch[0],
    kid: null,
    paymentAccount: '1920:10001',
    paymentDate: dateMatch[0],
    paymentFee: null,
    projectId: null,
  };

  return fikenSaleObj;
};

const fikenGetCustomerId = async (shopifyObj, companySlug) => {
  try {
    const email = encodeURI(shopifyObj.Email);
    const response = await axios.get(`https://api.fiken.no/api/v2/companies/${companySlug}/contacts?page=0&pageSize=100&email=${email}`);
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
  shopifyOrderToFikenCustomer,
  shopifyOrderToFikenSale,
  fikenGetCustomerId,
  fikenPostCustomer,
  fikenPostSale,
};
