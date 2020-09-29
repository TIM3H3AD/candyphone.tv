const Cube = require("../models/Cube.js");
const Accessory = require("../models/Accessory.js");
//deleteCube
module.exports={
    route:(req,res)=>{
        Cube.findById(req.params.id).then(cube => {
            
             res.render("deleteCube", {
                 title: "Edit Cube Info",
                 loggedIn:req.login,
                 cube:cube,
             });
             
         });   
    },
    data:(req,res)=>{
        Cube.findByIdAndDelete(req.params.id).then(cube => {
            
            Accessory.updateMany({
                    "cubes": cube._id 
                },
                { 
                    "$pull": { "cubes": cube._id } 
                }
            ).then(accessories=>{
                    console.log(accessories);
                    res.redirect("/");
                });
        
            
        });   
    }
};