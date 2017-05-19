'use strict';
/**
 * Module dependencies.
 */

 const yelp = require('yelp-fusion');
 const util = require('util');
 var express = require('express');
 var http = require('http');
 var path = require('path');
 var handlebars = require('express3-handlebars')
 var bodyParser = require('body-parser')


 var index = require('./routes/index');
 var yelpTest = require('./routes/yelpFunctions');
 var add = require('./routes/add');
// Example route
// var user = require('./routes/user');

var app = express();

// Place holders for Yelp Fusion's OAuth 2.0 credentials. Grab them
// from https://www.yelp.com/developers/v3/manage_app
const clientId = 'RxvmZHZlOnBziBSwblGheQ';
const clientSecret = 'kq7SKsZ1eQgMKuKN026UOqXwz35oLjCDDlLvfURvjeCoEfPMYvQRjeB5gsXRPcra';

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

/** bodyParser.urlencoded(options)
 * Parses the text as URL encoded data (which is how browsers tend to send form data from regular forms set to POST)
 * and exposes the resulting object (containing the keys and values) on req.body
 */
app.use(bodyParser.urlencoded({
    extended: true
}));

/**bodyParser.json(options)
 * Parses the text as JSON and exposes the resulting object on req.body.
 */
app.use(bodyParser.json());

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}


// Add routes here
app.get('/', index.view);
app.post('/test', yelpTest.yelpSearch);
app.post('/reviews', yelpTest.yelpSearchReviews);
app.post('/history', yelpTest.viewSearch);
app.post('/addPlace', add.addPlace);
app.post('/getPlace', add.getPlace);
app.post('/removePlace', add.removePlace);
app.post('/removeAllPlaces', add.removeAllPlaces);
//app.get('/test', yelpTest.yelpSearch);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
