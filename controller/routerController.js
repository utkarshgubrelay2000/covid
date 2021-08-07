const FAQ = require("../model/faqModel");

exports.homePage = (req, res) => {
  res.render("index");
};
exports.contact = (req, res) => {
  res.render("contact");
};
exports.about = (req, res) => {
  res.render("about-us");
};

exports.faq =async (req, res) => {
  try {
    
    let faqs=await FAQ.find({}).limit(10)
    res.render("faq",{faqs:faqs,curpage:1});
  } catch (error) {
    res.send("Error")
  }
};
exports.loadMoreFaqs =async (req, res) => {
  try {
    
    let faqs=await FAQ.find({}).limit(req.body.curpage*10)
    res.render("faq",{faqs:faqs,curpage:1+req.body.curpage});
  } catch (error) {
    res.send("Error")
  }
};
exports.appointment = (req, res) => {
  res.render("appointment-bookings");
};
exports.chooseslots = (req, res) => {
  res.render("choose-slots");
};
exports.contactdetails = (req, res) => {
  res.render("contact-details");
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
exports.testslisting = (req, res) => {
  res.render("tests-listing");
};