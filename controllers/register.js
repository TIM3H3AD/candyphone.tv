const bcrypt = require("bcrypt");
const User = require("../models/User");
const saltRounds = 10;

module.exports ={
    route:(req,res,errorData)=>{
        res.render("register",{ 
            errorData:errorData, 
            loggedIn:req.login
        });
     },
    data:(req,res)=>{
        let username = req.body.username;
        console.log(username);
        let ptPassword = req.body.password;
   
        bcrypt.genSalt(saltRounds, (err, salt) => {
            bcrypt.hash(ptPassword, salt, (err, password) => {
                if(err){
                    console.log(err);
                }
                console.log(password);
                User.find({username:username}).then((user)=>{
                    //console.log(user);
                    if(user.length !=0){
                        console.log("username taken!");
                        res.status(500);
                        return;
                    }
                    else{
                        new User({
                            username:username,
                            password:password
                        }).save().then(newUser=>{
                            //console.log(newUser);
                            res.status(201);
                            res.redirect("/login");
                            return;
                        }).catch(err=>{
                            res.status(500);
                            return;
                        });
                    }
                });
            });
        });
        

    }
};
