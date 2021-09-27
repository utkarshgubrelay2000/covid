const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    phone:String,destination:String,covidQuery:String,subject:String,message:String
   
  },
  { timestamps: true }
);

userSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

const Enquiries = new mongoose.model("Enquiries", userSchema);

module.exports = Enquiries;
