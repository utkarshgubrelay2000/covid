const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    test_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
    },
    persons: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    time: {
      type: String,
      default: Date.now(),
    },
    slots: {
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "TimeSlots",
      type: String,
    },
    personal_details: {
      // type: [{ type: mongoose.Schema.Types.ObjectId, ref: "PersonalDetails" }],
      type: Array,
      required: true,
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
  },
  { timestamps: true }
);

const Booking = new mongoose.model("Booking", bookingSchema);

module.exports = Booking;
