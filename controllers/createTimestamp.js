const Timestamp = require("../models/Timestamp");
const { check, validationResult } = require('express-validator');

module.exports ={
    route:(req,res)=>{
        res.render("createTimestamp",{
            title:"Add Timestamp",
            loggedIn:req.login,
        });
        
     },
    data:(req,res)=>{
        let formData = req.body;
        console.log(formData);
        check("name").notEmpty().isString().trim();
        check("description").notEmpty().isString().trim().isLength({max:200});
        const errors = validationResult(req);
        //console.log(errors);
        if(!errors.isEmpty()){
            console.log("fail");
            res.status(400);
        }else{
            new Timestamp(formData)
            .save().then((acc) => {
                console.log(acc._id);
                res.status(201);
                res.redirect("/");
            }).catch(err=>{
                if(err){
                    console.log(err._message);
                    return;
                }
            });
           
        }   
    
    }
};

function validURL(str) {
    var pattern = /​((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/i;
    console.log(pattern.test(str));
    return !!pattern.test(str);
}