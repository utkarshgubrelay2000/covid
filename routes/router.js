var express = require('express');
var router = express.Router();
const registerController=require('../controller/routerController')
var mutter=require('multer')
var path=require('path')
/* GET home page. */
router.get('/',registerController.homePage)
 router.get('/contact',registerController.contact)
 router.get('/about',registerController.about)
 router.get('/faq',registerController.faq)
 router.get('/moreservices',registerController.moreservices)


module.exports=router