const FAQ = require("../model/faqModel");
const Test = require("../model/testModel");
let { Scheduler } = require("@ssense/sscheduler");
const jwt = require("jsonwebtoken");

let testModal = require("../model/testModel");
// let Restaurant = require("../model/restaurantModel");
let moment = require("moment");
const stripe=require('stripe')('sk_test_51IOluBGlqCnXQgM3ZFPmiFzEzyKmVUO9MwjXaQ6dmROPbv0v1ZmIUH8YAq3X50DQR2FfagyyNLKpIoZLiI8HKXxJ00eMZxOuTw')
const PersonalDetails = require("../model/personalDetailModel");
const TimeSlots = require("../model/timeSlots");
const { validate } = require("validate.js");
const Page = require("../model/pages");
const TestPackage = require("../model/testPackage");
const testimonial = require("../model/testimonialModel");
const aboutmodel = require("../model/aboutModel");
const User = require("../model/userModel");
const Notification = require("../model/Notification");

exports.homePage = async(req, res) => {
  let faqs = await FAQ.find({}).limit(10);
 let testimonials= await testimonial.find({})
  res.render("index",{faqs:faqs,testimonials:testimonials});
};
exports.prices = (req, res) => {
  res.render("prices");
};
exports.afterYourTest =async (req, res) => {
  let faqs = await FAQ.find({}).limit(10);

  res.render("after-your-test",{faqs:faqs});
};
exports.preparingforyourtest = async (req, res) => {
  let faqs = await FAQ.find({}).limit(10);
  res.render("preparing-for-your-test",{faqs:faqs});
};

