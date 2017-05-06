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
		var termN = req.body.search.term;
		var locationN = "La Jolla";
		searchCallback(token, termN, locationN);
	}).catch(e => {
		console.log(e);
	});

	function searchCallback(token, termN, locationN) {
		const client = yelp.client(token);
		console.log("Given token:" + token);
		console.log("Given term:" + termN);
		console.log("Given location: " + locationN);
		client.search({
			term: termN,
			location: locationN,
			open_now: true,
			sort_by:'review_count',
		}).then(response => {
			console.log("produced JSON");
			console.log(response.jsonBody);
			res.json(response.jsonBody);
		}).catch(e => {
			console.log(e);
			console.log("failed");
			res.json({});
		});
	}
}
