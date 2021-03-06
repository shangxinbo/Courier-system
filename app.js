
'use strict';

const express = require('express');
const mongoose = require('mongoose');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const join = require('path').join;

const app = express();
const DB = 'mongodb://shang:shang123@127.0.0.1:27017/yunda';  //mongodb server

app
    .set('env','test')
    .use(express.static(join(__dirname, 'public')))
    .set('views', join(__dirname, 'views'))
    .set('view engine', 'jade')
    .use(favicon(join(__dirname, 'public', 'favicon.ico')))
    .use(logger('dev'))
    .use(cookieParser())
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({extended: false}))
    .use(session({
        resave:true,
        saveUninitialized:true,
        secret: 'carry up',
        store: new mongoStore({
            url: DB,
            autoRemove: 'interval',
            autoRemoveInterval: 10  // In minutes. Default
        })
    }))
    .use(function(req,res,next){
        res.locals.url = req.url;
        next();
    });

module.exports = app;
require('./configs/routes')(app);
mongoose.connect(DB);
