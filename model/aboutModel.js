const mongoose = require("mongoose");

const faqSchema = new mongoose.Schema(
  {
    
    content:String,
    content3:String,
    shortdescription:String,
    img:String
  },

);

const about = new mongoose.model("about", faqSchema);

module.exports = about;
