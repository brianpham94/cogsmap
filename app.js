'use strict';
/**
 * Module dependencies.
 */

 var yelp = require('yelp-fusion');
 var express = require('express');
 var http = require('http');
 var path = require('path');
 var handlebars = require('express3-handlebars')

 var index = require('./routes/index');
// var yelpTest = require('./routes/yelpFunctions');
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

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}


// Add routes here
app.get('/', index.view);
//app.get('/test', yelpTest.yelpSearch);
// Example route
// app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
