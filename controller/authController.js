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
              subject: " Welcome to  Covid! ",
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
              <title>welcome to riyft</title>
              <style>
                body {
                  background-color: #ffffff;
                  padding: 0;
                  margin: 0;
                  font-family: "Open Sans", sans-serif;
                  font-weight: 600;
                  color: #780ef1;
                }
                tr .span {
                  color: #780ef1;
                  box-shadow: 0px 0px 4px 0px rgb(196, 193, 193);
                }
                tr .span span {
                  color: #780ef1;
                  font-size: 14px;
                }
             
                tr .resetButton a {
                  text-decoration: none;
                  color: #030303;
                }
                tr .resetButton a:hover {
                  color: #ffffff;
                }
              </style>
            </head>
            <body style="background-color: #ffffff;   margin: 0">
              <span> </span>
              <div style="padding-left:10px;">
    Welcome To Covid
           </div> </body>
          </html>
     `,
            };
  
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
                  <title>welcome to Asli Chandi</title>
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
                                >Welcome To Asli Chandi</span
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
                                      reset your password on Asli Chandi. After you reset your password, any credit card information stored in My Account will be deleted as a security measure.
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
                                  <td>Asli Chandi wishes you the best for your journey!</td>
                                </tr>
                                <tr>
                                  <td>
                                    For any queries please feel free to contact the founders
                                    directly -
                                  </td>
                                </tr>
                                <tr>
                                <td>

                                <br/>
                                1. Ishaan Arora - 9650746842
                           <br/> 2. Murrad Beigh - 7006559176
                                <br/>
                                Regards <br/>
                                Team Asli Chandi
                                <br/>
                                 <a target='_blank' href='https://Asli Chandi.co/'>www.Asli Chandi.co</a>
                                  <br/>
                                Email -
                                team@Asli Chandi.co
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

exports.verifyOTP = (req, res) => {
  var crypto=require('crypto')
  crypto.randomBytes(32, (err, buffer) => {
    if (err) {
      res.json({error:true,data:"something went wrong" ,errMsg:err});
    } else {
      const token = buffer.toString("hex");
      // console.log(token);
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
  //console.log(req.body);
  try {
  userModel.findOne({
      ResetToken: req.body.resetToken,
      expireToken: { $gt: Date.now() },
    }).then((user) => {
      if (!user) {
        res.status(404).json("token expires");
      //  console.log("jjj", user.expireToken, Date.now());
      } else {
        console.log(req.body.password)
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
