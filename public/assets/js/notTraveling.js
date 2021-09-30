// mobile menu open close
function getData(length, slot, packageid) {
  length = Number(length);
  let isValid = true;
  let array = [];
  let token = localStorage.getItem("covid");
  console.log(token,"Token");
  for (let index = 0; index < length; index++) {
    let object = {
       city : document.getElementById("city").value,
         state : document.getElementById("state").value,
         transportMode : document.getElementById("transportMode").value,
         transportno : document.getElementById("transportno.").value,
         Postal : document.getElementById("Postal").value,email: document.getElementById("email" + index).value,
      firstName: document.getElementById("fname" + index).value, middleName: document.getElementById("middle" + index).value,
      lastName: document.getElementById("lname" + index).value,
      phone: document.getElementById("phone" + index).value, time: document.getElementById("time" + index).value,
      dob: document.getElementById("dob" + index).value,
      gender: document.getElementById("sex" + index).value,
      address: document.getElementById("address" + index).value,
      brand_vaccine: document.getElementById("brand_vaccine" + index).value,
     
      vaccination_status: document.getElementById("vaccination_status" + index)
        .value,
    
    };
    array.push(object);
  }
  const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
 const mobileRegex=/^(\+\d{1,3}[- ]?)?\d{10}$/
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
      !array[index].phone ||
      !mobileRegex.test(String(array[index].phone).toLowerCase())
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