const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    test_name: {
      type: String,
      required: true,
    },
    sub_heading: {
      type: String,
    },
    short_description: {
      type: String,
    },
    base_price: {
      type: Number,
      // required: true,
    },
    featured: {
      type: Boolean,
    },
    featured_text: {
      type: String,
    },
    max_person: {
      type: Number,
      max: 5,
    },
    test_list: [{ type: Object }],
    country_icon : {
      type : String
    }
  },
  { timestamps: true }
);

const Test = new mongoose.model("Test", testSchema);

module.exports = Test;
