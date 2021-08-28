const mongoose = require("mongoose");
const Test = require("./testModel");

const testPackageSchema = new mongoose.Schema(
  {
    testId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
    },
    packageName: {
      type: String,
      required: true,
    },
    img:String,
    packageTitle: {
      type: String,
    },
    packageDescription: {
      type: String,
    },
    subPackageName: {
      type: String,
    },
    mandatoryDays: {
      type: Number,
    },
    testResult: {
      type: String,
    },
    price1: {
      type: Number,
    },
    subPackageNameHome: {
      type: String,
    },
    testResultHome: {
      type: Number,
    },
    price2: {
      type: Number,
    },
  },
  { timestamps: true }
);

const TestPackage = new mongoose.model("TestPackage", testPackageSchema);

module.exports = TestPackage;
