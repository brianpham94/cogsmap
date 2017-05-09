'use strict';

const yelp = require('yelp-fusion');
const util = require('util');

// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = 'RxvmZHZlOnBziBSwblGheQ';
const clientSecret = 'kq7SKsZ1eQgMKuKN026UOqXwz35oLjCDDlLvfURvjeCoEfPMYvQRjeB5gsXRPcra';

exports.yelpSearch = function(req, res) {
	console.log("entering search");
	//gets the token for you
	var token;
	yelp.accessToken(clientId, clientSecret).then(response => {
		token = response.jsonBody.access_token;
		//these will be filled in by the request body
		var termN = req.body.search.term;
		var locationN = JSON.parse(req.body.search.current);
		searchCallback(token, termN, locationN);
	}).catch(e => {
		console.log(e);
	});

	function searchCallback(token, termN, locationN) {
		var client = yelp.client(token);
		if(termN == undefined) {
			client.search({
				latitude: locationN.latitude,
				longitude: locationN.longitude,
				open_now: true,
				sort_by:'review_count',
			}).then(response => {
				res.json(response.jsonBody);
				console.log("return");
			}).catch(e => {
				console.log(e);
				console.log("failed");
				res.json({});
			});
		}
		else {
			client.search({
				term: termN,
				latitude: locationN.latitude,
				longitude: locationN.longitude,
				open_now: true,
				sort_by:'review_count',
			}).then(response => {
				res.json(response.jsonBody);
				console.log("return");
			}).catch(e => {
				console.log(e);
				console.log("failed");
				res.json({});
			});	
		}
	}
}
