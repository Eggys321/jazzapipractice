const express = require('express');
const { registration, login, getUser, logout, isLoggedIn, forgotPassword, resetPassword } = require('../controllers/userController');
const router = express.Router();
const auth = require('../middleware/auth')


// register
router.post('/register',registration);
router.post('/login',login);
router.get('/getuser',auth,getUser);
router.post('/logout',logout);
router.get('/isLoggedIn',isLoggedIn);
router.post('/forgotpassword',forgotPassword);
router.put('/resetpassword/:resetToken',auth,resetPassword);


module.exports = router