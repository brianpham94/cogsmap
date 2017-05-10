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
		var locationN = req.body.search.location;
		var currentLoc = JSON.parse(req.body.search.current);
		console.log("entering search callback");
		console.log("term: " + termN);
		console.log("location: " + locationN);
		console.log("currentLoc: " + currentLoc);
		searchCallback(token, termN, locationN, currentLoc);
	}).catch(e => {
		console.log(e);
	});

	function searchCallback(token, termN, locationN, currentLoc) {
		var client = yelp.client(token);
		if(locationN == "") {
			if(termN == undefined) {
				console.log("no term");
				client.search({
					latitude: currentLoc.latitude,
					longitude: currentLoc.longitude,
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
				console.log("term found");
				client.search({
					term: termN,
					latitude: currentLoc.latitude,
					longitude: currentLoc.longitude,
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
		//currentLoc
		else {
			if(termN == undefined) {
				console.log("no term");
				client.search({
					location: locationN,
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
				console.log("term found");
				client.search({
					term: termN,
					location: locationN,
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
}
