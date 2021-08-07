const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      // required : true
    },
    date: {
      type: Date,
      default: Date.now(),
    },
    booking_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      // required: true,
    },
    transaction_id: {
      type: String, //Edit at later stage!
    },
  },
  { timestamps: true }
);

const Transaction = new mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
