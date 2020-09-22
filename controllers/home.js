
const Plink = require("../models/Plink.js");

module.exports = (req,res)=>{

    Plink.find({}).then(plinks => {
        console.log(plinks);
        res.render("index", {
            title: "Plink",
            plink:plinks
        });
        
    });   
};