'use strict';

const yelp = require('yelp-fusion');
const util = require('util');
var searchHistory = require('../searchHistory.json');

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
		console.log(req.body.search.current);
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
					searchHistory = response.jsonBody;
					console.log(searchHistory);
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
					searchHistory = response.jsonBody;
					console.log(searchHistory);
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
					searchHistory = response.jsonBody;
					console.log(searchHistory);
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
					searchHistory = response.jsonBody;
					console.log(searchHistory);
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

exports.yelpSearchReviews = function(req, res) {
	console.log("entering search Business");
	//gets the token for you
	var token;
	yelp.accessToken(clientId, clientSecret).then(response => {
		token = response.jsonBody.access_token;
		//these will be filled in by the request body
		var id = req.body.businessID;
		reviewsCallback(token, id);
	}).catch(e => {
		console.log(e);
	});

	function reviewsCallback(token, id) {
		var client = yelp.client(token);
		client.reviews(id).then(response => {
			res.json(response.jsonBody);
		}).catch(e => {
			console.log(e);
		});
	}
}


exports.viewSearch = function(req, res) {
	// Your code goes here
  res.json(searchHistory);
}