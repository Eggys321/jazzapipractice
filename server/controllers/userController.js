const USER = require("../model/userModel");
const jwt = require("jsonwebtoken");
const sendEmail = require('../helpers/sendEmail')
const crypto = require('crypto')

// registration ftn

const registration = async (req, res) => {
  const { firstname, lastname, email, phonenumber, password, verifypassword } =
    req.body;

  if (
    !firstname ||
    !lastname ||
    !email ||
    !phonenumber ||
    !password ||
    !verifypassword
  ) {
    res.status(400).json({
      status: false,
      message: "all fields are required to register",
    });
    return;
  }
  if (password !== verifypassword) {
    res.status(400).json({
      status: false,
      message: "password and passwordverify must be same",
    });
    return;
  }

  try {
    const user = await USER.create({ ...req.body });
    res
      .status(201)
      .json({ success: true, message: "registration successfull", user });
  } catch (error) {
    if (error.code === 11000) {
      res
        .status(500)
        .json({ status: false, message: "Email address already in use" });
      return;
    }
    res.status(500).send(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // validation
  if (!email || !password) {
    res
      .status(400)
      .json({ status: false, message: "all fields are required to login" });
    return;
  }
  try {
    // finding a reg email and validatin email
    const user = await USER.findOne({ email });
    if (!user) {
      res.status(400).json({ status: false, message: "wrong credentials" });
      return;
    }
    // comparing password and validating password
    const auth = await user.comparePassword(password);

    if (!auth) {
      return res
        .status(400)
        .json({ status: false, message: "wrong credentials" });
    }
    // token
    const token = await user.generateToken();
    if (token) {
      res.status(201).json({
        status: true,
        user: {
          firstname: user.firstname,
          email: user.email,
        },
        message: "logged in",
        token,
      });
      return;
    }
  } catch (error) {
    res.status(500).send(error);
  }
};
// logout
const logout = async (req, res) => {
  res.json({ token: "", msg: "logged out succesfuly" });
};
// get user's name
const getUser = async (req, res) => {
  const { userId } = req.user;
  const user = await USER.findOne({ _id: userId });
  res.status(200).json({ firstname: user.firstname });
};
// isloggedIn
const isLoggedIn = (req, res) => {
    try {
      const authHeader = req.headers.authorization;
     
      const token = authHeader.split(" ")[1];
      console.log(token);  
      if (!token) {
        return res.json(false);
      }
  
      jwt.verify(token, process.env.JWT_SECRETE);
      res.json(true);
    } catch (error) {
      console.log(error.message);
      res.json(false);
    }
  };

  const forgotPassword = async(req,res,next)=>{
    const {email} = req.body;
    try {
      const user = await USER.findOne({email});
      if(!user){
        return res.status(404).json({success:false,message:"email not sent"})

      }
      const resetToken = user.getResetPasswordToken();
      await user.save()
      const resetUrl = `http://localhost:5173/passwordreset/${resetToken}`

      const message = `
      <h1>You have requested a password reset  </h1>
      <p>Please go to this link to reset your password</p>
      <a href=${resetUrl} clicktracking=off> ${resetUrl} </a>
      
      `
      
      try {
        await sendEmail({
          to:user.email,
          subject:"Password Reset Request",
          text:message
        })
        res.status(200).json({success:true,data:'Email sent'})
      } catch (error) {
        
        user.getResetPasswordToken = undefined
        user.getResetPasswordExpire = undefined
        await user.save();
        return res.status(500).json({message:"Email couldnt be sent",error})
      }
      
    } catch (error) {
      res.json(error.message)
    }
  }

  const resetPassword = async(req,res)=>{
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.resetToken).digest("hex")

    try {
      const user = await USER.findOne({
        resetPasswordToken,
        resetPasswordExpire:{$gt:Date.now()}

      })
      if(!user){
        return res.status(400).json({status:false,message:"Invalid Reset Token"})

      }
      user.password = req.body.password;
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();
      res.status(201).json({success:true,message:"Password Reset Successfull" })
      
    } catch (error) {
      res.status(500).json(error.message)
    }



  }

module.exports = {
  registration,
  login,
  getUser,
  logout,
  isLoggedIn,
  forgotPassword,
  resetPassword
};
