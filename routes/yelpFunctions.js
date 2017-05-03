/*
'use strict';

const yelp = require('yelp-fusion');

// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = 'RxvmZHZlOnBziBSwblGheQ';
const clientSecret = 'kq7SKsZ1eQgMKuKN026UOqXwz35oLjCDDlLvfURvjeCoEfPMYvQRjeB5gsXRPcra';

exports.yelpSearch = function(req, res) {
	//gets the token for you
	var token;
	yelp.accessToken(clientId, clientSecret).then(response => {
		token = response.jsonBody.access_token;
		//these will be filled in by the request body
		var termN;
		var locationN;
		var categoriesN;
	}).catch(e => {
		console.log(e);
	});

	function searchCallback(token, termN, locationN, categoriesN) {
		const client = yelp.client(token);
		client.search({
			term: termN,
			location: locationN,
			open_now: true,
			attributes: 'hot_and_new,deals,waitlist_reservation',
			sort_by:'review_count',
			categories: categoriesN
		}).then(response => {
			res.json(response.jsonBody.businesses);
		}).catch(e => {
			console.log(e);
			res.json({});
		});
	}
}

*/