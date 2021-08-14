const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    title: String,

    content:String,
    name:String,
    date:String,
    rating:Number,
  },

);

const testimonial = new mongoose.model("testimonial", faqSchema);

module.exports = testimonial;
