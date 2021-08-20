// mobile menu open close
let str = "";
let nav = "";
let allSlots = [];
let arrivalSlots = [];
let day8Slots = [];
let covid_token = localStorage.getItem("covid");
getPages();
checkLogin(covid_token);
function openNav() {
  document.getElementById("mySidenav").style.left = "0";
}

function closeNav() {
  document.getElementById("mySidenav").style.left = "-100%";
}

function openchat() {
  var x = document.getElementById("sidepanel");
  var y = document.getElementById("cht-btn");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      $("#imagePreview").css(
        "background-image",
        "url(" + e.target.result + ")"
      );
      $("#imagePreview").hide();
      $("#imagePreview").fadeIn(650);
    };
    reader.readAsDataURL(input.files[0]);
  }
}
$("#imageUpload").change(function () {
  readURL(this);
});
//console.log('hello')
async function selectTest(name, index, id) {
  //console.log(index,id)
  str = "";
  let body = "";
  $(".test-div").html(str);
  let selectClasses = document.getElementsByClassName("btn-skyblue-border");
  for (let i = 0; i < selectClasses.length; i++) {
    //const element = array[index];
    if (i != index) {
      //console.log(selectClasses[i])
      selectClasses[i].classList.remove("select-btn");
    } else {
      selectClasses[i].classList.add("select-btn");
    }
  }
  $.ajax({
    url: "/getTestById/" + name + "/" + id,
    method: "Get",

    success: function (res) {
      console.log(res.tests);

      let headstr = ` <div class="col-12 text-center">
      <h4>
          ${res.tests.length} tests match your needs:
      </h4>
  </div>`;

      res.tests.forEach((ele) => {
        body += `<div class=" col-lg-4 col-md-6">
     <div class="test-box">
         <div class="package-name">
             <span class="text-white">
              ${ele.packageName}    gg                                              
             </span>
         </div>
         <div class="test-name">
             <h6>
             ${ele.packageDescription}                                                  

             </h6>
             <p>
                 Results by ${ele.testResult} next day*
             </p>
             <p>
                 Accepted in most countries - check here 
             </p>
             <hr>
         </div>                                                    
         <div class="sub-package-name">
             <p>
             ${ele.subPackageName}
             </p>
             <p>
             ${ele.subPackageNameHome}

             </p>
             <div class="price mt-4">
                 <p>
                     <span>£${ele.price1}</span> 
                     <br/>
                     <br/>
                     <br/>
                     <span>£${ele.price2}</span>
                 </p>
             </div>
             <a href="/choose-slots/${res.name}/${ele._id}" class="btn-purple d-inline-block mt-4 mb-2">
                 BOOK A PCR
             </a>
         </div> 
     </div>
 </div>                                            
 
   
`;
      });
      body = '<div class="row">' + body + "</div>";
      $("#test-div").html(body);
      $("#test-head-div").html(headstr);
    },
    error: function () {
      alert("error", "Error!", "Something happens in Server!");
    },
  });
}
// Add active class to the current button (highlight it)
var btn;
var pln = document.getElementById("plans");
if (pln) {
  btn = pln.getElementsByClassName("btns");

  for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function () {
      var current = pln.getElementsByClassName("active");
      current[0].className = current[0].className.replace(" active", "");
      this.className += " active";
    });
  }
}
$("#booking-head").html(str);
function getSlotsByArrival(type) {
  let option = "";
  let option2 = "";
  $("#slots").html(option);
  let date;
  let id = document.getElementById("test").value;
  if (type == 1) {
    let day8 = document.getElementById("date2");
    date = document.getElementById("date").value;
    let value = new Date(date);
    console.log(date, value, date);

    value.setDate(value.getDate() + 6);
    console.log(value.toISOString().substr(0, 10));
    day8.setAttribute("min", value.toISOString().substr(0, 10));
  } else {
    date = document.getElementById("date2").value;
  }
  let data = { test: id, limit: 1, date: date };
  console.log(data);
  $.ajax({
    url: "/get-avaiable-session",
    method: "POST",
    data: data,
    success: function (res) {
      // console.log(res);
      if (res.status) {
        alert(res.message);
        if (type == 1) {
          allSlots = res.data;

          res.data.forEach((ele) => {
            var spot = ele;
            // console.log(ele.bookedFor)
            option += `<option value="${ele._id}">${new Date(
              ele.bookedFor
            ).toLocaleTimeString()} </option>`;
          });
          $("select[name='inptProduct']")
            .find("option")
            .remove()
            .end()
            .append($(option));
        }
        //console.log(option,res.data)
        else {
          allSlots = res.data;

          res.data.forEach((ele) => {
            var spot = ele;
            // console.log(ele.bookedFor)
            option2 += `<option value="${ele._id}">${new Date(
              ele.bookedFor
            ).toLocaleTimeString()} </option>`;
          });
          $("select[name='inptProduct2']")
            .find("option2")
            .remove()
            .end()
            .append($(option2));
        }
      } else {
        alert("Slots not found");
      }
    },
    error: function () {
      alert("error", "Error!", "Something happens in Server!");
    },
  });
}
function getSlotsForPeople(type) {
  let option = "";
  let option2 = "";

  if (type == 1) {
    let spotforDay2 = document.getElementById("spotsForDay2").value;
    let numberOfPerson = document.getElementById("numberOfPerson").value;
    let indexOfSlot;
    allSlots.map((element, index) => {
      if (element._id == spotforDay2) {
        indexOfSlot = index;
      }
    });
    let spotsArray = allSlots.splice(indexOfSlot, numberOfPerson);
    let spotids = [];
    spotsArray.map((item) => {
      spotids.push(item._id);
    });
    arrivalSlots = spotids;

    arrivalSlots.forEach((ele) => {
      var spot = ele;
      option += `<input name='spotArrival' class="w-100 field" value=${ele}>`;
    });

    $("#slotsIdsForArrival").html(option);
    console.log(numberOfPerson, indexOfSlot, spotforDay2, spotsArray);
  } else {
    let spotforDay8 = document.getElementById("spotsForDay8").value;
    let spotforDay2 = document.getElementById("spotsForDay2");
    spotforDay2.setAttribute("disabled", true);

    let numberOfPerson = document.getElementById("numberOfPerson").value;
    let indexOfSlot;
    allSlots.map((element, index) => {
      if (element._id == spotforDay8) {
        indexOfSlot = index;
      }
    });
    let spotsArray = allSlots.splice(indexOfSlot, numberOfPerson);
    let spotids = [];
    spotsArray.map((item) => {
      spotids.push(item._id);
    });

    spotids.forEach((ele) => {
      option2 += `<input name='spotAfterDay6' class="w-100 field" value=${ele}>`;
    });

    $("#spotAfterDay6").html(option2);
    console.log(numberOfPerson, indexOfSlot, spotforDay8, spotsArray);
  }
}
function logoutHandler() {
  localStorage.removeItem("covid");
  window.location.href = "/";
}
function checkLogin(token) {
  if (!token) {
    str = ` <li class="nav-item cp-nav-item">
                                        <a class="nav-link cp-nav-link btn-purple-border mr-lg-3 mb-xl-0 mb-3" href="/login">
                                            LOGIN
                                        </a>
                                    </li>`;
  } else {
    str = ` <li class="nav-item cp-nav-item">
                                        <a class="nav-link cp-nav-link btn-purple mb-xl-0 mb-3" href="tests-listing">
                                            BOOK TEST
                                        </a>
                                        <a class="nav-link cp-nav-link btn-purple mb-xl-0 mb-3" href="/profile/${token}">
                                        My Profile
                                     </a>
                                    </li>
                                    `;
  }
  $("#booking-head").html(str);
  //console.log(str);
}
function getSlots(index) {
  $("#slots" + index).html(str);

  let id = document.getElementById("test").value;
  let date = document.getElementById("date" + index).value;
  let data = { test: id, limit: 1, date: date };
  console.log(data);
  $.ajax({
    url: "/get-avaiable-session",
    method: "POST",
    data: data,
    success: function (res) {
      // console.log(res);
      if (res.status) {
        alert(res.message);

        res.data.forEach((ele) => {
          var spot = ele;
          str += `<option value="${ele._id}">${new Date(
            ele.bookedFor
          ).toLocaleTimeString()} </option>`;
        });
        $("#slots" + index).html(str);
      } else {
        alert("Slots not found");
      }
    },
    error: function () {
      alert("error", "Error!", "Something happens in Server!");
    },
  });
}
function getData(length, slot, packageid) {
  length = Number(length);
  let array = [];
  let token = localStorage.getItem("covid");
  console.log(token);
  for (let index = 0; index < length; index++) {
    let object = {
      email: document.getElementById("email" + index).value,
      firstName: document.getElementById("fname" + index).value,
      lastName: document.getElementById("lname" + index).value,
      phone: document.getElementById("phone" + index).value,
      dob: document.getElementById("dob" + index).value,
      gender: document.getElementById("sex" + index).value,
      address: document.getElementById("address" + index).value,
      arrival_vessel_number: document.getElementById(
        "arrival_vessel_number" + index
      ).value,
      passport_id: document.getElementById("passport_id" + index).value,
      ethnicity: document.getElementById("ethnicity" + index).value,
      date_of_arrival: document.getElementById("date_of_arrival" + index).value,
      NHS: document.getElementById("NHS" + index).value,
      country_before_arrival: document.getElementById(
        "country_before_arrival" + index
      ).value,
      vaccination_status: document.getElementById("vaccination_status" + index)
        .value,
      date_depart_out_cta: document.getElementById(
        "date_depart_out_cta" + index
      ).value,
      date_arrival_out_cta: document.getElementById(
        "date_arrival_out_cta" + index
      ).value,
    };
    array.push(object);
  }

  let pd = JSON.stringify(array);
  let data = { slots: slot, personal_details: pd, packageid: packageid };
  console.log(data);
  $.ajax({
    url: "/create",
    method: "POST",
    data: data,
    Headers: { contentType: "application/json", Authorization: token },
    success: function (res) {
      console.log(res.allslots);
      localStorage.setItem("slots", JSON.stringify(res.allslots));
      window.location.href = "/test-terms";
    },
    error: function (err) {
      console.log(err, token);
      alert("Login Required");
    },
  });
  //console.log(JSON.parse(personDetails),length)
}

