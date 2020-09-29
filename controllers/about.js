module.exports = (req,res)=>{
    res.render("about",{
        title:"About Page",
        loggedIn:req.login
    });
    
 };