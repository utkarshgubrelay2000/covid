const mongoose = require("mongoose");
const Test = require("./testModel");

const NotificationSchema = new mongoose.Schema(
  {
    slotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "TimeSlots",
    },
    UserId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    status:String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "PersonalDetail",
      },
  },
  { timestamps: true }
);

const Notification = new mongoose.model("Notification", NotificationSchema);

module.exports = Notification;
