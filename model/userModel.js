const mongoose = require("mongoose");
const crypto = require("crypto");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
     
    },
    gender: {
      type: String,
     
      enum: ["male", "female", "others"],
    },
    address: {
      type: String,
    
    },
    otp: String,
    ResetToken: String,
    expireToken: Date,
    role : {
      type : String,
      default : "user",
      enum : ['admin','user']
    },
    profile_img :{
      type : String
    }
  },
  { timestamps: true }
);

userSchema.methods.generatePasswordReset = function () {
  this.resetPasswordToken = crypto.randomBytes(20).toString("hex");
  this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
};

const User = new mongoose.model("User", userSchema);

module.exports = User;
