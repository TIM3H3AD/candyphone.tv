
const Plink= require("../models/Plink.js");

module.exports = (req,res)=>{
    console.log(req.login);
    Plink.find({}).then(plinks => {
        //console.log(plinks);
        res.render("index", {
            title: "Plink",
            plink:plinks,
            loggedIn:req.login
        });
        
    });   
};