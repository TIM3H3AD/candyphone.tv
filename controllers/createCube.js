
const jwt = require("jsonwebtoken");
const secret = require("../config/config").secret;
const User = require("../models/User");
const Cube = require("../models/Cube");
const Accessory = require("../models/Accessory");
const { validationResult } = require('express-validator');

module.exports ={
    route:(req,res)=>{
        res.render("createCube",{
            title:"Create Cube Page",
            loggedIn:req.login,
        });
        
     },
    data:(req,res)=>{
        let formData = req.body;
        //console.log(formData);
        let decodedToken = jwt.verify(req.cookies.token,secret)
            User.findById(decodedToken._id).then((user)=>{
                console.log(user);
                new Cube({
                    name:formData.name,
                    description:formData.description,
                    imageUrl:formData.imageUrl,
                    difficultyLevel:formData.difficultyLevel,
                    createdBy:user
                })
                .save().then((cube) => {
                    console.log(cube._id);
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
        //     return;