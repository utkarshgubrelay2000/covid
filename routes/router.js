var express = require('express');
var router = express.Router();
const registerController=require('../controller/routerController')
const bookingController=require('../controller/bookingController')
var mutter=require('multer')
var path=require('path');
const verifyAdmin = require('../middleware/verifyAdmin');
const requireLogin  = require('../middleware/requireLogin');
const TimeSlots = require('../model/timeSlots');
const stripe=require('stripe')('sk_test_51IOluBGlqCnXQgM3ZFPmiFzEzyKmVUO9MwjXaQ6dmROPbv0v1ZmIUH8YAq3X50DQR2FfagyyNLKpIoZLiI8HKXxJ00eMZxOuTw')
const nodemailer=require('nodemailer');


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
/* GET home page. */
router.get('/',registerController.homePage)
 router.get('/contact-us',registerController.contact)
 router.get('/about-us',registerController.about)
 router.get('/faq',registerController.faq)
 router.post('/faq',registerController.loadMoreFaqs)
 router.get('/appointment',registerController.appointment)
 router.get('/choose-slots/:name/:packId',registerController.chooseslots)
 router.get('/choose-slots-days-home/:name/:packId',registerController.chooseslots)
 router.get('/choose-slots-home/:name/:packId',registerController.chooseslotsHome)
 router.post('/contact-details',registerController.contactdetails)
 router.post('/contact-details-pcr',registerController.contactdetailsPCr)
 router.post('/contact-details-home',registerController.contactdetailsHome)
 router.post('/contact-form-for-258',registerController.contactdetails258)
 router.post('/Arriving-in-England-booking',registerController.contactdetailsforArrivinginEngland)
 router.get('/diphtheria',registerController.diphteria)
 router.get('/privacy-policy',(req,res)=>{
   res.render('privacy-policy')
 })
 router.get('/what-we-offer',(req,res)=>{
  res.render('what-we-offer')
})
 router.get('/terms-conditions',(req,res)=>{
  res.render('terms-conditions')
})
 router.get('/find-test-center',registerController.findtestcenter)
 router.get('/notification',registerController.notification)
 router.get('/settings',registerController.settings)
 router.get('/tests-listing',registerController.testslisting)
 router.get('/getTestById/:name/:id',registerController.testsbyId)
 router.patch('/get-slot-details',registerController.getSlotsDetails)
 router.get('/test-summary',registerController.testsummary)
 router.get('/testimonials',registerController.getAlltestimonials)
 router.get('/test-Terms',registerController.testTerms)
 router.get('/appointment',registerController.appointment)
 router.post('/get-avaiable-session',bookingController.getSlots)
 router.post("/create",registerController.createBooking);
 router.post("/create-pcr-pcr-and-single",registerController.createpcrandsingle);
 
 router.post("/create-home",registerController.createBookingHome);
 router.post("/create-arrival",registerController.createBookingArrival);
 router.post("/create-booking-258",registerController.createBooking258);
 router.get("/pages",registerController.getAllPage);
 router.get("/page/:id",registerController.getPageById);
 router.get("/profile/:token",requireLogin,registerController.profile);
 router.get("/notification/:token",requireLogin,registerController.notification);
 router.get("/appointment-bookings/:token",requireLogin,registerController.appointment);
 router.post("/post-appointment",requireLogin,registerController.paginationappointment);
 router.post("/cancel-booking",registerController.cancelMySlot);
 router.get("/after-your-test",registerController.afterYourTest);
 router.get("/preparing-for-your-test",registerController.preparingforyourtest);
 router.get("/prices",registerController.prices);
 router.post("/payment-stripe",registerController.PaymentStripe);
 router.get("/get-time-slots").get(async (req, res) => {
    function addDays(theDate, days) {
      return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
    }
    // let today = new Date()
    let newDate = new Date();
    let nextDate = addDays(newDate, 1);
  
    const tests = await Test.find();
    const slots = await bookingController.find({
      test: tests[0]._id,
      booked: false,
      bookedFor: { $gt: newDate, $lt: nextDate },
    });
    const users = await User.find();
    // console.log(users);
    res.json({
      tests,
      slots,
      users: users.filter(
        (el) => el.firstName && (el.role === "user" || el.role === "User")
      ),
    });
  });
  router.get("/editprofileDetails/:id/:token",requireLogin,registerController.profileEdit);
  router.post("/update-personal-details/:id",registerController.editPersonDetails);

  router.post("/charge", (req, res) => {
  //  console.log(req.body)
    try {
      stripe.customers
        .create({
          name: req.body.name,
          email: req.body.email,
          source: req.body.stripeToken
        })
        .then(customer =>
          stripe.charges.create({
            amount: Number(req.body.amount) * 100,
            currency: "usd",
            customer: customer.id
          })
        )
        .then(async (data) => {
         // console.log(data)
          let slots=req.body.slots
          if( typeof req.body.slots==="string"){
            slots=[slots]
          }
          
        await  TimeSlots.updateMany({_id:{$in:slots}},{paid:true})
     TimeSlots.find({_id:{$in:slots}}).populate("test")
    .populate("packageid")
    .populate("user")
    .populate("UserId").then(async found=>{
      //console.log(found)
found.map(element=>{
  let toSubsciberMail = {
    to: element.user.email,
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
                
                  <div style="padding:40px 30px;background:#fff;">
                    <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
                      <tbody>
                        <tr>
                          <td>
                            <div style="color:#fff;background: #0750a4;font-size: 24px;text-align: center;padding: 25px 0;">
                              <b>PURCHASE CONFIRMATION RECEIPT</b>
                            </div>
                            <div style="color:#fff;background: #00a0d2;font-size: 20px;text-align: center;padding: 15px 0;">
                              ${element.test.test_name} ${element.packageid.packageName}
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
  
                  <div style="padding:0 30px 20px 30px;background:#fff;">
                    <table border="0" cellpadding="0" cellspacing="2" width="100%" style="font-size:15px;"> 
                      <tbody>
                        <tr>
                          <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform: uppercase;">Name</td>
                          <td style="background: #e1e4f3;padding: 0 20px;"> ${element.user.firstName} ${element.user.lastName} </td>
                        </tr>
                        <tr>
                          <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform: uppercase;">DATE OF BIRTH</td>
                          <td style="background: #e1e4f3;padding: 0 20px;">${element.user.dob}</td>
                        </tr>
                        ${element.user.passport?`
                        <tr>
                        <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform: uppercase;">PASSPORT NUMBER</td>
                        <td style="background: #e1e4f3;padding: 0 20px;">${element.user.passport_id}<</td>
                        </tr>
                        `:""}
                        ${element.user.arrival_vessel_number?`<tr>
                          <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform: uppercase;">FLIGHT NO.</td>
                          <td style="background: #e1e4f3;padding: 0 20px;">${element.user.arrival_vessel_number}</td>
                        </tr>`:""}
                <tr>
                        <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform: uppercase;">Slot Time</td>
                        <td style="background: #e1e4f3;padding: 0 20px;">${new Date(element.bookedFor).toLocaleDateString()}
                  at      ${new Date(element.bookedFor).toLocaleTimeString()}
                        </td>
                      </tr>
                        ${element.user.date_of_arrival?`
                        <tr>
                        <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform: uppercase;">ARRIVAL DATE</td>
                        <td style="background: #e1e4f3;padding: 0 20px;">${new Date(element.user.date_of_arrival).toLocaleDateString()}</td>
                        </tr>
                        <tr>
                          <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform:
                           uppercase;">ARRIVAL TIME</td>
                          <td style="background: #e1e4f3;padding: 0 20px;">${new Date(element.user.date_of_arrival).toLocaleTimeString()}</td>
                        </tr>
                        `:""}
                        <tr>
                          <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform: uppercase;">
                           ADDRESS</td>
                          <td style="background: #e1e4f3;padding: 0 20px;">${element.user.address}</td>
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

    
  });
})
   
let userData=found[0].UserId
let toSubsciberMail2 = {
  to: req.body.email,
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
              <td class="td" style="width:650px; min-width:650px;font-size:14px; line-height:16px;padding:0; margin:0; font-weight:normal;background-color:#fff;font-family: Helvetica, Arial;">  
                <!-- Header -->
                <div style="padding:30px">
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
              
                <div style="padding:14px 30px;">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
                    <tbody>
                      <tr>
                        <td>
                          <div style="padding-bottom: 20px;font-size: 20px;"><b>INVOICE</b></div>
                        </td>
                      </tr>
                      <tr>
                        <td width="50%">
                          <div style="line-height:24px;font-size: 15px;">
                          	<div>${userData.firstName} ${userData.lastName}</div>
              							<div>${userData.address}</div>
              						
                          </div>
                        </td>
                        <td width="50%">
                          <div style="line-height: 26px;font-size: 15px;">
	                        <div>Invoice Number: ${data.id}</div>
            							<div>Invoice Date: ${new Date().toLocaleDateString()}</div>
            							<div>Order Number: ${data.balance_transaction}</div>
            						
            							<div>Payment Method: Credit Card (Stripe)</div>
	                      </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div style="padding:0 30px 10px 30px;">
                  <table border="0" cellpadding="10" cellspacing="0" width="100%" style="font-size:15px;">
                  	<thead style="text-align: left;background: #000;color: #fff;">
                  		<tr>
                  			<th>Test</th>
                  			<th>No. of Slots Booked</th>
                  			<th>Price</th>
                  		</tr>
                  	</thead> 
                    <tbody>
                      <tr valign="top">
                        <td style="width: 70%;">
	                        <div style="padding-bottom: 10px">${found[0].test.test_name}</div>
	                        <div style="font-size: 13px;line-height: 20px;">
            								<div>${found[0].packageid.packageName}</div>
            							
            							</div>
	                    </td>
                        <td style="width: 15%">${found.length}</td>
                        <td style="width: 15%">${data.charge} per slot</td>
                      </tr>
                    </tbody>
                  </table>
				</div>
            <!-- END Main -->
        </td>
      </tr>
    </table>
  </body>
</html> `,


}

transporter.sendMail(toSubsciberMail2, (err) => {
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

  
}); })
          res.render("paymentsucess")
        })
        .catch(err => console.log(err));
    } catch (err) {
      res.send(err,"erro");
    }
  });
module.exports=router