
const jwt = require("jsonwebtoken");
const secret = require("../config/config").secret;
const User = require("../models/User");
const Plink = require("../models/Plink");
const Timestamp = require("../models/Timestamp");
const { validationResult } = require('express-validator');

module.exports ={
    route:(req,res)=>{
        res.render("createPlink",{
            title:"Create Plink",
            loggedIn:req.login,
        });
        
     },
    data:(req,res)=>{
        let formData = req.body;
        //console.log(formData);
        let decodedToken = jwt.verify(req.cookies.token,secret)
            User.findById(decodedToken._id).then((user)=>{
                console.log(user);
                new Plink({
                    name:formData.name,
                    description:formData.description,
                    url:formData.url,
                    imageUrl:formData.imageUrl,
                    createdBy:user
                })
                .save().then((plink) => {
                    console.log(plink._id);
                    res.redirect("/");
                }).catch(err=>{
                    if(err){
                        console.log(err._message);
                        return;
                    }
                });
            });
           
    }   
};

function validURL(str) {
    var pattern = /​((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/i;
    console.log(pattern.test(str));
    return !!pattern.test(str);
}


 // if(formData.name ==undefined){
        //     console.log('No name!');
        //     return;
        // }
        // else if(formData.description == undefined || formData.description.length >=200){
        //     console.log('No description/ description Too long!');
        //     return;
        // }
        // else if(formData.imageUrl == undefined  || validURL(formData.imageUrl)){
        //     console.log('No Image/ invalid image url!');
        //     return;
        // }
        // else if(formData.difficultyLevel == undefined||formData.difficultyLevel < 1 ||formData.difficultyLevel >6){
        //     console.log('No Image/ invalid image url!');
        //     return;;