
const Cube = require("../models/Cube");

module.exports = (req,res)=>{
    //console.log(cubeData)//
    
    //console.log(req.params.id);
    Cube.findById(req.params.id).populate("accessories").populate("createdBy").then(cube => {
        //console.log(cube);
        //console.log(cube.createdBy);
        let owned = false;
        if(req.userId == cube.createdBy._id){
            owned = true;
        }
        res.render("details", {
            title: "Cubicle",
            loggedIn:req.login,
            cube:cube,
            owned:owned,
            accessory:cube.accessories
        });   
    });   

 };