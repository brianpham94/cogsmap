var data = require("../savedPlaces.json");

exports.addPlace = function(req, res) {
	(data.places).push(req.body);
}

exports.getPlace = function(req, res) {
	res.json(data.places);
}

exports.removePlace = function(req, res) {
	console.log(req.body.number);
	(data.places).splice(req.body.number, 1);
}

exports.removeAllPlaces = function(req, res) {
	data.places = [];
} 

