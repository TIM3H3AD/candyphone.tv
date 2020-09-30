const Plink= require("../models/Plink.js");

module.exports={
    route:(req,res)=>{
        Plink.findById(req.params.id).then(plink => {
           //console.log(plink.createdBy);
           
           
            res.render("editPlink", {
                title: "Edit Plink",
                loggedIn:req.login,
                plink:plink,
            });
           
            
        });   
    },
    data:(req,res)=>{

        //console.log()

        Plink.findById(req.params.id)
        .then((plink) => { 
            plink.name = req.body.name;
            plink.description = req.body.description;
            plink.imageUrl = req.body.imageUrl;
            plink.difficultyLevel = req.body.difficultyLevel;

            plink.save().then((plink =>{
                console.log(plink);
                res.redirect("/details/"+req.params.id);
            })).catch(err=>{
                console.log(err);
            });

        });    
    }
};