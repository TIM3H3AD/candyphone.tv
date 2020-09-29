const jwt = require('jsonwebtoken');

const Cube = require("../models/Cube");
const Accessory = require("../models/Accessory");
const { check, validationResult } = require('express-validator');
module.exports ={
    route:(req,res)=>{
        Cube.findById(req.params.cubeId).populate("accessories").then(cube => {
            //console.log(cube);
            console.log(cube.accessories);
            //where(_id).nin(list)
          
            Accessory.find({}).where("_id").nin(cube.accessories).then(accessories=>{
            console.log(accessories);
            //console.log(accessories.length>0)
            res.render("attachAccessory",{
                title:"Create Accessory Page",
                loggedIn:req.login,
                cube:cube,
                accessorys:accessories,
                accessoryAmount:(accessories.length>0)
            });
        });
           
            
        });   
      
       
     },
    data:(req,res)=>{
        let formData = req.body;
        console.log(formData);
        check("accessory").notEmpty().isString().trim();

        const errors = validationResult(req);
        //console.log(errors);
        if(!errors.isEmpty()){
            console.log("fail");
            res.status(422);
        }else{
            Cube.findById(req.params.cubeId)
                .then((cube) => { 
                    cube.accessories.push(req.body.accessory); 
                    cube.save().then(()=>{
                        Accessory.findById(req.body.accessory).then((accessory)=>{
                            accessory.cubes.push(req.params.cubeId); 
                            accessory.save();
                            res.redirect("/details/"+req.params.cubeId);
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

