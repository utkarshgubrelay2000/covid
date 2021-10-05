var express = require('express');
var router = express.Router();
var userAuthentication=require('../controller/authController');



/* GET home page. */
router.post('/signup',userAuthentication.Signup,err=>{
  console.log('error while signup user')
})
router.post('/check-out-login',userAuthentication.SigninCheck,err=>{
  console.log('error while signup user')
})
router.post('/check-out-signup',userAuthentication.SignupCheck,err=>{
  console.log('error while signup user')
})
router.post('/sign-up-check',userAuthentication.otpCheck,err=>{
  console.log('error while signup user')
})
router.post('/login',userAuthentication.Signin,err=>{
  console.log('error while signup user')
})
 router.get('/signup', userAuthentication.SignupPage)
 router.get('/login', userAuthentication.LoginPage)
 router.get('/check-out-signin/:type', userAuthentication.LoginPageSignin)
 router.get('/check-out-signup/:type', userAuthentication.SignupPageCheckout)



/// FORGOT PASSWORD APIS  //////
 router.post('/forgot', userAuthentication.ForgetPassword)
 router.get('/forgot-password', userAuthentication.ForgetPasswordPage)
 router.post('/verify-otp', userAuthentication.verifyOTP)
 router.post('/new-password', userAuthentication.newPassword)
 router.get('/newpassword/:token', userAuthentication.newPasswordPage)


module.exports=router