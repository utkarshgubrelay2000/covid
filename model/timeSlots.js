const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema(
  {
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    test: { type: mongoose.Schema.Types.ObjectId, ref: "Test" },
    packageid: { type: mongoose.Schema.Types.ObjectId, ref: "TestPackage" },
    available: { type: Boolean },
    bookedFor: { type: Date, default: Date.now() },
    paid: { type: Boolean, default: false },
    duration: { type: String },
    booked: { type: Boolean, default: false },
    approved: { type: Boolean, default: false },
    amount: { type: String },
    barcode: { type: String },
    // booking_id: {
    //   type: mongoose.Schema.Types.ObjectId,611a431aed2e510ca06e52bd
    //   ref: "Booking",
    // },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PersonalDetail",
    },
    transaction_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Transaction",
    },
    results: {
      type: String,
      enum: ["positive", "negative", "pending", "cancelled"],
      required: true,
      default: "pending",
    },
    home: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const TimeSlots = new mongoose.model("TimeSlots", timeSlotSchema);

module.exports = TimeSlots;
