module.exports = (req,res)=>{
    res.render("about",{
        title:"About:",
        loggedIn:req.login
    });
    
 };