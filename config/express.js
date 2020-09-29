const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require("path");
const mongoose = require("mongoose");
//const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

let config =  require('./config');

module.exports = (app) => {
    //console.log(app);
    mongoose.connect('mongodb://localhost:27017/cubicle',{ useNewUrlParser: true ,useUnifiedTopology: true, serverSelectionTimeoutMS: 2000  });
    //TODO: Setup the view engine
    app.engine('.hbs', handlebars({
        defaultLayout:"main",
        partials:"partials",
        extname: ".hbs",
    }));
    app.set('view engine',".hbs");
    app.set('views', path.join(__dirname, '../views'));
    //TODO: Setup the body parser
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser())
    // parse application/json
    app.use(bodyParser.json());
    //TODO: Setup the static files
    //app.use(express.static('static'));
    app.use(express.static(path.join(__dirname, '../static')));
    // create a helper
    app.use((req,res,next)=>{
       // console.log("checking logged in or not");
        //console.log(config.loggedIn);
        if(config.loggedIn == true){
            //console.log(req.cookies.token)
            if(req.cookies.token == undefined){
                config.loggedIn=false;
            }else{
                
                decodedToken = jwt.verify(req.cookies.token, config.secret);
                if(decodedToken.username === undefined){
                    config.loggedIn=false;
                }
            }
        }else{
            //console.log(req.cookies.token);
            if(req.cookies.token!=undefined){
                decodedToken = jwt.verify(req.cookies.token, config.secret);
                if(decodedToken.username != undefined){
                    config.loggedIn=true;
                }
            }
        }
        req.login = config.loggedIn;
       // console.log(config.loggedIn?`logged in!`:`Not logged in!`);
        next();
    });

};