// const nodemailer = require('nodemailer');
const { createTransport } = require("nodemailer");

require("dotenv/config");

const sendEmail = (options) => {
  const transporter = createTransport({
    host: process.env.EMAIL_SERVICE,
    port: 587,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: options.to,
    subject: options.subject,
    text: options.text
};
transporter.sendMail(mailOptions, function(error, info){
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});
  // const transporter = nodemailer.createTransport({
  //     service:process.env.EMAIL_SERVICE,
  //     port: 587,
  //     auth:{
  //         user:process.env.EMAIL_USERNAME,
  //         pass:process.env.EMAIL_PASSWORD
  //     }
  // })
  // const mailOptions = {
  //     from:process.env.EMAIL_FROM,
  //     to:options.to,
  //     subject:options.subject,
  //     html:options.text,
  // }
  // transporter.sendMail(mailOptions,function(err,info){
  //     if(err){
  //         console.log(err);
  //     }else{
  //         console.log(info);
  //     }
  // })
};

module.exports = sendEmail;
