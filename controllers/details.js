
const Plink = require("../models/Plink");

module.exports = (req,res)=>{
    //console.log(plinkData)//
    
    //console.log(req.params.id);
    Plink.findById(req.params.id).populate("timestamps").populate("createdBy").then(plink => {
        //console.log(plink);
        //console.log(plink.createdBy);
        let owned = false;
        if(req.userId == plink.createdBy._id){
            owned = true;
        }
        res.render("details", {
            title: "Plink",
            loggedIn:req.login,
            plink:plink,
            owned:owned,
            timestamp:plink.timestamps
        });   
    });   

 };