exports.contact = (req, res) => {
  res.render("contact");
};
exports.about = async (req, res) => {
  let data = await aboutmodel.find({});
  // console.log(data)
  res.render("about-us", { data: data[0] });
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
exports.appointment = async (req, res) => {
  let userDetails = await User.findById(req.body.userId, {
    password: 0,
    gender: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  let myslots = await TimeSlots.find({
    UserId: req.body.userId,
    paid: true,
    barcode: { $exists: false },
  })
    .populate("test")
    .populate("packageid")
    .populate("user")
    .limit(10);
  let completeslots = await TimeSlots.find({
    UserId: req.body.userId,
    approved: true, paid: true,
  })
    .populate("test")
    .populate("packageid")
    .populate("user")
    .limit(10);
  let reports = await TimeSlots.find({
    approved: false, paid: true,
    barcode: { $exists: true },
  })
    .populate("User")
    .populate("test")
    .populate("packageid")
    .populate("user")
    .limit(10);
  console.log(completeslots[0],req.body)
  res.render("appointment-bookings", {
    myslots: myslots,
    data: userDetails,
    token: req.params.token,
    curpage: 1,
    completeslots: completeslots,
    reports: reports,
  });
};
exports.paginationappointment = async (req, res) => {
  let number=req.body.number
  let userDetails = await User.findById(req.body.userId, {
    password: 0,
    gender: 0,
    createdAt: 0,
    updatedAt: 0,
  });
  let myslots = await TimeSlots.find({
    UserId: req.body.userId,
    booked: true,
    barcode: { $exists: false },
  })
    .populate("test")
    .populate("packageid")
    .populate("user")
    .limit(number);
  let completeslots = await TimeSlots.find({
    UserId: req.body.userId,
    approved: true,
  })
    .populate("test")
    .populate("packageid")
    .populate("user")
    .limit(number);
  let reports = await TimeSlots.find({
    booked: true,
    barcode: { $exists: true },
  })
    .populate("User")
    .populate("test")
    .populate("packageid")
    .populate("user")
    .populate("user")
    .limit(number);
  //console.log(myslots[0],req.body)
  res.render("appointment-bookings", {
    myslots: myslots,
    data: userDetails,
    token: req.params.token,
    curpage: 1,
    completeslots: completeslots,
    reports: reports,
  });
};
exports.chooseslots = async (req, res) => {
  function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }
  // let today = new Date()
  console.log(req.params);
  let newDate = new Date();
  let nextDate = addDays(newDate, 1);

  const tests = await Test.findOne({ test_name: req.params.name });
  const packAgeDetails = await TestPackage.findOne({ _id: req.params.packId });
  const slots = await TimeSlots.find({
    test: req.params.id,
    booked: false,
    bookedFor: { $gt: newDate, $lt: nextDate },
  });
  if (!tests.date) {
  if(packAgeDetails.daysCombo=='fittofly'){

    res.render("choose-slots", {
      _id: req.params.name,
      slots: slots,
      testDetails: tests,
      pachageId: req.params.packId,
      packAgeDetails:packAgeDetails
    });
  }
  else{

    res.render("choose-slots-form-for-pcr", {
      _id: req.params.name,
      slots: slots,
      testDetails: tests,
      pachageId: req.params.packId,
      packAgeDetails:packAgeDetails
    });
  }
    
  } else {
    res.render("choose-slots-days", {
      _id: req.params.id,
      slots: slots,
      testDetails: tests,
      pachageId: req.params.packId,
      packAgeDetails:packAgeDetails
    });
    console.log(packAgeDetails.daysCombo)
  }
};
exports.chooseslotsHome = async (req, res) => {
  function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }
  // let today = new Date()
  console.log(req.params);
  let newDate = new Date();
  let nextDate = addDays(newDate, 1);

  const tests = await Test.findOne({ test_name: req.params.name });
  const packAgeDetails = await TestPackage.findOne({ _id: req.params.packId });
  const slots = await TimeSlots.find({
    test: req.params.id,
    booked: false,
    bookedFor: { $gt: newDate, $lt: nextDate },
  });
  if (!tests.date) {
  
      console.log("hello")
      res.render("choose-slots-home", {
        _id: req.params.name,
        slots: slots,
        testDetails: tests,
        pachageId: req.params.packId,
        packAgeDetails:packAgeDetails
      });
       
  } else {
    res.render("choose-slots-home-days", {
      _id: req.params.id,
      slots: slots,
      testDetails: tests,
      pachageId: req.params.packId,
      packAgeDetails:packAgeDetails
    });
    console.log(packAgeDetails.daysCombo)
  }
};
exports.chooseslotsHomeDays= async (req, res) => {
  function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }
  // let today = new Date()
  console.log(req.params);
  let newDate = new Date();
  let nextDate = addDays(newDate, 1);

  const tests = await Test.findOne({ test_name: req.params.name });
  const packAgeDetails = await TestPackage.findOne({ _id: req.params.packId });
  const slots = await TimeSlots.find({
    test: req.params.id,
    booked: false,
    bookedFor: { $gt: newDate, $lt: nextDate },
  });
  
    res.render("choose-slots-home-days", {
      _id: req.params.id,
      slots: slots,
      testDetails: tests,
      pachageId: req.params.packId,
      packAgeDetails:packAgeDetails
    });
    console.log(packAgeDetails.daysCombo)
  
};
exports.contactdetails = async (req, res) => {
  let { spots, people, packageid } = req.body;
  let test = await Test.findOne({ _id: req.body._id });
  console.log(test)
  let peopleArray = [];
  let peoplesDetails = {
    email: "",
  };
  if (people == 1) {
    console.log('hello')
    spots = [spots];
  }
  for (let index = 0; index < Number(req.body.people); index++) {
    peopleArray.push(peoplesDetails);
  }
  console.log(spots,req.body.spots,"hhh");
  if(test._id=="612cbc06e9242568af80cf57" || test.test_name=="I am NOT travelling"){
    res.render("not-traveling-form", {
      testDetails: test,
      date: req.body.date,
      spots: spots,
      packageid: packageid,
      people: peopleArray,
      length: peopleArray.length,
    });
  } else if(test._id=="612cbc00e9242568af80cf56" ){
    res.render("contact-details", {
      testDetails: test,
      date: req.body.date,
      spots: spots,
      packageid: packageid,
      people: peopleArray,
      length: peopleArray.length,
    departure:false,
    arrivaldateinput:req.body.arrivaldateinput
    });
  }
  else{
let response=await TestPackage.findById(packageid)
console.log(response)
if(response.daysCombo=='fittofly'){
  res.render("contact-details", {
    testDetails: test,
    date: req.body.date,
    spots: spots,
    packageid: packageid,
    people: peopleArray,
    length: peopleArray.length,
    departure:true
    
   });
}
 else{

   res.render("contact-details-pcr", {
     testDetails: test,
     date: req.body.date,
     spots: spots,
     packageid: packageid,
     people: peopleArray,
     length: peopleArray.length,
     departure:true
     
    }); }
  }
};
exports.contactdetailsPCr = async (req, res) => {

  let { spots, pcrSlot, date, people, packageid,arrivaldateinput } = req.body;
  let test = await TestPackage.findOne({ _id: req.body.packageid });
  let peopleArray = [];
  let peoplesDetails = {
    email: "",
  };

  if (people == 1) {
    pcrSlot = [pcrSlot];
    spots = [spots];
  }
  for (let index = 0; index < Number(req.body.people); index++) {
    peopleArray.push(peoplesDetails);
  }
  console.log(pcrSlot, spots);
  res.render("contact-details-pcr-single", {
    testDetails: test,
    packageid: packageid,
    date: date,
    spots: spots,
    pcrSlot: pcrSlot,
    people: peopleArray,
    length: people,
    arrivaldateinput:arrivaldateinput,departure:true
  });
};
exports.contactdetailsPcr28 = async (req, res) => {

  let { spots, pcrSlot,slotsDay8, date, people, packageid,arrivaldateinput } = req.body;
  let test = await TestPackage.findOne({ _id: req.body.packageid });
  let peopleArray = [];
  let peoplesDetails = {
    email: "",
  };

  if (people == 1) {
    pcrSlot = [pcrSlot];
    spots = [spots];
    slotsDay8=[slotsDay8]
  }
  for (let index = 0; index < Number(req.body.people); index++) {
    peopleArray.push(peoplesDetails);
  }
  console.log(pcrSlot, spots);
  res.render("contact-details-pcr-28", {
    testDetails: test,
    packageid: packageid,
    date: date,
    spots: spots,slotsDay8:slotsDay8,
    pcrSlot: pcrSlot,
    people: peopleArray,
    length: people,
    arrivaldateinput:arrivaldateinput,departure:true
  });
};
exports.contactdetailsHome = async (req, res) => {
  let { spots, people, packageid } = req.body;
  let test = await Test.findOne({ _id: req.body._id });
  console.log(test)
  let peopleArray = [];
  let peoplesDetails = {
    email: "",
  };
 
  for (let index = 0; index < Number(req.body.people); index++) {
    peopleArray.push(peoplesDetails);
  }
  console.log(spots,req.body.spots);
  if(test._id=="612cbc06e9242568af80cf57" || test.test_name=="I am NOT travelling"){
    res.render("not-traveling-form", {
      testDetails: test,
      date: req.body.date,
      spots: spots,
      packageid: packageid,
      people: peopleArray,
      length: peopleArray.length,
    });
  } else if(test._id=="612cbc00e9242568af80cf56" ){
    res.render("contact-details", {
      testDetails: test,
      date: req.body.date,
      spots: spots,
      packageid: packageid,
      people: peopleArray,
      length: peopleArray.length,
    departure:false,
    arrivaldateinput:req.body.arrivaldateinput
    });
  }
  else{

 console.log('slots',req.body.date)
  res.render("contact-details-home", {
    testDetails: test,
    date: req.body.date,
    spots: spots,
    packageid: packageid,
    people: peopleArray,
    length: peopleArray.length,
    departure:true
  
  }); }
};
exports.contactdetailsforArrivinginEngland = async (req, res) => {
  let { spotArrival, spotAfterDay6, date, people, packageid,arrivaldateinput } = req.body;
  let test = await TestPackage.findOne({ _id: req.body.packageid });
  let peopleArray = [];
  let peoplesDetails = {
    email: "",
  };

  if (people == 1) {
    spotAfterDay6 = [spotAfterDay6];
    spotArrival = [spotArrival];
  }
  for (let index = 0; index < Number(req.body.people); index++) {
    peopleArray.push(peoplesDetails);
  }
 // console.log(spotArrival, spotAfterDay6);
  res.render("contact-for-arrival", {
    testDetails: test,
    packageid: packageid,
    date: date,
    slot: spotArrival,
    slotAfterDay6: spotAfterDay6,
    people: peopleArray,
    length: people,
    arrivaldateinput:arrivaldateinput
  });
};
exports.contactdetails258 = async (req, res) => {
  let { spots, spots5,spots8, date, people, packageid,arrivaldateinput } = req.body;
  let test = await TestPackage.findOne({ _id: req.body.packageid });
  let peopleArray = [];
  let peoplesDetails = {
    email: "",
  };
console.log(date)
  if (people == 1) {
    spots = [spots];
    spots8 = [spots8];
    spots5 = [spots5];
  }
  for (let index = 0; index < Number(req.body.people); index++) {
    peopleArray.push(peoplesDetails);
  }
 //console.log(spots5, spots,spots8);
  res.render("contact-for-258", {
    testDetails: test,
    packageid: packageid,
    date: date,
    spots: spots,
    spots8: spots8,spots5:spots5,
    people: peopleArray,
    length: people,
    arrivaldateinput:arrivaldateinput
  });
};
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
  Notification.find({UserId:req.body.userId}).sort({_id:-1}).populate('slotId').populate({   path: "slotId",
  model: "TimeSlots",populate:{
    path: "packageid",
    model: "TestPackage"
  }})

  .populate('user').then(myNotification=>{
    console.log(myNotification[0])
    res.render("notification",{notification:myNotification,token: req.params.token});
  })
};
exports.profile = (req, res) => {
  User.findById(req.body.userId, {
    password: 0,
    gender: 0,
    createdAt: 0,
    updatedAt: 0,
  })
    .then((found) => {
      res.render("profile", { data: found, token: req.params.token });
    })
    .catch((err) => {
      res.send({ msg: "Something Went Wrong " });
    });
};
exports.settings = (req, res) => {
  res.render("settings");
};
exports.profileEdit = async(req, res) => {
 // console.log(req.params)
await PersonalDetails.findById(req.params.id).then(found=>{
  res.render("profileEdit",{data:found,id:req.params.id,token:req.params.token});
})
};
exports.editPersonDetails=async (req,res)=>{
  console.log(req.body,req.params)
  await PersonalDetails.findByIdAndUpdate(req.params.id,{...req.body})
    res.redirect("/");
  
}
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
  console.log(req.params);
  let tests = await TestPackage.find({ testId: req.params.id });
  res.send({ tests: tests, testId: req.params.id, name: req.params.name });
};
exports.createBooking = async (req, res) => {
  try {
    const { slots, packageid } = req.body;
    let sloted = slots.split(",");
     console.log('hello',sloted)
    personal_details = JSON.parse(req.body.personal_details);
    

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
    console.log("here");
    let users = [];
    const promises = personal_details.map((person, index) => {
      const details = new PersonalDetails({ ...person, pcrSlot: sloted[index] });
      details.save().then(async (saved) => {
        users.push(saved._id);
        let res = await TimeSlots.findOneAndUpdate(
          { _id: sloted[index] },
          {
            booked: true,
            user: saved._id,
            UserId: req.body.userId,
            ...req.body,
            packageid: packageid,
          },
          { new: true }
        );
        console.log(res);
        return saved._id;
      });
    });

    setTimeout(() => {
      console.log(users);
      if (promises)
        res.json({ message: "Booking Saved!", allslots: sloted, status: true });
      else
        res.status(400).json({
          status: false,
          data: "Something wrong",
        });
    }, 600);
  } catch (error) {
    res.status(503).json({
      status: false,
      data: error,
    });
  }
};
exports.createBookingHome = async (req, res) => {
  try {
    const { slots, packageid } = req.body;
    let sloted = slots.split(",");
     console.log('hello',sloted)
    personal_details = JSON.parse(req.body.personal_details);
    

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
    console.log("here");
    let users = [];
    const promises = personal_details.map((person, index) => {
      const details = new PersonalDetails({ ...person, slot: sloted[index] });
      details.save().then(async (saved) => {
        users.push(saved._id);
        let res = await TimeSlots.findOneAndUpdate(
          { _id: sloted[index] },
          {
            booked: true,
            user: saved._id,
            UserId: req.body.userId,
            ...req.body,
            packageid: packageid,home:true
          },
          { new: true }
        );
        console.log(res);
        return saved._id;
      });
    });

    setTimeout(() => {
      console.log(users);
      if (promises)
        res.json({ message: "Booking Saved!", allslots: sloted, status: true });
      else
        res.status(400).json({
          status: false,
          data: "Something wrong",
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
    const { slots, slotAfterDay6, packageid } = req.body;
    let sloted = slots.split(",");
    let slotedDay6 = slotAfterDay6.split(",");
    personal_details = JSON.parse(req.body.personal_details);
    console.log("hello", slots,personal_details.length);
   
    let allslots=slotedDay6.concat(sloted)
//console.log(allslots)
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
  //  console.log("here", personal_details);
    let users = [];
    const promises = personal_details.map((person, index) => {
      const details = new PersonalDetails({
        ...person,
        slot: sloted[index],
        slotDay6: slotedDay6[index],
      });
      details.save().then(async (saved) => {
        users.push(saved._id);
        let res = await TimeSlots.findOneAndUpdate(
          { _id: sloted[index] },
          {
            booked: true,
            user: saved._id,
            UserId: req.body.userId,
            ...req.body,
            packageid: packageid,
          },
          { new: true }
        );
        let res2 = await TimeSlots.findOneAndUpdate(
          { _id: slotedDay6[index] },
          {
            booked: true,
            user: saved._id,
            UserId: req.body.userId,
            ...req.body,
            packageid: packageid,
          },
          { new: true }
        );
      //   console.log(res)
        return saved._id;
      });
    });
console.log(allslots)
    setTimeout(() => {
      res.json({ message: "Booking Saved!",allslots:allslots, status: true });
    }, 1000);
  } catch (error) {
    res.status(503).json({
      status: false,
      data: error,
    });
  }
};
exports.createpcrandsingle = async (req, res) => {
  try {
    let { slots, pcrSlot, packageid,personal_details } = req.body;
    console.log("hello", req.body);
    let sloted = slots.split(",");
    let pcrSloted = pcrSlot.split(",");
    try {
      
      personal_details = JSON.parse(req.body.personal_details);
    } catch (error) {
      console.log(error)
    }
    console.log('here') 
    let allslots=pcrSloted.concat(sloted)
console.log(allslots,'AllSlots')
  
    console.log("here", personal_details);
    let users = [];
    const promises = personal_details.map((person, index) => {
      const details = new PersonalDetails({
        ...person,
        slot: sloted[index],
        pcrSlot: pcrSloted[index],
      });
      details.save().then(async (saved) => {
        users.push(saved._id);
        let res = await TimeSlots.findOneAndUpdate(
          { _id: sloted[index] },
          {
            booked: true,
            user: saved._id,
            UserId: req.body.userId,
            ...req.body,
            packageid: packageid,
          },
          { new: true }
        );
        let res2 = await TimeSlots.findOneAndUpdate(
          { _id: pcrSloted[index] },
          {
            booked: true,
            user: saved._id,
            UserId: req.body.userId,
            ...req.body,
            packageid: packageid,
          },
          { new: true }
        );
      //   console.log(res)
        return saved._id;
      });
    });
console.log(allslots)
    setTimeout(() => {
      res.json({ message: "Booking Saved!",allslots:allslots, status: true });
    }, 1000);
  } catch (error) {
    res.status(503).json({
      status: false,
      data: error,
    });
  }
};
exports.createpcrandtwo = async (req, res) => {
  try {
    let { slots, pcrSlot,day8Slot, packageid,personal_details } = req.body;
    console.log("hello", req.body);
    let sloted = slots.split(",");
    let pcrSloted = pcrSlot.split(",");
    let day8Sloted = day8Slot.split(",");

    try {
      
      personal_details = JSON.parse(req.body.personal_details);
    } catch (error) {
      console.log(error)
    }
    console.log('here') 
    let allslots=pcrSloted.concat(sloted)
    allslots=allslots.concat(day8Sloted)
console.log(allslots,'AllSlots')

    let users = [];
    const promises = personal_details.map((person, index) => {
      const details = new PersonalDetails({
        ...person,
        slot: sloted[index],
        pcrSlot: pcrSloted[index],slotDay6:day8Sloted[index]
      });
      details.save().then(async (saved) => {
        users.push(saved._id);
        let res = await TimeSlots.findOneAndUpdate(
          { _id: sloted[index] },
          {
            booked: true,
            user: saved._id,
            UserId: req.body.userId,
            ...req.body,
            packageid: packageid,
          },
          { new: true }
        );
        let res2 = await TimeSlots.findOneAndUpdate(
          { _id: pcrSloted[index] },
          {
            booked: true,
            user: saved._id,
            UserId: req.body.userId,
            ...req.body,
            packageid: packageid,
          },
          { new: true }
        );
        let res3 = await TimeSlots.findOneAndUpdate(
          { _id: day8Sloted[index] },
          {
            booked: true,
            user: saved._id,
            UserId: req.body.userId,
            ...req.body,
            packageid: packageid,
          },
          { new: true }
        );
      //   console.log(res)
        return saved._id;
      });
    });

    setTimeout(() => {
      res.json({ message: "Booking Saved!",allslots:allslots, status: true });
    }, 1000);
  } catch (error) {
    res.status(503).json({
      status: false,
      data: error,
    });
  }
};
exports.createBooking258 = async (req, res) => {
  try {
    const { spots5, spots,spots8, packageid } = req.body;
    let sloted = spots.split(",");
    let slotedDay6 = spots8.split(",");
    let sloted5 = spots5.split(",");
    personal_details = JSON.parse(req.body.personal_details);
console.log("helllo")
   
    let allslots=slotedDay6.concat(sloted)
console.log(packageid)
allslots=allslots.concat(sloted5)
    
  //  console.log("here", personal_details);
    let users = [];
    const promises = personal_details.map((person, index) => {
      const details = new PersonalDetails({
        ...person,
        slot: sloted[index],
        slotDay6: slotedDay6[index],
        slot5: sloted5[index],
      });
      details.save().then(async (saved) => {
        users.push(saved._id);
        let res = await TimeSlots.findOneAndUpdate(
          { _id: sloted[index] },
          {
            booked: true,
            user: saved._id,
            UserId: req.body.userId,
            ...req.body,
            packageid: packageid,
          },
          { new: true }
        );
        let res2 = await TimeSlots.findOneAndUpdate(
          { _id: slotedDay6[index] },
          {
            booked: true,
            user: saved._id,
            UserId: req.body.userId,
            ...req.body,
            packageid: packageid,
          },
          { new: true }
        );
        let res3 = await TimeSlots.findOneAndUpdate(
          { _id: sloted5[index] },
          {
            booked: true,
            user: saved._id,
            UserId: req.body.userId,
            ...req.body,
            packageid: packageid,
          },
          { new: true }
        );
      //   console.log(res)
        return saved._id;
      });
    });
console.log(allslots)
    setTimeout(() => {
      res.json({ message: "Booking Saved!",allslots:allslots, status: true });
    }, 2000);
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
  console.log(req.params);
  Page.findById(req.params.id)
    .then((found) => {
      console.log(found);
      res.render("diphtheria", { error: false, data: found });
    })
    .catch((err) => {
      res.status(503).json({ error: true, msg: "Something Went Wrong" });
    });
};
exports.getAlltestimonials = (req, res) => {
  //console.log(req.body);
  // categoryObject: { '$exists': false,}

  testimonial
    .find({})
    .then((found) => {
      res.render("testimonials", {
        error: false,
        data: found,
        PageCount: found.length,
      });
    })
    .catch((err) => {
      res
        .status(503)
        .json({ error: true, msg: "Something Went Wrong", errMsg: err });
    });
};
exports.cancelMySlot = async (req, res) => {
  let response = await TimeSlots.findById(req.body.id);
  console.log(req.body.userId)
 let resNot=await Notification.findOne({slotId:req.body.id})
 if(!resNot){
   let newNotification=new Notification({
     status:"Pending",slotId:req.body.id,user:response.user,UserId:response.UserId
    })
    await newNotification.save()
  }
  console.log(req.body.id);
  res.json("Success");
};
exports.getSlotsDetails = async (req, res) => {
  let body=JSON.stringify(req.body)
  let data=body.replace("slots[]",'slots')
  let slots=JSON.parse(data)
  console.log(req.body)
 
  if(req.body.token){
    jwt.verify(req.body.token, process.env.JWT_SECRET, (err, payload) => {
      if (err || payload === undefined) {
        console.log(`some error in verifying jwt secret${err}`);
      res.send("InValid Token")
      }
  else{
    let  md5UserId=payload.secretId

    TimeSlots.find({_id:{$in:slots.slots}}).populate("test")
    .populate("packageid")
    .populate("user")
    .populate("UserId").then(found=>{
     // console.log(found)
// found.map(element=>{
//   let toSubsciberMail = {
//     to: element.user.email,
//     from: "btravelclinic@gmail.com",
//     subject: " Welcome to  BT Travels Clinic ",
//     html: `<html>
//     <head>    
//       <meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport"/>
//       <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
//       <meta content="date=no" name="format-detection"/>
//       <meta content="address=no" name="format-detection"/>
//       <meta content="telephone=no" name="format-detection"/>
//       <meta name="x-apple-disable-message-reformatting"/>
//       <title>
//         Emailer
//       </title>
//     </head>
//     <body> 
//       <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#eee" style="padding:10px">      
//         <tr>        
//           <td align="center" valign="top">          
//             <!-- Main -->
//             <table border="0" cellpadding="0" cellspacing="0" width="650">            
//               <tr>              
//                 <td class="td" style="width:650px; min-width:650px;font-size:14px; line-height:16px;padding:0; margin:0; font-weight:normal;background:#fff;font-family: Helvetica, Arial;">  
//                   <!-- Header -->
//                   <div style="background:#0750a4;padding:30px">
//                     <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
//                       <tbody>
//                         <tr valign="top">                    
//                             <td>
//                               <div style="display:inline-flex;padding-bottom: 20px;">
//                                 <div style="text-align: left;padding-right: 30px;" width="70%">
//                                   <img src="https://res.cloudinary.com/dvu7miswu/image/upload/v1629272379/zdpdmcvrst1nl6uk3p28.png">
                              
//                                 </div>
//                                 <div style="text-align: left;" width="30%">
//                                   <img src="https://res.cloudinary.com/dvu7miswu/image/upload/v1629272379/gkj22fxycplxvb0a9cum.png" width="100%">
//                                 </div>
//                               </div>
//                             </td>
//                         </tr>   
//                         <tr>
//                           <td>
//                             <div style="color:#fff;font-size: 13px;">
//                               <b>BLACKBURN TRAVEL CLINIC</b> in partnership with <b>BIOGRAD DIAGNOSTIC LABORATORIES LTD.</b>
//                             </div>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
                
//                   <div style="padding:40px 30px;background:#fff;">
//                     <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
//                       <tbody>
//                         <tr>
//                           <td>
//                             <div style="color:#fff;background: #0750a4;font-size: 24px;text-align: center;padding: 25px 0;">
//                               <b>PURCHASE CONFIRMATION RECEIPT</b>
//                             </div>
//                             <div style="color:#fff;background: #00a0d2;font-size: 20px;text-align: center;padding: 15px 0;">
//                               ${element.test.test_name} ${element.packageid.packageName}
//                             </div>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
  
//                   <div style="padding:0 30px 20px 30px;background:#fff;">
//                     <table border="0" cellpadding="0" cellspacing="2" width="100%" style="font-size:15px;"> 
//                       <tbody>
//                         <tr>
//                           <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform: uppercase;">Name</td>
//                           <td style="background: #e1e4f3;padding: 0 20px;"> ${element.user.firstName} ${element.user.lastName} </td>
//                         </tr>
//                         <tr>
//                           <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform: uppercase;">DATE OF BIRTH</td>
//                           <td style="background: #e1e4f3;padding: 0 20px;">${element.user.dob}</td>
//                         </tr>
//                         ${element.user.passport?`
//                         <tr>
//                         <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform: uppercase;">PASSPORT NUMBER</td>
//                         <td style="background: #e1e4f3;padding: 0 20px;">${element.user.passport_id}<</td>
//                         </tr>
//                         `:""}
//                         ${element.user.arrival_vessel_number?`<tr>
//                           <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform: uppercase;">FLIGHT NO.</td>
//                           <td style="background: #e1e4f3;padding: 0 20px;">${element.user.arrival_vessel_number}</td>
//                         </tr>`:""}
//                 <tr>
//                         <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform: uppercase;">Slot Time</td>
//                         <td style="background: #e1e4f3;padding: 0 20px;">${new Date(element.bookedFor).toLocaleDateString()}
//                   at      ${new Date(element.bookedFor).toLocaleTimeString()}
//                         </td>
//                       </tr>
//                         ${element.user.date_of_arrival?`
//                         <tr>
//                         <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform: uppercase;">ARRIVAL DATE</td>
//                         <td style="background: #e1e4f3;padding: 0 20px;">${new Date(element.user.date_of_arrival).toLocaleDateString()}</td>
//                         </tr>
//                         <tr>
//                           <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform:
//                            uppercase;">ARRIVAL TIME</td>
//                           <td style="background: #e1e4f3;padding: 0 20px;">${new Date(element.user.date_of_arrival).toLocaleTimeString()}</td>
//                         </tr>
//                         `:""}
//                         <tr>
//                           <td style="background:#0750a4;color:#fff;padding: 10px;width: 160px;text-transform: uppercase;">
//                            ADDRESS</td>
//                           <td style="background: #e1e4f3;padding: 0 20px;">${element.user.address}</td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
  
  
//                    <!-- Footer -->
//                   <div style="padding: 0 30px 0 30px;background: url(https://mrinvito.com/html/covid19_pcr/emailer/img/footer-bg.png);background-size: contain;background-repeat: no-repeat;background-position: bottom;">
//                     <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
//                       <tbody>
//                         <tr valign="bottom">  
//                             <td  width="75%">
//                                 <div style="text-align: left;padding-right: 30px;padding-bottom: 16px;color: #fff;">
//                                   <div style="padding-bottom:7px;font-size: 17px;">
//                                     <b>Blackburn Travel Clinic</b>
//                                   </div>
//                                   <div style="padding-bottom:6px;font-size: 14px;">
//                                     Email: <a href="mailto:blackburntravelclinic@gmail.com" style="color: #fff;text-decoration: none;">blackburntravelclinic@gmail.com</a>
//                                   </div>
//                                   <div style="padding-bottom:6px;font-size: 14px;">
//                                     Tel: 01254 690496
//                                   </div>
//                                   <div style="padding-bottom:6px;font-size: 14px;">
//                                     Fax: 01254 692995
//                                   </div>
//                                   <div style="font-size: 18px;">
//                                     <a href="https://www.blackburntravelclinic.co.uk/" style="color: #fff;text-decoration: none;"><b>www.blackburntravelclinic.co.uk</b></a>
//                                   </div>
//                                 </div>
//                             </td>    
//                             <td>
//                                  <img src="https://res.cloudinary.com/dvu7miswu/image/upload/v1629272379/avjrsbl8yhsowo0jtkn9.png" width="200px">
//                             </td>              
//                         </tr>   
//                       </tbody>
//                     </table>
//                   </div>
  
//                 </td>
//               </tr>
//             </table>
//               <!-- END Main -->
//           </td>
//         </tr>
//       </table>
//     </body>
//   </html> `,
//   // attachments: [
//   //   {
//   //       filename:"certificate.png",                                         
//   //       path:`http:localhost:3000/certificate/${timeSlots.user.firstName}.png`,                                         
//   //       contentType: 'application/image'
//   //   }]

//   }

//   transporter.sendMail(toSubsciberMail, (err) => {
//     if (err) {
//       console.log(
//         "some error in sending mail to subscriber",
//         err
//       );
//       return res
//         .status(400)
//         .json({
//           error: "some error in sending mail to admin",
//         });
//     }
//     console.log("message sent successfully");

    
//   });
// })
// let userData=found[0].UserId
// let toSubsciberMail2 = {
//   to: userData.email,
//   from: "btravelclinic@gmail.com",
//   subject: " Welcome to  BT Travels Clinic ",
//   html: `<html>
//   <head>    
//     <meta content="width=device-width, initial-scale=1, maximum-scale=1" name="viewport"/>
//     <meta content="IE=edge" http-equiv="X-UA-Compatible"/>
//     <meta content="date=no" name="format-detection"/>
//     <meta content="address=no" name="format-detection"/>
//     <meta content="telephone=no" name="format-detection"/>
//     <meta name="x-apple-disable-message-reformatting"/>
//     <title>
//       Emailer
//     </title>
//   </head>
//   <body> 
//     <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#eee" style="padding:10px">      
//       <tr>        
//         <td align="center" valign="top">          
//           <!-- Main -->
//           <table border="0" cellpadding="0" cellspacing="0" width="650">            
//             <tr>              
//               <td class="td" style="width:650px; min-width:650px;font-size:14px; line-height:16px;padding:0; margin:0; font-weight:normal;background-color:#fff;font-family: Helvetica, Arial;">  
//                 <!-- Header -->
//                 <div style="padding:30px">
//                   <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
//                     <tbody>
//                       <tr valign="top">                    
//                           <td>
//                             <div style="display:inline-flex;padding-bottom: 20px;">
//                               <div style="text-align: left;padding-right: 30px;" width="70%">
//                                 <img src="https://res.cloudinary.com/dvu7miswu/image/upload/v1629272379/zdpdmcvrst1nl6uk3p28.png">
                            
//                               </div>
//                               <div style="text-align: left;" width="30%">
//                                 <img src="https://res.cloudinary.com/dvu7miswu/image/upload/v1629272379/gkj22fxycplxvb0a9cum.png" width="100%">
//                               </div>
//                             </div>
//                           </td>
//                       </tr>   
//                       <tr>
//                         <td>
//                           <div style="color:#fff;font-size: 13px;">
//                             <b>BLACKBURN TRAVEL CLINIC</b> in partnership with <b>BIOGRAD DIAGNOSTIC LABORATORIES LTD.</b>
//                           </div>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>
              
//                 <div style="padding:14px 30px;">
//                   <table border="0" cellpadding="0" cellspacing="0" width="100%"> 
//                     <tbody>
//                       <tr>
//                         <td>
//                           <div style="padding-bottom: 20px;font-size: 20px;"><b>INVOICE</b></div>
//                         </td>
//                       </tr>
//                       <tr>
//                         <td width="50%">
//                           <div style="line-height:24px;font-size: 15px;">
//                           	<div>${userData.firstName} ${userData.lastName}</div>
//               							<div>${userData.address}</div>
              						
//                           </div>
//                         </td>
//                         <td width="50%">
//                           <div style="line-height: 26px;font-size: 15px;">
// 	                        <div>Invoice Number: ${data.id}</div>
//             							<div>Invoice Date: ${new Date().toLocaleDateString()}</div>
//             							<div>Order Number: ${data.balance_transaction}</div>
            						
//             							<div>Payment Method: Credit Card (Stripe)</div>
// 	                      </div>
//                         </td>
//                       </tr>
//                     </tbody>
//                   </table>
//                 </div>

//                 <div style="padding:0 30px 10px 30px;">
//                   <table border="0" cellpadding="10" cellspacing="0" width="100%" style="font-size:15px;">
//                   	<thead style="text-align: left;background: #000;color: #fff;">
//                   		<tr>
//                   			<th>Test</th>
//                   			<th>No. of Slots Booked</th>
//                   			<th>Price</th>
//                   		</tr>
//                   	</thead> 
//                     <tbody>
//                       <tr valign="top">
//                         <td style="width: 70%;">
// 	                        <div style="padding-bottom: 10px">${found[0].test.test_name}</div>
// 	                        <div style="font-size: 13px;line-height: 20px;">
//             								<div>${found[0].test.packageName}</div>
            							
//             							</div>
// 	                    </td>
//                         <td style="width: 15%">${found.length}</td>
//                         <td style="width: 15%">${data.charge/100}</td>
//                       </tr>
//                     </tbody>
//                   </table>
// 				</div>

// 				<div style="padding:0 30px 20px 30px;">
// 					<table border="0" cellpadding="14" cellspacing="0" width="100%" style="font-size:15px;border-top: solid 1px #eee;">
// 						<tr>
// 							<td style="width:50%"></td>
// 							<td style="width:50%">
// 								<table cellpadding="0" cellspacing="0" width="100%">
// 									<tr>
// 										<td style="padding:10px 0;border-bottom:solid 1px #333"><b>Subtotal</b></td>
// 										<td style="padding:10px 0;border-bottom:solid 1px #333;text-align: right;">£79.00</td>
// 									</tr>
// 									<tr style="border-bottom:solid 1px #333">
// 										<td style="padding:10px 0;border-bottom:solid 1px #333"><b>Shipping</b></td>
// 										<td style="padding:10px 0;border-bottom:solid 1px #333;text-align: right;">Shipping charges</td>
// 									</tr>
// 									<tr style="border-bottom:solid 1px #333">
// 										<td style="padding:10px 0;border-bottom:solid 1px #333"><b>Total</b></td>
// 										<td style="padding:10px 0;border-bottom:solid 1px #333;text-align: right;">£79.00</td>
// 									</tr>
// 								</table>
// 							</td>
// 						</tr>
// 					</table>
// 				</div>

// 			  </td>
//             </tr>
//           </table>
//             <!-- END Main -->
//         </td>
//       </tr>
//     </table>
//   </body>
// </html> `,


// }

// transporter.sendMail(toSubsciberMail2, (err) => {
//   if (err) {
//     console.log(
//       "some error in sending mail to subscriber",
//       err
//     );
//     return res
//       .status(400)
//       .json({
//         error: "some error in sending mail to admin",
//       });
//   }
//   console.log("message sent successfully");

  
// });
      res.json({message:"Success",data:found});
    })
    TimeSlots.updateMany({_id:{$in:slots.slots}},{UserId:md5UserId}).populate("test")
    .populate("packageid")
    .populate("user")
    .populate("UserId").then(found=>{
     console.log('Update')
    })
  }
  })
  }
  else{

    TimeSlots.find({_id:{$in:slots.slots}}).populate("test")
    .populate("packageid")
    .populate("user")
    .populate("UserId").then(found=>{
      res.json({message:"Success",data:found});
    })
  }
};
exports.PaymentStripe=async (req,res)=>{
  console.log(req.body,"slots")
  let slots=req.body.slots
  if( typeof req.body.slots==="string"){
    slots=[slots]
  }
  console.log(slots)
  res.render('payment',{slots:slots,charge:req.body.charge})
}