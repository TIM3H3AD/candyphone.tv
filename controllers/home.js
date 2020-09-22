
const Cube= require("../models/Cube.js");

module.exports = (req,res)=>{

    Cube.find({}).then(cubes => {
        console.log(cubes);
        res.render("index", {
            title: "Cubicle",
            cube:cubes
        });
        
    });   
};