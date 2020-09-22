let homeRouter = require("../controllers/home.js");
let aboutRouter = require("../controllers/about.js");
let createRouter = require("../controllers/createPlink.js").route;
let detailsRouter = require("../controllers/details.js");
let createData = require("../controllers/createPlink.js").data;

module.exports = (app) => {
    //console.log(app);
    app.get("/",(req,res)=>{
        homeRouter(req,res);
    });
    app.get("/about",(req,res)=>{
        aboutRouter(req,res);
    });
    app.get("/createPlink",(req,res)=>{
        createRouter(req,res);
    });
    app.post("/createPlink",(req,res)=>{
        createData(req,res);
    });
    app.get("/details/:id",(req,res)=>{
        detailsRouter(req,res);
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