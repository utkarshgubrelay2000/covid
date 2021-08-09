var express = require('express');
var router = express.Router();
const registerController=require('../controller/routerController')
const bookingController=require('../controller/bookingController')
var mutter=require('multer')
var path=require('path')
/* GET home page. */
router.get('/',registerController.homePage)
 router.get('/contact-us',registerController.contact)
 router.get('/about-us',registerController.about)
 router.get('/faq',registerController.faq)
 router.post('/faq',registerController.loadMoreFaqs)
 router.get('/appointment',registerController.appointment)
 router.get('/choose-slots/:id',registerController.chooseslots)
 router.post('/contact-details',registerController.contactdetails)
 router.get('/diphtheria',registerController.diphteria)
 router.get('/find-test-center',registerController.findtestcenter)
 router.get('/notification',registerController.notification)
 router.get('/settings',registerController.settings)
 router.get('/tests-listing',registerController.testslisting)
 router.get('/getTestById/:id',registerController.testsbyId)
 router.get('/test-summary',registerController.testsummary)
 router.get('/testimonials',registerController.testimonials)
 router.get('/test-Terms',registerController.testTerms)
 router.get('/appointment',registerController.appointment)
 router.post('/get-avaiable-session',bookingController.getSlots)
 router.post("/create",registerController.createBooking);
 router.get("/pages",registerController.getAllPage);
 router.get("/page/:id",registerController.getPageById);
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

  

module.exports=router