
const fs=require('fs')
const bcrypt=require("bcryptjs")
const logindetails = require('../logindetails');
const verify=async(req,res,next)=>{



const valid=await bcrypt.compare(req.body.pass,logindetails.pass)

if(!valid)
{
    req.session.success=null;
    req.session.errors="Login Failed"

return res.status(401).send("Incorrect Password")

}
else
{
   
    req.session.success="Intern@lC@ll";
  
res.redirect("/additem")

}







}

const logout=(req,res,next)=>{


    req.session.success=false;

    res.redirect("/login")

}

module.exports={


    verify,
    logout
}