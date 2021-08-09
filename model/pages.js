const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    title: {
      type: String,
    },
    heading: {
      type: String,
    },
    content:String,
    content2:String,
    img:String,
  },

);

const Page = new mongoose.model("Page", faqSchema);

module.exports = Page;
