const express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
//var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var session=require('express-session');
const user = require('./routes/user');
const home = require('./routes/home');
var router = express.Router();


const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//CORS Middleware
app.use(function(req, res, next) {
    //Enabling CORS 
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, contentType, Content-Type, Accept, Authorization");
    next();
});

//view engine

app.set('view engine', 'ejs');
app.set('view options', {
    layout: false
});



//Database Connection
mongoose.connect(
    'mongodb+srv://aboli:'+'aboli' + 
    '@node-project.hsdux.mongodb.net/<dbname>?retryWrites=true&w=majority',
    {
        useNewUrlParser: true, 
        useUnifiedTopology: true 
    });

app.use('/', home);
app.use('/User', user);


module.exports = app;