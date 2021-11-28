
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
   
const nodemailer = require('nodemailer');
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sender.liftronic@gmail.com',
            pass: 'xnteglcqiorzcbbl'
        }
    });
      const ldate=new Date();
    let mailDetails = {
        from: 'sender.liftronic@gmail.com',
        to: 'abdulfaiz11553@gmail.com ',
        subject: "Login Alert",
        text: req.body.message+"there was a Login in admin account  At  : "+ldate
    };
      
    mailTransporter.sendMail(mailDetails, function(err, data) {
     
     
    });
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