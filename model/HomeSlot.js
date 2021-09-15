const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema({
  UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  test: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
  packageid: { type: mongoose.Schema.Types.ObjectId, ref: "TestPackage" },
  paid: { type: Boolean, default: false },
  homeAddress: Object,
  date: Date,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "PersonalDetail",
  },
});

const HomeTestBooking = new mongoose.model("HomeTestBooking", faqSchema);

module.exports = HomeTestBooking;
