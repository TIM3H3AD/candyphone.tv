const jwt = require('jsonwebtoken');

let config =  require('./config');

let homeRouter = require("../controllers/home.js");
let aboutRouter = require("../controllers/about.js");
let createRouter = require("../controllers/createCube.js").route;
let detailsRouter = require("../controllers/details.js");
let createData = require("../controllers/createCube.js").data;
let createAccRoute = require("../controllers/createAccessory.js").route;
let createAccData = require("../controllers/createAccessory.js").data;
let attachAccessRoute = require("../controllers/attachAccessorys.js").route;
let attachAccessData = require("../controllers/attachAccessorys.js").data;
let loginRoute = require("../controllers/login.js").route;
let loginData = require("../controllers/login.js").data;
let registerRoute = require("../controllers/register.js").route;
let registerData = require("../controllers/register.js").data;
let editRoute = require("../controllers/edit.js").route;
let editData = require("../controllers/edit.js").data;
let deleteRoute = require("../controllers/delete.js").route;
let deleteData = require("../controllers/delete.js").data;

const { check, validationResult } = require('express-validator');

module.exports = (app) => {
    // (app);
    app.get("/",(req,res)=>{
        homeRouter(req,res);
    });
    app.get("/about",(req,res)=>{
        aboutRouter(req,res);
    });
    app.get("/createCube",(req,res)=>{
        createRouter(req,res);
    });
    app.post("/createCube",[
        check("name").notEmpty().isString().trim().withMessage('Bad name'),
        check("description").notEmpty().isString().trim().isLength({max:200}).withMessage('Bad description'),
        check("imageUrl").notEmpty().trim().custom(value =>{
            //console.log(value)
            const regex = RegExp(/.*(jpeg|jpg|png|gif|bmp)$/);
            //console.log(regex.test(value))
            if (!regex.test(value)) {
                //console.log(value);
                throw new Error('Please make sure you add in an image (ends in .png, .jpg, .jpeg, .gif).');
              }
              // Indicates the success of this synchronous custom validator
              return true;
        }).withMessage('Bad image'),                                            
        check("difficultyLevel").notEmpty().isInt({ min: 1, max: 6 }).withMessage('Bad difficulty')
    ],(req,res)=>{
        const errors = validationResult(req);
        //console.log(errors);
        //console.log(!errors.isEmpty());
        if(!errors.isEmpty()){
            console.log("fail");
            res.status(422);
        }else{
            createData(req,res);
        }
    });

    app.get("/createAccessory",(req,res)=>{
        createAccRoute(req,res);
    });
    app.post("/createAccessory",(req,res)=>{
        createAccData(req,res);
    });
    
    app.get("/details/:id",(req,res)=>{
        if(config.loggedIn){
            decodedToken = jwt.decode(req.cookies.token,config.secret);
            req.userId = decodedToken._id;
        }
        
        detailsRouter(req,res);
    });
    
    app.get("/attachAccessory/:cubeId",(req,res)=>{
        attachAccessRoute(req,res);
    });
    app.post("/attachAccessory/:cubeId",(req,res)=>{
        attachAccessData(req,res);
    });
    
    app.get("/login",(req,res)=>{
        loginRoute(req,res);
    });
    app.post("/login",[
        check("username")
            .trim()
            .isString()
            .isLength({min:1})
            .withMessage('password must be filled in'),
        check("password")
            .trim()
            .isString()
            .isLength({min:1})
            .withMessage('password must be filled in')
        ],(req,res)=>{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                res.status(422);
                //console.log(errors.array());
                loginRoute(req,res,{
                    message: 'Validation failed, entered data is incorrect',
                    errors: errors.array()
                    });
                
               // console.log("error!");
            } else { 
                loginData(req,res);
            }
           
    });

    app.get("/register",(req,res)=>{
        registerRoute(req,res);
    });
    app.post("/register",[
        check("username")
            .trim()
            .isString()
            .isLength({min:1})
            .withMessage('password must be filled in'),
        check("password")
            .trim()
            .isString()
            .isLength({min:1})
            .withMessage('password must be filled in'),
        check("repeatPassword")
            .trim()
            .isString()
            .isLength({min:1})
            .withMessage('repeatPassword must be filled in')
    ],(req,res)=>{
        const errors = validationResult(req);
        let {password, repeatPassword} = req.body;
        if (!errors.isEmpty()) {
            res.status(422);
            //console.log(errors.array());
            registerRoute(req,res,{
                message: 'Validation failed, entered data is incorrect',
                errors: errors.array()
                });
            
           // console.log("error!");
        } else if(password!= repeatPassword){
            res.status(422)
            registerRoute(req,res,{
                message: 'Validation failed, entered data is incorrect',
                errors: [{
                    value: [password,repeatPassword],
                    msg: "password and repeatPassword must be the same!",
                    params: ["password","repeatPassword"],
                    location: "body"
                }]
                });
               // console.log("error!");
        } else { 
            registerData(req,res);
        }
    });
    
    app.get("/edit/:id",(req,res)=>{
        editRoute(req,res);
    });
    app.post("/edit/:id",[
        check("name").notEmpty().isString().trim().withMessage('Bad name'),
        check("description").notEmpty().isString().trim().isLength({max:200}).withMessage('Bad description'),
        check("imageUrl").notEmpty().trim().custom(value =>{
            //console.log(value)
            const regex = RegExp(/.*(jpeg|jpg|png|gif|bmp)$/);
            //console.log(regex.test(value))
            if (!regex.test(value)) {
                //console.log(value);
                throw new Error('Please make sure you add in an image (ends in .png, .jpg, .jpeg, .gif).');
              }
              // Indicates the success of this synchronous custom validator
              return true;
        }).withMessage('Bad image'),                                            
        check("difficultyLevel").notEmpty().isInt({ min: 1, max: 6 }).withMessage('Bad difficulty')
    ],(req,res)=>{
        const errors = validationResult(req);
        //console.log(errors);
        //console.log(!errors.isEmpty());
        if(!errors.isEmpty()){
            console.log("fail");
            res.status(422);
        }else{
            editData(req,res);
        }
    });
       
    app.get("/delete/:id",(req,res)=>{
        deleteRoute(req,res);
    });
    app.post("/delete/:id",(req,res)=>{
        deleteData(req,res);
    });
    app.get("/logout",(req,res)=>{
        
        config.loggedIn = false;
        res.clearCookie('token');
        res.redirect("/");
    });

    app.get("*",(req,res)=>{
        res.render('404', {
        
        });
    });
};

// function home(req,res){
//     console.log("hello");
//     res.status(200);
//     res.send('Welcome to Express.js!');
// }