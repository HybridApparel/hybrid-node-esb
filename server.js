
var application_root 	= __dirname,
    express          	= require('express'),
    bodyParser       	= require('body-parser'),
    path             	= require('path'),
    logger           	= require('morgan'),
    models              = require('./models'),
    artGunRouter    	= require('./routers/artgun_router.js'),
    Sequelize           = require('sequelize');


var app = express();

if (process.env.NODE_ENV !== "test") {
  app.use( logger('dev') );
};

app.use( bodyParser.urlencoded({ extended: false }) );
app.use( bodyParser.json() );
app.use( express.static( path.join( application_root, 'public' )));
app.use( express.static( path.join( application_root, 'browser' )));

app.use('/artgun', artGunRouter);

module.exports = app;