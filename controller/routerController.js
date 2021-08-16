
const FAQ = require("../model/faqModel");
const Test = require("../model/testModel");
let { Scheduler } = require("@ssense/sscheduler");

let testModal = require("../model/testModel");
// let Restaurant = require("../model/restaurantModel");
let moment = require("moment");

const PersonalDetails = require("../model/personalDetailModel");
const TimeSlots = require("../model/timeSlots");
const { validate } = require("validate.js");
const Page = require("../model/pages");
const TestPackage = require("../model/testPackage");
const testimonial = require("../model/testimonialModel");
const aboutmodel = require("../model/aboutModel");
const User = require("../model/userModel");

exports.homePage = (req, res) => {
  res.render("index");
};
exports.contact = (req, res) => {
  res.render("contact");
};
exports.about =async (req, res) => {
  let  data = await aboutmodel.find({})
 // console.log(data)
    res.render("about-us",{data:data[0]});
};

exports.faq = async (req, res) => {
  try {
    let faqs = await FAQ.find({}).limit(10);
    res.render("faq", { faqs: faqs, curpage: 1 });
  } catch (error) {
    res.send("Error");
  }
};
exports.loadMoreFaqs = async (req, res) => {
  try {
    let faqs = await FAQ.find({}).limit(req.body.curpage * 10);
    res.render("faq", { faqs: faqs, curpage: 1 + req.body.curpage });
  } catch (error) {
    res.send("Error");
  }
};
exports.appointment =async (req, res) => {
  let userDetails= await User.findById(req.body.userId,{password:0,gender:0,createdAt:0,updatedAt:0})
let myslots= await  TimeSlots.find({UserId:req.body.userId,approved:false}).populate("test")
.populate("packageid")
.populate("user").limit(10);
let completeslots= await  TimeSlots.find({UserId:req.body.userId,approved:true})
.populate("test")
.populate("packageid")
.populate("user").limit(10);
//console.log(myslots[0],req.body)
  res.render("appointment-bookings",{myslots:myslots,data:userDetails,token:req.params.token,curpage:1,completeslots:completeslots});
};
exports.paginationappointment =async (req, res) => {
  let myslots= await  TimeSlots.find({UserId:req.body.userId}).populate("UserId")
  .populate("test")
  .populate("packageid")
  .populate("user").limit(10).skip(req.body.curpage*10);
  console.log(myslots[0].user,req.body)
    res.render("appointment-bookings",{myslots:myslots,token:req.params.token,curpage:req.body.curpage+1});
  };
exports.chooseslots = async (req, res) => {
  function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }
  // let today = new Date()
  console.log(req.params)
  let newDate = new Date();
  let nextDate = addDays(newDate, 1);

  const tests = await Test.findOne({test_name:req.params.name});
  const slots = await TimeSlots.find({
    test: req.params.id,
    booked: false,
    bookedFor: { $gt: newDate, $lt: nextDate },
  });
if(!tests.date){
  res.render("choose-slots", { _id: req.params.name, slots: slots,testDetails:tests,pachageId:req.params.packId });
}
else{
  res.render("choose-slots-days", { _id: req.params.id, slots: slots,testDetails:tests,pachageId:req.params.packId });

}
};
exports.contactdetails = async (req, res) => {
let {spots,people,packageid}=req.body
  let test = await Test.findOne({ _id: req.body._id });
  let peopleArray = [];
  let peoplesDetails = {
    email: "",
  
    
  };
  if(people==1){
    spots=[spots]
  
  }
  for (let index = 0; index < Number(req.body.people); index++) {
    peopleArray.push(peoplesDetails);
  }
  console.log(spots);
  res.render("contact-details", {
    testDetails: test,
    date: req.body.date,
    slot: req.body.spots,
    packageid: packageid,
    people: peopleArray,
    length: peopleArray.length,
  });
};
exports.contactdetailsforArrivinginEngland=async (req, res) => {
 let {spotArrival,spotAfterDay6,date,people,packageid}=req.body
 let test = await TestPackage.findOne({ _id: req.body.packageid });
  let peopleArray = [];
  let peoplesDetails = {
    email: "",
  };
 
     
  
  if(people==1){
    spotAfterDay6=[spotAfterDay6]
    spotArrival=[spotArrival]
  }
  for (let index = 0; index < Number(req.body.people); index++) {
    peopleArray.push(peoplesDetails);
  }
  console.log(spotArrival,spotAfterDay6);
  res.render("contact-for-arrival", {
    testDetails: test,
    packageid: packageid,
    date: date,
    slot: spotArrival,
    slotAfterDay6: spotAfterDay6,
    people: peopleArray,
    length: people,
  });
}
exports.contact = (req, res) => {
  res.render("contact");
};
exports.diphteria = (req, res) => {
  res.render("diphtheria");
};
exports.findtestcenter = (req, res) => {
  res.render("find-test-center");
};
exports.notification = (req, res) => {
  res.render("notification");
};
exports.profile = (req, res) => {
  User.findById(req.body.userId,{password:0,gender:0,createdAt:0,updatedAt:0}).then(found=>{
   
    res.render("profile",{data:found,token:req.params.token});
  }).catch((err) => {
    res.send({msg: "Something Went Wrong " });
  });
};
exports.settings = (req, res) => {
  res.render("settings");
};
exports.testsummary = (req, res) => {
  res.render("test-summary");
};
exports.testTerms = (req, res) => {
  res.render("test-terms");
};

