const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    question: {
      type: String,
    },
    answer: {
      type: String,
    },
  },
  { timestamps: true }
);

const FAQ = new mongoose.model("FAQ", faqSchema);

module.exports = FAQ;