function getDate() {
  let inputdiv = "";
  $("#dateinputs").html(inputdiv);

  let peopleCount = document.getElementById("people").value;
  peopleCount = parseInt(peopleCount);
  console.log(peopleCount);
  for (let index = 0; index < peopleCount; index++) {
    inputdiv += `<div class="col-lg-5 col-md-6">
  <div class="form-group" id='dateinputs'>
      <label>
          Date*
      </label>
      <input type="date"
      onchange="getSlots(${index})" name="date" id="date${index}" class="w-100 field" placeholder="" required />
  </div>
</div>
<div class="col-lg-5 col-md-6">
  <div class="form-group">
      <label>
          Time*
      </label>
      <select name="slot" id='slots${index}' class="form-control" >
        

                                        </select>	
  </div>
</div><br/>`;
  }
  $("#dateinputs").html(inputdiv);
}
function getArrivalDate() {
  let day8 = document.getElementById("arrivaldate");
  let date = document.getElementById("date");
  let value = new Date(day8.value);
  let mindate = new Date(day8.value);

  value.setDate(value.getDate() + 2);
  console.log(value.toISOString().substr(0, 10));
  date.setAttribute("max", value.toISOString().substr(0, 10));
  date.setAttribute("min", mindate.toISOString().substr(0, 10));
}
$("#navbarpages").html(nav);
function getPages() {
  console.log("hello");
  $.ajax({
    url: "/pages",
    method: "Get",
    success: function (res) {
      console.log(res);

      res.data.forEach((ele) => {
        nav += `  <li>
          <a class="nav-link cp-nav-link" href="/page/${ele._id}">
             ${ele.title}
          </a>
      </li>`;
      });

      $("#navbarpages").html(nav);
    },
    error: function () {
      alert("error", "Error!", "Something happens in Server!");
    },
  });
  //console.log(str);
}
function getSlotsSingleDay() {
  let option2 = "";

  $("#slots").html(option2);

  let id = document.getElementById("test").value;

  date = document.getElementById("date").value;

  let data = { test: id, limit: 1, date: date };
  console.log(data);
  $.ajax({
    url: "/get-avaiable-session",
    method: "POST",
    data: data,
    success: function (res) {
      console.log(res);
      if (res.status) {
        alert(res.message);

        allSlots = res.data;

        res.data.forEach((ele) => {
          var spot = ele;
          // console.log(ele.bookedFor)
          option2 += `<option value="${ele._id}">${new Date(
            ele.bookedFor
          ).toLocaleTimeString()} </option>`;
        });
        $("select[name='inptProduct']")
          .find("option2")
          .remove()
          .end()
          .append($(option2));
      } else {
        alert("Slots not found");
      }
    },
    error: function () {
      alert("error", "Error!", "Something happens in Server!");
    },
  });
}
function getSlotsForPeopleSingleDay() {
  let option = "";
  let spotforDay2 = document.getElementById("spotsForSingleDay").value;
  let numberOfPerson = document.getElementById("numberOfPerson").value;
  let indexOfSlot;
  allSlots.map((element, index) => {
    if (element._id == spotforDay2) {
      indexOfSlot = index;
    }
  });
  let spotsArray = allSlots.splice(indexOfSlot, numberOfPerson);
  let spotids = [];
  spotsArray.map((item) => {
    spotids.push(item._id);
  });
  arrivalSlots = spotids;
  console.log(arrivalSlots.length, numberOfPerson);
  if (arrivalSlots.length != numberOfPerson) {
    alert(
      "Looks Like You have Choice more number of people then avaiable slots for the day.. Select Again"
    );
  } else {
    arrivalSlots.forEach((ele) => {
      var spot = ele;
      option += `<input name='spots' class="w-100 field d-none"  value=${ele}>`;
    });

    $("#slotsIdsFotSingleDayTest").html(option);
    console.log(numberOfPerson, indexOfSlot, spotforDay2, spotsArray);
  }
}
function cancelMySlot(id) {
  let data = { id: id };
  $.ajax({
    url: "/cancel-booking",
    method: "POST",
    data: data,
    Headers: { contentType: "application/json" },
    success: function (res) {
      console.log(res);

      alert("Success");
    },
    error: function () {
      alert("Something went Wrong Required");
    },
  });
}
