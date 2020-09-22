const Accessory = require("../models/Accessory");
const Plink = require("../models/Accessory");
plinkData = require("../config/database.json");

module.exports = (req,res)=>{
    //console.log(cubeData)//
    
    //console.log(req.params.id);
    let plink = plinkData.find((plink)=> plink.id == req.params.id);
   
    res.render("details",{
        title:"Plink",
        plink:plink,
    });

 };