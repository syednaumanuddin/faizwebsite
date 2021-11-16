
const nodemailer = require('nodemailer');
const sendemail=async(req,res,next)=>{

    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'sender.liftronic@gmail.com',
            pass: 'rentAl@8855'
        }
    });
      
    let mailDetails = {
        from: 'sender.liftronic@gmail.com',
        to: 'inquiry.liftronic@gmail.com',
        subject: 'Liftronic Enquiry By '+req.body.fullname,
        text: req.body.message+"Contact No  ."+req.body.contactno +"email ID :"+req.body.emailid
    };
      
    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log('Error Occurs'+err.message);

            res.redirect('/emailerror')
        } else {
            res.redirect('/emailsent');
        }
    });


}

module.exports={

sendemail
}