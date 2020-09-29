
const Cube= require("../models/Cube.js");

module.exports = (req,res)=>{
    console.log(req.login);
    Cube.find({}).then(cubes => {
        //console.log(cubes);
        res.render("index", {
            title: "Cubicle",
            cube:cubes,
            loggedIn:req.login
        });
        
    });   
};