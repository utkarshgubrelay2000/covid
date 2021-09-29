const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");
const userModel = require("../model/userModel");
//const cartModel=require('../model/CartModel')
const nodemailer=require('nodemailer')

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "btravelclinic@gmail.com",
    pass: "btcdeveloper3",
  },
  from: "btravelclinic@gmail.com",
});
transporter.verify(function (error, success) {
  if (error) {
    console.log("error in setting transporter", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});


/////////------ User SignUp ----////////////////

exports.Signup = (req, res) => {
  const userDetails = req.body;
console.log(userDetails)
  userModel.findOne({ email: userDetails.email }).then((user) => {
    if (user) {
      res.status(404).json({ error: "email Address is already taken" });
    } else {
      bcryptjs.hash(userDetails.password, 12).then((hashedpassword) => {
        let newStudent = new userModel({
          ...userDetails,
          password: hashedpassword,
        });
        //  console.log('done');
        newStudent
          .save()
          .then((user) => {
            let toSubsciberMail = {
              to: userDetails.email,
              from: "btravelclinic@gmail.com",
              subject: " Welcome to  BT Travels Clinic ",
              html: `<html>
              <head>    
                <meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport"/>
                <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
                <meta content="date=no" name="format-detection"/>
                <meta content="address=no" name="format-detection"/>
                <meta content="telephone=no" name="format-detection"/>
                <meta name="x-apple-disable-message-reformatting"/>
                <title>
                  Emailer
                </title>
              </head>
              <body> 
                <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#eee" style="padding:10px">      
                  <tr>        
                    <td align="center" valign="top">          
                      <!-- Main -->
                      <table border="0" cellpadding="0" cellspacing="0" width="650">            
                        <tr>              
                          <td class="td" style="width:650px; min-width:650px;font-size:14px; line-height:16px;padding:0; margin:0; font-weight:normal;background:#fff;font-family: Helvetica, Arial;">  
                            <!-- Header -->
                            <div style="background:#0750a4;padding:30px">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
                                <tbody>
                                  <tr valign="top">                    
                                      <td>
                                        <div style="display:inline-flex;padding-bottom: 20px;">
                                          <div style="text-align: left;padding-right: 30px;" width="70%">
                                            <img src="https://res.cloudinary.com/dvu7miswu/image/upload/v1629272379/zdpdmcvrst1nl6uk3p28.png">
                                        
                                          </div>
                                          <div style="text-align: left;" width="30%">
                                            <img src="https://res.cloudinary.com/dvu7miswu/image/upload/v1629272379/gkj22fxycplxvb0a9cum.png" width="100%">
                                          </div>
                                        </div>
                                      </td>
                                  </tr>   
                                  <tr>
                                    <td>
                                      <div style="color:#fff;font-size: 13px;">
                                        <b>BLACKBURN TRAVEL CLINIC</b> in partnership with <b>BIOGRAD DIAGNOSTIC LABORATORIES LTD.</b>
                                      </div>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                       
                            <div style="padding:0 30px 20px 30px;background:#fff;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
                    <tbody>
                      <tr>
                        <td>
                          <div style="padding-bottom: 20px;font-size: 20px;"><b>Dear ${userDetails.firstName} ${userDetails.lastName}</b></div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                            <p style="margin-bottom: 15px;">
                                To view and make changes to your booking, or to access your results,
                                 you  must first activate your account. Click the link below to activate.
                            </p>
                            <p style="margin-bottom: 15px;">
                                <a href="https://covid-user.herokuapp.com/">
                                https://covid-user.herokuapp.com/
                                </a>
                            </p>
                            <br/>
                            <p style="margin-bottom: 15px;">
                                Your New account has been successfully created. You can visit this link.
                            </p>
                            <p style="margin-bottom: 15px;">
                                <a href="https://covid-user.herokuapp.com/">
                                https://covid-user.herokuapp.com/
                                </a>
                            </p>
                            <br/>
                            <p style="margin-bottom: 15px;">
                               This is an automatically generate email, please do not reply.
                            </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                            </div>
            
            
                             <!-- Footer -->
                            <div style="padding: 0 30px 0 30px;background: url(https://mrinvito.com/html/covid19_pcr/emailer/img/footer-bg.png);background-size: contain;background-repeat: no-repeat;background-position: bottom;">
                              <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
                                <tbody>
                                  <tr valign="bottom">  
                                      <td  width="75%">
                                          <div style="text-align: left;padding-right: 30px;padding-bottom: 16px;color: #fff;">
                                            <div style="padding-bottom:7px;font-size: 17px;">
                                              <b>Blackburn Travel Clinic</b>
                                            </div>
                                            <div style="padding-bottom:6px;font-size: 14px;">
                                              Email: <a href="mailto:blackburntravelclinic@gmail.com" style="color: #fff;text-decoration: none;">blackburntravelclinic@gmail.com</a>
                                            </div>
                                            <div style="padding-bottom:6px;font-size: 14px;">
                                              Tel: 01254 690496
                                            </div>
                                            <div style="padding-bottom:6px;font-size: 14px;">
                                              Fax: 01254 692995
                                            </div>
                                            <div style="font-size: 18px;">
                                              <a href="https://www.blackburntravelclinic.co.uk/" style="color: #fff;text-decoration: none;"><b>www.blackburntravelclinic.co.uk</b></a>
                                            </div>
                                          </div>
                                      </td>    
                                      <td>
                                           <img src="https://res.cloudinary.com/dvu7miswu/image/upload/v1629272379/avjrsbl8yhsowo0jtkn9.png" width="200px">
                                      </td>              
                                  </tr>   
                                </tbody>
                              </table>
                            </div>
            
                          </td>
                        </tr>
                      </table>
                        <!-- END Main -->
                    </td>
                  </tr>
                </table>
              </body>
            </html> `,
            // attachments: [
            //   {
            //       filename:"certificate.png",                                         
            //       path:`http:localhost:3000/certificate/${timeSlots.user.firstName}.png`,                                         
            //       contentType: 'application/image'
            //   }]
          
            }
  
            transporter.sendMail(toSubsciberMail, (err) => {
              if (err) {
                console.log(
                  "some error in sending mail to subscriber",
                  err
                );
                return res
                  .status(400)
                  .json({
                    error: "some error in sending mail to admin",
                  });
              }
              console.log("message sent successfully");
             //  res.json("Thanks for subscribing!");
            });
            res.render("login");
          })
          .catch((err) => {
            //   console.log(err.message)
            res.status(404).json({ error: err.message });
          });
      });
    }
  });
};

/////////------ User SignIn ----////////////////
exports.Signin = (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  userModel
    .findOne({ email: email })
    .then((user) => {
      if (user) {
        // console.log(password,user.password)
        bcryptjs
          .compare(password, user.password)
          .then((ifSame) => {
            //if user is normal user
            if (ifSame) {
              const token = jwt.sign(
                { secretId: user._id },
                process.env.JWT_SECRET
              );
              res.json({
                message: "SignSuccess",
                token: token,
                email: user.email,
                name: user.name,
                userId: user._id,
              });
            } else {
              res.status(400).json({ error: "Invalid password" });
            }
          })
          .catch((err) => {
            console.log("error in comparing password", err);
          });
      } else {
        res
          .status(404)
          .json({ error: "User not found of " + email + " address" });
      }
    })
    .catch((err) => {
      res
        .status(404)
        .json({ error: true, data: "Something went wrong", errMsg: err });
    });
};

exports.SignupPage = (req, res) => {
  res.render("signup");
};
exports.newPasswordPage = (req, res) => {
  console.log(req.params.token)
  res.render("newpassword",{token:req.params.token});
};
exports.LoginPage = (req, res) => {
  res.render("login");
};
exports.ForgetPasswordPage = (req, res) => {
  res.render("forgot");
};
exports.ForgetPassword = (req, res) => {
  var otpGenerator = require('otp-generator')
   let ResetOTP=otpGenerator.generate(6, { upperCase: false, specialChars: false,alphabets:false });
  //     console.log(ResetOTP);
      userModel.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          return res.status(404).json({ error: "User doesn't exist" });
        } else {
          user.otp = ResetOTP;
          user.expireToken = Date.now() + 3600000;
          user.save().then((r) => {
            let toSubsciberMail ={
              to: user.email,
              from: "btravelclinic@gmail.com",
              subject: "Welcome ",
              html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
              <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                  <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                    integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
                    crossorigin="anonymous"
                  />
                  <link rel="preconnect" href="https://fonts.gstatic.com" />
                  <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap"
                    rel="stylesheet"
                  />
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                  <title>welcome to BTC Black Burn</title>
                  <style>
                    body {
                      background-color: #ffffff;
                      padding: 0;
                      margin: 0;
                      font-family: "Open Sans", sans-serif;
                      font-weight: 600;
                      color: #803487;
                    }
                    tr .span {
                      color: #803487;
                      box-shadow: 0px 0px 4px 0px rgb(196, 193, 193);
                    }
                    tr .span span {
                      color: #803487;
                      font-size: 14px;
                    }

                    tr .resetButton a {
                      text-decoration: none;
                      color: #728b6b;
                    }
                    tr .resetButton a:hover {
                      color: #ffffff;
                    }
                  </style>
                </head>
                <body style="background-color: #ffffff;   margin: 0">
                  <span> </span>
                  <div style="padding-left:10px;">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="10"
                    height="100%"
                    bgcolor="#FFFFFF"
                    width="100%"
                    style="max-width: 650px"
                    id="bodyTable"
                  >
                    <tr>
                      <td align="center" valign="top">
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          id="emailContainer"
                          style="font-family: Arial; color:
                          #803487; padding: 10px;"
                        >
                          <tr></tr>
                          <!-- Title -->
                          <tr>
                            <td
                              align="left"
                              valign="top"
                              colspan="2"
                              class="text-center"
                              style="
                                border-bottom: 1px solid #cccccc;
                                font-weight: 700;
                                padding: 20px 0 10px 0;
                                padding-left: 10px;
                              "
                            >
                              <span style="font-size: 15px; font-weight: 600"
                                >Welcome To BTC Black Burn</span
                              >
                            </td>
                          </tr>
                          <!-- Messages -->
                          <tr>
                            <td
                              class="span"
                              align="top"
                              colspan="2"
                              style="padding-top: 10px"
                            >

                                  <span style=" line-height: 1.5;">
                                      We have sent you this email in response to your request to
                                      reset your password on BTC Black Burn. After you reset your password, any credit card information stored in My Account will be deleted as a security measure.
                                      <br/><br/>
                                      To reset your password for please follow the link below:
                                      <br/><br/>
                                      <div class=" text-center ">
          <h1>${user.otp}</h1>

                                      </div>
                                <tr>
                                  <td>Looking forward to a lot of interaction with you :)</td>
                                </tr>
                                <tr>
                                  <td>BTC Black Burn wishes you the best for your journey!</td>
                                </tr>
                                <tr>
                                  <td>
                                    For any queries please feel free to contact the founders
                                    directly -
                                  </td>
                                </tr>
                                <tr>
                                <td>

                                Regards <br/>
                                Team BTC Black Burn
                                <br/>
                                 <a target='_blank' href='mailto:btravelclinic@gmail.com'>btravelclinic@gmail.com</a>
                                  <br/>
                       
                              </td>

                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
               </div> </body>
              </html>
            `,

            };
            transporter.sendMail(toSubsciberMail, (err) => {
              if (err) {
                console.log("some error in sending mail to subscriber", err);
                return res
                  .status(400)
                  .json({ error: "some error in sending mail to admin" });
              }
              console.log("message sent successfully");
              // res.json("Thanks for subscribing!");
            });
          });
          res.json({error:false,data:"check your email"});
        }
      });

};
exports.otpCheck = (req, res) => {
  var otpGenerator = require('otp-generator')
   let otp=otpGenerator.generate(6, { upperCase: false, specialChars: false,alphabets:false });
  //     console.log(ResetOTP);
  
       console.log(otp)
            let toSubsciberMail ={
              to: req.body.email,
              from: "welcometofinladder@gmail.com",
              subject: "Otp ",
              html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
              <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                  <link
                    rel="stylesheet"
                    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                    integrity="sha384-JcKb8q3iqJ61gNV9KGb8thSsNjpSL0n8PARn9HuZOnIxN0hoP+VmmDGMN5t9UJ0Z"
                    crossorigin="anonymous"
                  />
                  <link rel="preconnect" href="https://fonts.gstatic.com" />
                  <link
                    href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap"
                    rel="stylesheet"
                  />
                  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                  <title>welcome to BTC Black Burn</title>
                  <style>
                    body {
                      background-color: #ffffff;
                      padding: 0;
                      margin: 0;
                      font-family: "Open Sans", sans-serif;
                      font-weight: 600;
                      color: #803487;
                    }
                    tr .span {
                      color: #803487;
                      box-shadow: 0px 0px 4px 0px rgb(196, 193, 193);
                    }
                    tr .span span {
                      color: #803487;
                      font-size: 14px;
                    }

                    tr .resetButton a {
                      text-decoration: none;
                      color: #728b6b;
                    }
                    tr .resetButton a:hover {
                      color: #ffffff;
                    }
                  </style>
                </head>
                <body style="background-color: #ffffff;   margin: 0">
                  <span> </span>
                  <div style="padding-left:10px;">
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="10"
                    height="100%"
                    bgcolor="#FFFFFF"
                    width="100%"
                    style="max-width: 650px"
                    id="bodyTable"
                  >
                    <tr>
                      <td align="center" valign="top">
                        <table
                          border="0"
                          cellpadding="0"
                          cellspacing="0"
                          width="100%"
                          id="emailContainer"
                          style="font-family: Arial; color:
                          #803487; padding: 10px;"
                        >
                          <tr></tr>
                          <!-- Title -->
                          <tr>
                            <td
                              align="left"
                              valign="top"
                              colspan="2"
                              class="text-center"
                              style="
                                border-bottom: 1px solid #cccccc;
                                font-weight: 700;
                                padding: 20px 0 10px 0;
                                padding-left: 10px;
                              "
                            >
                              <span style="font-size: 15px; font-weight: 600"
                                >Welcome To BTC Black Burn</span
                              >
                            </td>
                          </tr>
                          <!-- Messages -->
                          <tr>
                            <td
                              class="span"
                              align="top"
                              colspan="2"
                              style="padding-top: 10px"
                            >

                                  <span style=" line-height: 1.5;">
                                      We have sent you this email in response for Email Confimartion on BTC Black Burn.
                                     <br/><br/>
                                      To reset your password for please follow the link below:
                                      <br/><br/>
                                      <div class=" text-center ">
          <h1>${otp}</h1>

                                      </div>
                                <tr>
                                  <td>Looking forward to a lot of interaction with you :)</td>
                                </tr>
                                <tr>
                                  <td>BTC Black Burn wishes you the best for your journey!</td>
                                </tr>
                                <tr>
                                  <td>
                                    For any queries please feel free to contact the founders
                                    directly -
                                  </td>
                                </tr>
                                <tr>
                                <td>

                                Regards <br/>
                                Team BTC Black Burn
                                <br/>
                                 <a target='_blank' href='mailto:btravelclinic@gmail.com'>btravelclinic@gmail.com</a>
                                  <br/>
                       
                              </td>

                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
               </div> </body>
              </html>
            `,

            };
            transporter.sendMail(toSubsciberMail, (err) => {
              if (err) {
                console.log("some error in sending mail to subscriber", err);
                return res
                  .status(400)
                  .json({ error: "some error in sending mail to admin" });
              }
              console.log("message sent successfully");
              // res.json("Thanks for subscribing!");
            });
      
          res.json({error:false,data:otp});
        
  
};
exports.verifyOTP = (req, res) => {
  var crypto=require('crypto')
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      res.json({error:true,data:"something went wrong" ,errMsg:err});
    } else {
      const token = buffer.toString("hex");
      console.log(req.body);
      userModel.findOne({ otp:req.body.otp,email:req.body.email }).then((user) => {
        if (!user) {
          return res.status(404).json({ error: true,data:'OTP Mismatched'});
        } else {
          //   console.log(user);

          user.ResetToken = token;
          user.otp=null
          user.expireToken = Date.now() + 3600000;
          user.save().then((r) => {
            res.json({error:false,ResetToken:token});
          });
        }
      });
    }
  });
};

exports.newPassword = (req, res) => {
  console.log(req.body);
  try {
  userModel.findOne({
      ResetToken: req.body.resetToken,
      expireToken: { $gt: Date.now() },
    }).then((user) => {
      if (!user) {
        res.status(404).json("token expires");
      //  console.log("jjj", user.expireToken, Date.now());
      } else {
   
        bcryptjs.hash(req.body.password, 12).then((newpassword) => {
          user.password = newpassword;
          user.save().then((u) => {
            if (!u) {
              console.log("wrong");
               res.status(404).json({ error: true,data:'Not Changed'});

            } else {
              console.log("changed");
              user.ResetToken = null;
              user.expireToken = null;
              user.otp=null
              user.save();
              res.json({error:false,data:"successfully changed password"});
            }
          });
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
