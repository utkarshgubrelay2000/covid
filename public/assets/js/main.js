// mobile menu open close
let str = "";
let nav = "";
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
async function selectTest(id, index) {
  //console.log(index,id)
  str = "";
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
    url: "/getTestById/" + id,
    method: "Get",

    success: function (res) {
      console.log(res.tests);

      let headstr = ` <div class="col-12 text-center">
      <h4>
          ${res.tests.length} tests match your needs:
      </h4>
  </div>`;
      let body;
      res.tests.forEach((ele) => {
        body = `<div class=" col-lg-6 col-md-6">
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
             <a href="/choose-slots/${res.testId}" class="btn-purple d-inline-block mt-4 mb-2">
                 BOOK A PCR
             </a>
         </div> 
     </div>
 </div>                                            
 
   
`;
      });
      let render = `<div class="row justify-content-center">${body} </div>`;
      str = `${headstr} ${render} `;
      $(".test-div").html(str);
    },
    error: function () {
      Toast("error", "Error!", "Something happens in Server!");
    },
  });
}
// Add active class to the current button (highlight it)
var pln = document.getElementById("plans");
var btn = pln.getElementsByClassName("btns");
for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function () {
    var current = pln.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}

$("#booking-head").html(str);
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
                                    </li> `;
  }
  $("#booking-head").html(str);
  //console.log(str);
}
function getSlots(index) {
  $("#slots" + index).html(str);

  let id = document.getElementById("test").value;
  let date = document.getElementById("date" + index).value;
  let data = { test: id, limit: 1, date: date };
  console.log(data)
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
      Toast("error", "Error!", "Something happens in Server!");
    },
  });
}
function getData(length, slot) {
  length = Number(length);
  let array = [];
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
  ///  console.log(array)
  let pd = JSON.stringify(array);
  let data = { slots: slot, personal_details: pd };
  console.log(data);
  $.ajax({
    url: "/create",
    method: "POST",
    data: data,
    Headers: { contentType: "application/json" },
    success: function (res) {
      console.log(res);
      localStorage.setItem("users", JSON.stringify(res.users));
      window.location.href = "/test-terms";
    },
    error: function () {
      alert("error", "Error!", "Something happens in Server!");
    },
  });
  //console.log(JSON.parse(personDetails),length)
}
function getDate() {
  let inputdiv = "";
  $("#dateinputs").html(inputdiv);

  let peopleCount = document.getElementById("people").value;
  peopleCount = parseInt(peopleCount);
  console.log(peopleCount)
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
