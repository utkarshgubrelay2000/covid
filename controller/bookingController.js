let { Scheduler } = require("@ssense/sscheduler");
let timeSlotModal = require("../model/timeSlots");
let testModal = require("../model/testModel");
// let Restaurant = require("../model/restaurantModel");
let moment = require("moment");

const PersonalDetails = require("../model/personalDetailModel");
const TimeSlots = require("../model/timeSlots");
const { validate } = require("validate.js");

// Create time slots for restaurant
let generateTimeSlots = async (req, res) => {
  const { id } = req.body;
  let data = {
    duration: "120",
    weekdaysArr: [
      {
        days: ["wednesday", "thursday", "friday"],
        startTime: "10:30",
        endTime: "22:30",
        lunchStart: "13:30",
        lunchEnd: "14:30",
      },
      {
        days: ["monday", "tuesday"],
        startTime: "10:30",
        endTime: "17:30",
        lunchStart: "13:30",
        lunchEnd: "14:30",
      },
    ],
  };
  if (req.body.duration && req.body.weekdaysArr) {
    const { duration, weekdaysArr } = req.body;
    data = {
      duration,
      weekdaysArr,
    };
  }

  let currentDate = moment().format("YYYY-MM-DD");

  moment.addRealMonth = function addRealMonth(d) {
    var fm = moment(d).add(1, "M");
    var fmEnd = moment(fm).endOf("month");
    return d.date() != fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
      ? fm.add(1, "d")
      : fm;
  };
  moment.addRealWeek = function addRealWeek(d) {
    var fm = moment(d).add(4, "weeks").startOf("isoWeek");
    var fmEnd = moment(fm).endOf("isoWeek");
    return d.date() != fm.date() && fm.isSame(fmEnd.format("YYYY-MM-DD"))
      ? fm.add(1, "d")
      : fm;
  };

  let futureMonth = moment.addRealMonth(moment()).format("YYYY-MM-DD");
  let futureWeek = moment.addRealWeek(moment()).format("YYYY-MM-DD");

  let objArray = [];
  data.weekdaysArr.map((el) => {
    // console.log({ el });
    let obj = {};
    el.days.map((day) => {
      // console.log({ day });
      obj.from = el.startTime;
      obj.to = el.endTime;
      obj.unavailability = [
        {
          from: el.lunchStart,
          to: el.lunchEnd,
        },
      ];

      objArray.push({ [day]: obj });
    });
  });
  await timeSlotModal.deleteMany({ test: id, booked: false });

  // console.log("deleted_______________---", );
  testArray = Object.assign({}, ...objArray);

  let { duration, interval } = data;
  const scheduler = new Scheduler();
  const availability = scheduler.getAvailability({
    from: currentDate,
    to: futureWeek,
    duration: parseInt(duration),
    interval: parseInt(duration),
    schedule: testArray,
  });
  console.log(
    { availability },
    {
      from: currentDate,
      to: futureWeek,
      duration: parseInt(duration),
      interval: parseInt(duration),
      schedule: testArray,
    }
  );
  const promises = [];
  let result;
  let timeSlotsArray = [];
  let availabilityDates = Object.keys(availability).map((key, index) => {
    let dash = availability[key];
    dash.map((el) => {
      let timeString = key + " " + el.time + ":00";
      // console.log({ timeString });
      const myDate = moment(timeString);
      let timeModel = new timeSlotModal({
        bookedFor: myDate,
        available: el.available,
        test: id,
      });

      promises.push(timeModel.save());
    });
  });
  result = await Promise.all(promises);
  // console.log({ result });
  for (let i = 0; i < result.length; i++) {
    timeSlotsArray.push(result[i]._id);
  }

  //console.log({ timeSlotsArray, availability });

  let RenewDate = availabilityDates.pop();
  // console.log("nested__________________________________");
  // console.log(timeSlotsArray, "__________________________________________");
  // console.log({ RenewDate });
  testModal
    .findByIdAndUpdate(
      id,
      {
        $set: {
          opening_timings: timeSlotsArray,
        },
      },
      { new: true }
    )
    .then((result) => {
      if (req.body.duration)
        res.json({
          status: true,
          message: "Time Slots Saved",
          data: availability,
        });
      //   console.log(result);
    })
    .catch((err) => {
      console.log(err);
    });
};

//Get restaurant timings
let getSlots = (req, res) => {
  let { limit, test, date } = req.body;
  function addDays(theDate, days) {
    return new Date(theDate.getTime() + days * 24 * 60 * 60 * 1000);
  }
  // let today = new Date()
  let newDate = new Date(date);
console.log(date, newDate, typeof date, test)

  let nextDate = addDays(newDate, limit);
  console.log({ nextDate });
  timeSlotModal
    .find({ test, booked: false, bookedFor: { $gt: newDate, $lt: nextDate } })
    .sort({ bookedFor: 1 })
    .then((appointments) => {
      res.status(200).json({
        status: true,
        message: "Slots Fetched",
        data: appointments,
      });
    })
    .catch((error) => {
      res.status(404).json({ status: false, message: error });
    });
};
const createBooking = async (req, res) => {
  try {
    const { slots } = req.body;
    console.log('hello')
     personal_details=JSON.parse(req.body.personal_details)
     
    const validation = validate(req.body, {
     
      slots: {
        presence: true,
      },
      personal_details: {
        presence: true,
      },
    });

    if (validation) {
      res.status(400).json({
        error: validation,
        status: false,
      });
      return console.log(validation);
    }
    console.log('here')
    let users=[]
     const promises =   personal_details.map((person, index) => {
      const details = new PersonalDetails({ ...person, slot: slots });
     details.save().then(saved=>{
       users.push(saved._id)
     let res= TimeSlots.findOneAndUpdate(
        { _id: person.slot },
        { booked: true, user: saved._id, ...req.body },
        { new: true }
      );
     // console.log(res)
     return saved._id
    })
    });
 
  console.log('here 2')
     
    // const detailsResult = await Promise.all(promises);
    // console.log({ detailsResult });

    // const promise2 = [];
    // detailsResult.map((person, index) => {
    //   promise2.push(
       
    //   );
    // });

    // const details = await Promise.all(promise2);
    // console.log({ details });
    setTimeout(() => {
      
 
    console.log(users,promises)
    if (promises)
      res
        .json({ message: "Booking Saved!",users:users , status: true });
    else
      res.status(400).json({
        status: false,
        data: 'Something wrong',
      });
    }, 600);

   
  } catch (error) {
    res.status(503).json({
      status: false,
      data: error,
    });
  }
};
module.exports = {
  generateTimeSlots,
  getSlots,
  createBooking
};
