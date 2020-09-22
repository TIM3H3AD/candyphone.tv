const Accessory = require("../models/Accessory");
const Cube = require("../models/Accessory");
cubeData = require("../config/database.json");

module.exports = (req,res)=>{
    //console.log(cubeData)//
    
    //console.log(req.params.id);
    let cube = cubeData.find((cube)=> cube.id == req.params.id);
   
    res.render("details",{
        title:"Cubicle",
        cube:cube,
    });

 };