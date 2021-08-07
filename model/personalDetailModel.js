const mongoose = require("mongoose");

const personalDetailsSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    dob: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "others"],
    },
    address: {
      // type : String,
      // required : true
      street1: String,
      street2: String,
      street3: String,
      city: String,
      country: String,
      postcode: Number,
    },
    arrival_vessel_number: {
      type: Number,
      required: true,
    },
    passport_id: {
      type: String,
      required: true,
    },
    ethnicity: {
      type: String,
    },
    NHS: {
      type: String,
    },
    date_of_arrival: {
      type: String,
      required: true,
    },
    date_depart_out_cta: {
      type: String,
    },
    date_arrival_out_cta: {
      type: String,
    },
    country_before_arrival: {
      type: String,
    },
    vaccination_status: {
      type: String,
      enum: ["fully", "partially", "pending"],
      required: true,
    },
    residing_address: {
      // type : String,
      // required : true
      street1: String,
      street2: String,
      street3: String,
      city: String,
      country: String,
      postcode: Number,
    },
    slot: { type: mongoose.Schema.Types.ObjectId, ref: "TimeSlots" }
  },
  { timestamps: true }
);

const PersonalDetails = new mongoose.model(
  "PersonalDetail",
  personalDetailsSchema
);
//PersonalDetails.syncIndexes()

module.exports = PersonalDetails;
