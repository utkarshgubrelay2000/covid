
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

exports.homePage = (req, res) => {
  res.render("index");
};
exports.contact = (req, res) => {
  res.render("contact");
};
exports.about = (req, res) => {
  res.render("about-us");
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
exports.appointment = (req, res) => {
  res.render("appointment-bookings");
};
exports.chooseslots = async (req, res) => {
  function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }
  // let today = new Date()
  let newDate = new Date();
  let nextDate = addDays(newDate, 1);

  const tests = await Test.find();
  const slots = await TimeSlots.find({
    test: tests[0]._id,
    booked: false,
    bookedFor: { $gt: newDate, $lt: nextDate },
  });
  res.render("choose-slots", { _id: req.params.id, slots: slots });
};
exports.contactdetails = async (req, res) => {
  console.log(req.body);
  let test = await Test.findOne({ _id: req.body._id });
  let peopleArray = [];
  let peoplesDetails = {
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    arrival_vessel_number: "",
    passport_id: "",
    ethnicity: "",
    NHS: "",
    date_of_arrival: "",
    residing_address: "",
    country_before_arrival: "",
    vaccination_status: "",
    date_depart_out_cta: "",
    date_arrival_out_cta: "",
  };
  for (let index = 0; index < Number(req.body.people); index++) {
    peopleArray.push(peoplesDetails);
  }
  console.log(peopleArray.length);
  res.render("contact-details", {
    testDetails: test,
    date: req.body.date,
    slot: req.body.slot,
    people: peopleArray,
    length: peopleArray.length,
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
  res.render("notification");
};
exports.profile = (req, res) => {
  res.render("profile");
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
exports.testimonials = (req, res) => {
  res.render("testimonials");
};
exports.testslisting = async (req, res) => {
  let tests = await Test.find({});
  console.log(tests);
  res.render("tests-listing", { tests: tests });
};
exports.testsbyId = async (req, res) => {
  let tests = await TestPackage.find({ testId: req.params.id });
  // console.log(tests)
  res.send({ tests: tests,testId:req.params.id });
};
exports.createBooking = async (req, res) => {
  try {
    const { slots } = req.body;
    sloted=slots.split(',')
    console.log('hello',sloted)
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
        { booked: true, user: saved._id, ...req.body },
        { new: true }
      );
      console.log(res)
     return saved._id
    })
    });
 
 
     
    const detailsResult = await Promise.all(promises);
    console.log({ detailsResult });

    const promise2 = [];
    detailsResult.map((person, index) => {
      promise2.push(
       
      );
    });

    const details = await Promise.all(promise2);
    console.log({ details });
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