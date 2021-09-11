// mobile menu open close
let str = "";
let nav = "";
let allSlots = [];
let arrivalSlots = [];
let arrivalDate = "";
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
        body += `<div class="col-md-4 col-10  ">
     <div class="test-box">
         <div class="package-name">
             <span class="text-white">
              ${ele.packageName}                                                 
             </span>
         </div>
         <div class="test-name">
             <h6>
             
             ${ele.packageTitle}  
             </h6>
           
           
             <hr>
         </div>                                                    
         <div class="sub-package-name">
         <p>
         ${ele.packageDescription}                                                  
         </p>
             <p>
             ${ele.subPackageName}
             </p>
             
             <div class="price mt-4">
                 <p>
                     <span>£${ele.price1}</span> 
                    
                 </p>
             </div>
             <a href="/choose-slots/${res.name}/${ele._id}" class="btn-purple d-inline-block mt-4 mb-2">
             BOOK A PCR
         </a>
         <br>
         ${ele.daysCombo=='p2'?` 
          <a href="/choose-slots-home/${res.name}/${ele._id}" class="btn-outlined-purple d-inline-block mt-4 mb-2">
         Book A Home  Kit appointment
     </a>`:ele.daysCombo=='p28'?` 
     <a href="/choose-slots-home/${res.name}/${ele._id}" class="btn-outlined-purple d-inline-block mt-4 mb-2">
     Book A Home  Kit appointment
