const Plink = require("../models/Plink.js");
const Timestamp = require("../models/Timestamp.js");
//deleteTimestamp
module.exports={
    route:(req,res)=>{
        Plink.findById(req.params.id).then(plink => {
            
             res.render("deletePlink", {
                 title: "Edit Timestamp",
                 loggedIn:req.login,
                 plink:plink,
             });
             
         });   
    },
    data:(req,res)=>{
        Plink.findByIdAndDelete(req.params.id).then(plink => {
            
            Timestamp.updateMany({
                    "plinks": plink._id 
                },
                { 
                    "$pull": { "plinks": plink._id } 
                }
            ).then(timestamps=>{
                    console.log(timestamps);
                    res.redirect("/");
                });
        
            
        });   
    }
};