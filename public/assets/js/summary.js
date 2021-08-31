function getSlotDetails() {
  let slots = JSON.parse(localStorage.getItem("slots"));
  let token = localStorage.getItem("covid");
  console.log(slots);
  if (slots) {
    let data = { slots: slots, token: token };
    $.ajax({
      url: "/get-slot-details",
      method: "PATCH",
      data: data,
      Headers: { contentType: "application/json" },
      success: function (res) {
        console.log(res);

        let contact = `  
      <div class="row">
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
          <h1>Login</h1>
  

            <button type="button" class="close" id='close-login'  data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
          <div class="login-right">
          <div class="login-right-wrap">
             
              <div class="form-group">
                  <label class="form-control-label">Email Address</label>
                  <input type="email" class="form-control" id="email" name="email" value="">
              </div>
              <div class="form-group">
                  <label class="form-control-label">Password</label>
                  <div class="pass-group">
                      <input type="password" name="password" id="password" class="form-control pass-input"
                          value="">
              
                  </div>
              </div>
              <div class="form-group">
                  <div class="row">
                     
                    
                  </div>
              </div>
           
      </div>
          </div>
          <div class="modal-footer">
          <a   class="btn-purple  d-inline-block mt-4 mb-md-0 mb-3" onclick='closeLogin()' >
          Signup
      </a>
           <a href='#' data-toggle="modal" id='openSignup' data-target="#exampleModal1"
            class="btn-purple d-none mt-4 mb-md-0 mb-3">
          Signup
      </a>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary" id='loginForm'>Login</button>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
        <h1>Signup</h1>
          <button type="button" class="close" data-dismiss="modal" id='close-signup'aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
        <div class="login-right">
        <div class="login-right-wrap">
           
        <div class="row pt-xl-4">
        <div class="col-md-12 form-group mb-4">
              <label > First Name </label>
              <div >
                  <input type="text" name="firstName" 
                  id="firstName"  class="w-100 field" placeholder="Enter Your First Name">
              </div>
          </div>
        <div class="col-md-12 form-group mb-4">
              <label >Last Name </label>
              <input type="lastName" name="lastName" id="lastName" placeholder="Last Name " 
              class="w-100 field" required />
              <i class="fas fa-check"></i>
           
          </div>
      <div class="col-md-12 form-group mb-4">
          <label>Email Address</label>
          <div>
              <input type="email" name="email" id="signupemail" 
              placeholder="Enter email address" class="w-100 field" required />
              <i class="fas fa-check"></i>
          </div>
      </div>
      <div class="col-md-12 form-group mb-4">
          <label>Password</label>
          <div>
              <input type="password" name="password" id="signuppassword" placeholder="**********" class="w-100 field" required />
              <i class="fas fa-check"></i>
          </div>
      </div>
    <div class="col-md-12 form-group mb-4">
<label > Phone </label>

<input type="text" name="phone" 
id="phone"  class="w-100 field" value="">
</div>
</div>
         
    </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal" >Close</button>
          <button type="button" class="btn btn-primary" id='SignupForm'>Login</button>
        </div>
        </div>
      </div>
    </div>
  </div>
          <div class="col-xl-10 col-lg-9 col-md-9">
              <h5 class="text-purple mb-4 mr-4">
                 ${res.data[0].test.test_name} -  ${
          res.data[0].packageid.packageTitle
        }
                  <a href="#" class="edit-btn">
                      <i class="fas fa-pencil-alt"></i>
                  </a>
              </h5>
              <div class="cust-desc">
                  <p class="mb-2">
                   
                  </p>
                  <p class="mb-0">
                      Booking Details:
                  </p>
                  ${res.data
                    .map(function (work) {
                      return `<div class='border'>
                      <ul>
                      <li>Slot Id:${work._id}</li>
                      <li>Date :${new Date(work.bookedFor).toDateString()}</li>
                      <li>Time :${new Date(
                        work.bookedFor
                      ).toLocaleTimeString()}</li>
                      <li>Name :${
                        work.user.firstName
                      } ${work.user.lastName}</li>
                      </ul></div>`;
                    })
                    .join("")}

               
              </div>
          </div>
          <div class="col-xl-2 col-lg-3 col-md-3 text-right">
              <div class="price">
                  <h5 class="text-purple mt-md-0 mt-3 mb-0">
                  £    ${res.data[0].packageid.price1}.00
                  </h5>
              </div>
          </div>
      </div>
  
      <div class="row">
          <div class="col-12">
              <hr>
          </div>
      </div>
  
     
  
      <div class="row mt-3">
          <div class="col-xl-10 col-lg-9 col-md-9">
              <h5 class="text-purple mb-4 mr-4">
                  Ammount Due
              </h5>
          </div>
          <div class="col-xl-2 col-lg-3 col-md-3 text-right">
              <div class="price">
                  <h5 class="text-purple mb-3">
                  £    ${res.data[0].packageid.price1 * res.data.length}.00
                  </h5>
              </div>
          </div>
      </div>
  
      <div class="row">
          <div class="col-12">
              <hr>
          </div>
      </div>
  
      <div class="row">
          <div class="col-12">
              <div class="form-group checkboxes-data mb-1">
                  <input type="checkbox" id="conformation" class="d-none" checked="">
                  <label for="conformation">
                      I Confirm I have checked the above information and this is correct
                  </label>
              </div>
          </div>
          <div class="col-12">
              <div class="form-group checkboxes-data mb-1">
                  <input type="checkbox" id="acknowledge" class="d-none" checked="">
                  <label for="acknowledge">
                      I acknowledge that I have allowed sufficient time to receive my test results ahead of any travel plans I may have
                  </label>
              </div>
          </div>
          <div class="col-md-6 text-md-left text-center">
              <a href="test-terms" class="btn-purple-border border-0 d-inline-block mt-4 mb-md-0 mb-3">
                 GO BACK
              </a>
          </div>
          <div class="col-md-6 text-md-right text-center">
          ${
            token
              ? `<form action='/payment-stripe' method="POST"> 
              <input name='charge' value='${
                res.data[0].packageid.price1 * res.data.length
              }.00' class='d-none'/>
              ${res.data
                .map(function (work) {
                  return `<div class='border'>
                  <input name='slots' value=${work._id} class='d-none'/> </div>`;
                })
                .join("")}
              <button  class="btn-purple d-inline-block mt-4 mb-md-0 mb-3">
          CONTINUE
      </button><form> `
              : ` <button  data-toggle="modal" id='openLogin' data-target="#exampleModal" class="btn-purple d-inline-block mt-4 mb-md-0 mb-3">
      Login
  </button>`
          }
             
          </div>
      </div>
  `;
      
        $("#contactform").html(contact);
        $("#loginForm").click(function () {
          let password = document.getElementById("password").value;
          let email = document.getElementById("email").value;
          $.ajax({
            url: "/login",
            method: "Post",
            data: { email: email, password: password },
            success: function (res) {
              console.log(res);
              localStorage.setItem("covid", res.token);
              window.location.reload();
            },
            error: function () {
              alert("error", "Error!", "Something happens in Server!");
            },
          });
        });
        $("#SignupForm").click(function () {
          let password = document.getElementById("signuppassword").value;
          let lastName = document.getElementById("lastName").value;
          let firstName = document.getElementById("firstName").value;
          let phone = document.getElementById("phone").value;
          let email = document.getElementById("signupemail").value;
          $.ajax({
            url: "/signup",
            method: "Post",
            data: { email: email, password: password,firstName:firstName,lastName:lastName,phone:phone },
            success: function (res) {
              console.log(res);
              document.getElementById('close-signup').click()
  document.getElementById('openLogin').click()
            },
            error: function () {
              alert("error", "Error!", "Something happens in Server!");
            },
          });
        });
      },
      error: function (err) {
        console.log(err, token);
        alert("Login Required");
      },
    });
  } else {
    alert("No Slots Found");
    window.location.href = "/";
  }
}
getSlotDetails();
function closeLogin(){
  document.getElementById('close-login').click()
  document.getElementById('openSignup').click()
  
}