</a>`:ele.daysCombo=='p258'?` 
<a href="/choose-slots-home/${res.name}/${ele._id}" class="btn-outlined-purple d-inline-block mt-4 mb-2">
Book A Home  Tit appointment
</a>`:""}
${ele.daysCombo=='2'?` 
<a href="/choose-slots-days-home/${res.name}/${ele._id}" class="btn-outlined-purple d-inline-block mt-4 mb-2">
Book A Home  Tit appointment
</a>`:ele.daysCombo=='28'?` 
<a href="/choose-slots-days-home/${res.name}/${ele._id}" class="btn-outlined-purple d-inline-block mt-4 mb-2">
Book A Home  Tit appointment
</a>`:ele.daysCombo=='258'?` 
<a href="/choose-slots-days-home/${res.name}/${ele._id}" class="btn-outlined-purple d-inline-block mt-4 mb-2">
Book A Home  Tit appointment
</a>`:ele.daysCombo=='5'?` 
<a href="/choose-slots-days-home/${res.name}/${ele._id}" class="btn-outlined-purple d-inline-block mt-4 mb-2">
Book A Home  Tit appointment
</a>`:""}
             ${/*ele.price2?` <div class="sub-package-name">
                 <p>
                 ${ele?.subPackageNameHome}
                 </p>
                 <div class="price mt-4">
                     <p>
                         <span>£${ele?.price2}</span> 
                     </p>
                 </div>
                 <a href="/choose-slots/${res.name}/${ele._id}" class="btn-purple d-inline-block mt-4 mb-2">
                 BOOK A PCR
      </a></div>`*/" " }
         
         </div> 
     </div>
 </div>                                            
 
   
`;
      });
      body = '<div class="row" style="justify-content: center;">' + body + "</div>";
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
  } 
  else if(type==3) {
    date = document.getElementById("date5").value;
  }
  else if(type==5) {
    let day8 = document.getElementById("date5");
    date = document.getElementById("date").value;

    let value = new Date(date);
    
    console.log(date, value, date);

    value.setDate(value.getDate() + 5);
    console.log(value.toISOString().substr(0, 10));
    day8.setAttribute("min", value.toISOString().substr(0, 10));
  }
  else if(type==6) {
    let day8 = document.getElementById("date2");
    date = document.getElementById("date5").value;

    let value = new Date(date);
    
    console.log(date, value);

    value.setDate(value.getDate() + 7);
    console.log(value.toISOString().substr(0, 10));
    day8.setAttribute("min", value.toISOString().substr(0, 10));
  }
  else if(type==4) {
    date = document.getElementById("date2").value;
  }
  else if(type==7) {
    date = document.getElementById("date").value;
  }
  else {
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
          option += `<option value="">Select Slot </option>`
          res.data.forEach((ele) => {
            var spot = ele;
            // console.log(ele.bookedFor)
            option += `<option value="${ele._id}">${new Date(
              ele.bookedFor
            ).toLocaleTimeString()} </option>`;
          });
       //   console.log(options)
          $("select[name='inptProduct']")
            .find("option")
            .remove()
            .end()
            .append($(option));
        }
      else  if (type == 3 || type ==4 || type==5  || type==7) {
          allSlots = res.data;
          option += `<option value="">Select Slot </option>`
          res.data.forEach((ele) => {
            var spot = ele;
            // console.log(ele.bookedFor)
            option += `<option value="${ele._id}">${new Date(
              ele.bookedFor
            ).toLocaleTimeString()} </option>`;
          });
        //  console.log(option)
          $("select[name='inptProduct']")
            .find("option")
            .remove()
            .end()
            .append($(option));
        }
        else  if (type == 6) {
          allSlots = res.data;
          option += `<option value="">Select Slot </option>`
          res.data.forEach((ele) => {
            var spot = ele;
            // console.log(ele.bookedFor)
            option += `<option value="${ele._id}">${new Date(
              ele.bookedFor
            ).toLocaleTimeString()} </option>`;
          });
        //  console.log(option)
          $("select[name='inptProduct5']")
            .find("option")
            .remove()
            .end()
            .append($(option));
        }
        //console.log(option,res.data)
        else {
          allSlots = res.data;
          option2 += `<option value="">Select Slot </option>`
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
    if (arrivalSlots.length != numberOfPerson) {
      alert(
        "Looks Like You have Choice more number of people then avaiable slots for the day.. Select Again"
      );
    } else {
    arrivalSlots.forEach((ele) => {
      var spot = ele;
      option += `<input name='spotArrival' class="w-100 field" value=${ele}>`;
    });

    $("#slotsIdsForArrival").html(option);
    console.log(numberOfPerson, indexOfSlot, spotforDay2, spotsArray);}
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
    if (spotsArray.length != numberOfPerson) {
      alert(
        "Looks Like You have Choice more number of people then avaiable slots for the day.. Select Again"
      );
    } else {
    spotids.forEach((ele) => {
      option2 += `<input name='spotAfterDay6' class="w-100 field" value=${ele}>`;
    });

    $("#spotAfterDay6").html(option2);
    console.log(numberOfPerson, indexOfSlot, spotforDay8, spotsArray);}
  }
}
function logoutHandler() {
  localStorage.removeItem("covid");
  window.location.href = "/";
}
function checkLogin(token) {
  if (!token) {
    str = ` <li class="nav-item cp-nav-item"><a class="nav-link cp-nav-link btn-purple mb-xl-0 mb-3" href="/tests-listing">
                                            BOOK TEST
                                        </a>
                                        <a class="nav-link cp-nav-link btn-purple-border mr-lg-3 mb-xl-0 mb-3" href="/login">
                                            LOGIN
                                        </a>
                                    </li>`;
  } else {
    str = ` <li class="nav-item cp-nav-item">
                                        <a class="nav-link cp-nav-link btn-purple mb-xl-0 mb-3" href="/tests-listing">
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
  let optionBox=""
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
          optionBox += `<option value="${ele._id}">${new Date(
            ele.bookedFor
          ).toLocaleTimeString()} </option>`;
        });
        $("#slots" + index).html(optionBox);
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
  let isValid = true;
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
    console.log(object.phone)
    array.push(object);
  }
  const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  for (let index = 0; index < length; index++) {
    if (
      !array[index].email ||
      !re.test(String(array[index].email).toLowerCase())
    ) {
      isValid = false;
      console.log( re.test(String(array[index].email).toLowerCase()))
      alert("Email Not Valid For Person  For Person" + Number(index + 1));
      break;
    }
    else  if (
      !array[index].phone 
    ) {
      isValid = false;
      alert("Phone Not Valid For Person  " + Number(index + 1));
      break;
    }
    else  if (
      !array[index].firstName ||
      !array[index].lastName
    ) {
      isValid = false;
      alert("Value For Name Not Found  For Person" + Number(index + 1));
      break;
    }
    else  if (
      !array[index].dob 
    
    ) {
      isValid = false;
      alert("Date Of Birth is Empty For Person" + Number(index + 1));
      break;
    }
    else  if (
      !array[index].address 
    ) {
      isValid = false;
      alert("Address is Empty For Person" + Number(index + 1));
      break;
    }
    else  if (
      !array[index].arrival_vessel_number 
    ) {
      isValid = false;
      alert("arrival vessel number  is Empty For Person" + Number(index + 1));
      break;
    }
    else  if (
      !array[index].passport_id 
    ) {
      isValid = false;
      alert("passport Id is Empty For Person" + Number(index + 1));
      break;
    }
    else  if (
      !array[index].vaccination_status
    ) {
      isValid = false;
      alert("vaccination Status is Empty For Person" + Number(index + 1));
      break;
    }

  }
if(isValid){
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
function getArrivalDate(dayCombo) {
  console.log(dayCombo)
  let arrivalDate = document.getElementById("arrivaldate");
  if(dayCombo=='28'){
    let date = document.getElementById("date");
    let value = new Date(arrivalDate.value);
    let mindate = new Date(arrivalDate.value);
    document.getElementById("arrivaldateinput").value=value.toISOString().substr(0, 10)
    value.setDate(value.getDate() + 2);
    console.log(value.toISOString().substr(0, 10));
    date.setAttribute("max", value.toISOString().substr(0, 10));
    date.setAttribute("min", mindate.toISOString().substr(0, 10));
  }
 else if(dayCombo=='5'){
    let date = document.getElementById("date5");
    let value = new Date(arrivalDate.value);
    let mindate = new Date(arrivalDate.value);
    document.getElementById("arrivaldateinput").value=value.toISOString().substr(0, 10)
    value.setDate(value.getDate() + 5);
    console.log(value.toISOString().substr(0, 10));
    date.setAttribute("min", value.toISOString().substr(0, 10));
    //date.setAttribute("min", mindate.toISOString().substr(0, 10));
  }
  else if(dayCombo=='2'){
    let date = document.getElementById("date2");
    let value = new Date(arrivalDate.value);
    let mindate = new Date(arrivalDate.value);
    document.getElementById("arrivaldateinput").value=value.toISOString().substr(0, 10)
    value.setDate(value.getDate() + 2);
    console.log(value.toISOString().substr(0, 10));
    date.setAttribute("min", value.toISOString().substr(0, 10));
    date.setAttribute("min", mindate.toISOString().substr(0, 10));
  }else{
    let date = document.getElementById("date");
    let value = new Date(arrivalDate.value);

    let mindate = new Date(arrivalDate.value);
    document.getElementById("arrivaldateinput").value=value.toISOString().substr(0, 10)
    value.setDate(value.getDate() + 2);
    console.log(value.toISOString().substr(0, 10));
    date.setAttribute("max", value.toISOString().substr(0, 10));
    date.setAttribute("min", mindate.toISOString().substr(0, 10));
  }
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
        option2 += `<option value="">Select Slot </option>`
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
      option += `<input name='spots' class="w-100 field "  value=${ele}>`;
    });

    $("#slotsIdsFotSingleDayTest").html(option);
    //console.log(numberOfPerson, indexOfSlot, spotforDay2, spotsArray);
  }
}
function getSlotsDay(type) {
  if(type==1){

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
          option += `<input name='spots' class="w-100 field "  value=${ele}>`;
        });
        
        $("#personSpotsForDay5").html(option);
        //console.log(numberOfPerson, indexOfSlot, spotforDay2, spotsArray);
      }
    }
   else if(type==2){

      let option = "";
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
      console.log(arrivalSlots.length, numberOfPerson);
      if (arrivalSlots.length != numberOfPerson) {
        alert(
          "Looks Like You have Choice more number of people then avaiable slots for the day.. Select Again"
          );
        } else {
          arrivalSlots.forEach((ele) => {
            var spot = ele;
            option += `<input name='spots' class="w-100 field "  value=${ele}>`;
          });
          
          $("#BookingForDay2Only").html(option);
          //console.log(numberOfPerson, indexOfSlot, spotforDay2, spotsArray);
        }
      }
      else if(type==4){

        let option = "";
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
        console.log(arrivalSlots.length, numberOfPerson);
        if (arrivalSlots.length != numberOfPerson) {
          alert(
            "Looks Like You have Choice more number of people then avaiable slots for the day.. Select Again"
            );
          } else {
            arrivalSlots.forEach((ele) => {
              var spot = ele;
              option += `<input name='spots' class="w-100 field "  value=${ele}>`;
            });
            
            $("#BookingForDay2Only").html(option);
            //console.log(numberOfPerson, indexOfSlot, spotforDay2, spotsArray);
          }
        }
        else if(type==5){

          let option = "";
          let spotforDay2 = document.getElementById("slotForDay5").value;
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
                option += `<input name='spots5' class="w-100 field "  value=${ele}>`;
              });
              
              $("#personSpotsForDay5").html(option);
              //console.log(numberOfPerson, indexOfSlot, spotforDay2, spotsArray);
            }
          }
          else if(type==6){

            let option = "";
            let spotforDay2 = document.getElementById("spotsForDay8").value;
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
                  option += `<input name='spots8' class="w-100 field "  value=${ele}>`;
                });
                
                $("#spotAfterDay6").html(option);
                //console.log(numberOfPerson, indexOfSlot, spotforDay2, spotsArray);
              }
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
