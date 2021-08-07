var express = require('express');
var router = express.Router();
const registerController=require('../controller/routerController')
var mutter=require('multer')
var path=require('path')
/* GET home page. */
router.get('/',registerController.homePage)
 router.get('/contact-us',registerController.contact)
 router.get('/about-us',registerController.about)
 router.get('/faq',registerController.faq)
 router.post('/faq',registerController.loadMoreFaqs)
 router.get('/appointment',registerController.appointment)
 router.get('/choose-slots',registerController.chooseslots)
 router.get('/contact-details',registerController.contactdetails)
 router.get('/diphtheria',registerController.diphteria)
 router.get('/find-test-center',registerController.findtestcenter)
 router.get('/notification',registerController.notification)
 router.get('/settings',registerController.settings)
 router.get('/tests-listing',registerController.testslisting)
 router.get('/test-summary',registerController.testsummary)
 router.get('/testimonials',registerController.testimonials)
 router.get('/test-Terms',registerController.testTerms)
 router.get('/appointment',registerController.appointment)


module.exports=router