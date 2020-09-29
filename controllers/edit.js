const Cube= require("../models/Cube.js");

module.exports={
    route:(req,res)=>{
        Cube.findById(req.params.id).then(cube => {
           //console.log(cube.createdBy);
           
           
            res.render("editCube", {
                title: "Edit Cube Info",
                loggedIn:req.login,
                cube:cube,
            });
           
            
        });   
    },
    data:(req,res)=>{

        //console.log()

        Cube.findById(req.params.id)
        .then((cube) => { 
            cube.name = req.body.name;
            cube.description = req.body.description;
            cube.imageUrl = req.body.imageUrl;
            cube.difficultyLevel = req.body.difficultyLevel;

            cube.save().then((cube =>{
                console.log(cube);
                res.redirect("/details/"+req.params.id);
            })).catch(err=>{
                console.log(err);
            });

        });    
    }
};