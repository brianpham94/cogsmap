'use strict';

const yelp = require('yelp-fusion');

// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = 'RxvmZHZlOnBziBSwblGheQ';
const clientSecret = 'kq7SKsZ1eQgMKuKN026UOqXwz35oLjCDDlLvfURvjeCoEfPMYvQRjeB5gsXRPcra';

const searchRequest = {
  term:'coffee',
  location: '8540 costa verde blvd'
};

yelp.accessToken(clientId, clientSecret).then(response => {
  const client = yelp.client(response.jsonBody.access_token);

  client.search(searchRequest).then(response => {
    const firstResult = response.jsonBody.businesses[0];
    const prettyJson = JSON.stringify(firstResult, null, 4);
    console.log(prettyJson);
  });
}).catch(e => {
  console.log("Catched the error");
  console.log(e);
});