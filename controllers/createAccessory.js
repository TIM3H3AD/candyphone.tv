const Cube = require("../models/Cube");
const Accessory = require("../models/Accessory");
const { check, validationResult } = require('express-validator');

module.exports ={
    route:(req,res)=>{
        res.render("createAccessory",{
            title:"Create Accessory Page",
            loggedIn:req.login,
        });
        
     },
    data:(req,res)=>{
        let formData = req.body;
        console.log(formData);
        check("name").notEmpty().isString().trim();
        check("description").notEmpty().isString().trim().isLength({max:200});
        check("imageUrl").notEmpty().custom(value =>{
            if (/^((https?|ftp):)?\/\/.*(jpeg|jpg|png|gif|bmp)$/.test(value)) {
                throw new Error('Please make sure you add in an image (ends in .png, .jpg, .jpeg, .gif).');
              }
              // Indicates the success of this synchronous custom validator
              return true;
        });                                             
        const errors = validationResult(req);
        //console.log(errors);
        if(!errors.isEmpty()){
            console.log("fail");
            res.status(400);
        }else{
            new Accessory(formData)
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