exports.testslisting = async (req, res) => {
  let tests = await Test.find({});
  
  res.render("tests-listing", { tests: tests });
};
exports.testsbyId = async (req, res) => {
  console.log(req.params)
  let tests = await TestPackage.find({ testId: req.params.id });
  res.send({ tests: tests,testId:req.params.id ,name:req.params.name});
};
exports.createBooking = async (req, res) => {
  try {
    const { slots,packageid } = req.body;
 let   sloted=slots.split(',')
   // console.log('hello',sloted)
      personal_details=JSON.parse(req.body.personal_details)
     
    const validation = validate(req.body, {
     
      slots: {
        presence: true,
      },
      personal_details: {
        presence: true,
      },
    });

    if (validation) {
      res.status(400).json({
        error: validation,
        status: false,
      });
      return console.log(validation);
    }
    console.log('here')
    let users=[]
     const promises =   personal_details.map((person, index) => {
      const details = new PersonalDetails({ ...person, slot: sloted[index] });
     details.save().then(async saved=>{
       users.push(saved._id)
     let res=await TimeSlots.findOneAndUpdate(
        { _id: sloted[index] },
        { booked: true, user: saved._id,UserId:req.body.userId, ...req.body,packageid:packageid  },
        { new: true }
      );
      console.log(res)
     return saved._id
    })
    });
 
 
   
    setTimeout(() => {
      
 
    console.log(users,promises)
    if (promises)
      res
        .json({ message: "Booking Saved!",users:users , status: true });
    else
      res.status(400).json({
        status: false,
        data: 'Something wrong',
      });
    }, 600);

   
  } catch (error) {
    res.status(503).json({
      status: false,
      data: error,
    });
  }
};
exports.createBookingArrival = async (req, res) => {
  try {
    const { slots,slotAfterDay6,packageid } = req.body;
    let sloted=slots.split(',')
    let slotedDay6=slotAfterDay6.split(',')
    personal_details=JSON.parse(req.body.personal_details)
    console.log('hello',sloted,personal_details)
     
    const validation = validate(req.body, {
     
      slots: {
        presence: true,
      },
      personal_details: {
        presence: true,
      },
    });

    if (validation) {
      res.status(400).json({
        error: validation,
        status: false,
      });
      return console.log(validation);
    }
    console.log('here',personal_details)
    let users=[]
     const promises =   personal_details.map((person, index) => {
      const details = new PersonalDetails({ ...person, slot: sloted[index],slotDay6:slotedDay6[index] });
     details.save().then(async saved=>{
       users.push(saved._id)
     let res=await TimeSlots.findOneAndUpdate(
        { _id: sloted[index] },
        { booked: true, user: saved._id,UserId:req.body.userId, ...req.body,packageid:packageid },
        { new: true }
      );
      let res2=await TimeSlots.findOneAndUpdate(
        { _id: slotedDay6[index] },
        { booked: true, user: saved._id,UserId:req.body.userId, ...req.body,packageid:packageid },
        { new: true }
      );
     // console.log(res)
     return saved._id
    })
    });
 

    setTimeout(() => {
  
      res
        .json({ message: "Booking Saved!",users:users , status: true });
 
    }, 1000);

   
  } catch (error) {
    res.status(503).json({
      status: false,
      data: error,
    });
  }
};
exports.getAllPage = (req, res) => {
  //console.log(req.body);
  // categoryObject: { '$exists': false,}

  Page.find({})
    .then((found) => {
      res
        .status(201)
        .json({ error: false, data: found, PageCount: found.length });
    })
    .catch((err) => {
      res
        .status(503)
        .json({ error: true, msg: "Something Went Wrong", errMsg: err });
    });
};
exports.getPageById = (req, res) => {
  //console.log(req.body);
  Page.findById(req.params.id)
    .then((found) => {
      console.log(found)
      res.render('diphtheria',{ error: false, data: found });
    })
    .catch((err) => {
      res.status(503).json({ error: true, msg: "Something Went Wrong" });
    });
};
exports.getAlltestimonials = (req, res) => {
  //console.log(req.body);
  // categoryObject: { '$exists': false,}

  testimonial.find({})
    .then((found) => {
      res
        .render('testimonials',{ error: false, data: found, 
          PageCount: found.length });
    })
    .catch((err) => {
      res
        .status(503)
        .json({ error: true, msg: "Something Went Wrong", errMsg: err });
    });
};
exports.cancelMySlot=async(req,res)=>{
  let response=await TimeSlots.findByIdAndUpdate(req.body.id,
    { booked: false, user: null, UserId:null },
  );
  console.log(req.body.id)
  res.json('Success')
}