const jwt = require('jsonwebtoken');

const Plink = require("../models/Plink");
const Timestamp = require("../models/Timestamp");
const { check, validationResult } = require('express-validator');
module.exports ={
    route:(req,res)=>{
        Plink.findById(req.params.plinkId).populate("timestamps").then(plink => {
            //console.log(plink);
            console.log(plink.timestamps);
            //where(_id).nin(list)
          
            Timestamp.find({}).where("_id").nin(plink.timestamps).then(timestamps=>{
            console.log(timestamps);
            //console.log(timestamps.length>0)
            res.render("attachTimestamp",{
                title:"Create Timestamp",
                loggedIn:req.login,
                plink:plink,
                timestamps:timestamps,
                timestampSize:(timestamps.length>0)
            });
        });
           
            
        });   
      
       
     },
    data:(req,res)=>{
        let formData = req.body;
        console.log(formData);
        check("timestamp").notEmpty().isString().trim();

        const errors = validationResult(req);
        //console.log(errors);
        if(!errors.isEmpty()){
            console.log("fail");
            res.status(422);
        }else{
            Plink.findById(req.params.plinkId)
                .then((plink) => { 
                    plink.timestamps.push(req.body.timestamp); 
                    plink.save().then(()=>{
                        Timestamp.findById(req.body.timestamp).then((timestamp)=>{
                            timestamp.plinks.push(req.params.plinkId); 
                            timestamp.save();
                            res.redirect("/details/"+req.params.plinkId);
                        });
                    });
                });

           
        }   
    
    }
};

function validURL(str) {
    var pattern = /​((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/i;
    console.log(pattern.test(str));
    return !!pattern.test(str);
}

