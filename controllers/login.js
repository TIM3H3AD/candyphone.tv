const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const User = require("../models/User");
let config = require("../config/config");

module.exports ={
    route:(req,res,errorData)=>{
        res.render("login",{ errorData:errorData });
     },
    data:(req,res)=>{
        let username = req.body.username;
        console.log(username);
        let ptPassword = req.body.password;

        User.findOne({username:username}).then((user)=>{
            if(!user){
                console.log(user);
                res.status(404);
                console.log("Bad user name");
            }else{
                console.log(user);
                bcrypt.compare(ptPassword, user.password, (err, resp) => {
                    if(err){
                        res.status(500);
                        return;
                    }
                    console.log(resp); // true
                    if(resp){
                    //login procedure
                        //config.loggedIn to be true
                        config.loggedIn = true;
                        //jwt token implementation -make it into a cookie
                        let data = {
                            username:user.username,
                            _id:user._id
                        }
                        const token = jwt.sign(data, config.secret, { expiresIn: '2d'});
                        res.cookie("token", token);
                        //go home
                        res.redirect("/");
                            
                            
                    }
                });
            }

        });
        /* 
        */
    }
};
