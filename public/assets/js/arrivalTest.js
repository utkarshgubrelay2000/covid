// mobile menu open close
function getData(length, slot,slotAfterDay6,packageid) {
  length = Number(length);
  let token=localStorage.getItem('covid')
  console.log(token)
  let isValid=true
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
  const re =/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const mobileRegex=/^(\+\d{1,3}[- ]?)?\d{10}$/
   for (let index = 0; index < length; index++) {
     if (
       !array[index].email ||
       !re.test(String(array[index].email).toLowerCase())
     ) {
       isValid = false;
       console.log( re.test(String(array[index].email).toLowerCase()))
       alert("Email Not Valid For Person  " + Number(index + 1));
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
  let data = { slots: slot, personal_details: pd,slotAfterDay6:slotAfterDay6,packageid:packageid };
  console.log(data);
  $.ajax({
    url: "/create-arrival",
    method: "POST",
    data: data,
    headers: { contentType: "application/json",Authorization:token },

    success: function (res) {
 
      console.log(res);
      localStorage.setItem("slots", JSON.stringify(res.allslots));
   
      window.location.href = "/test-terms";
    },
    error: function () {
      alert("Login Required");

    },
  });}
  //console.log(JSON.parse(personDetails),length)
}