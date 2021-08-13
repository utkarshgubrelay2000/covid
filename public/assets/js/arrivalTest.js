// mobile menu open close
function getData(length, slot,slotAfterDay6,packageid) {
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
  let data = { slots: slot, personal_details: pd,slotAfterDay6:slotAfterDay6,packageid:packageid };
  console.log(data);
  $.ajax({
    url: "/create-arrival",
    method: "POST",
    data: data,
    Headers: { contentType: "application/json" },
    success: function (res) {
      console.log(res);
      localStorage.setItem("users", JSON.stringify(res.users));
   //   window.location.href = "/test-terms";
    },
    error: function () {
      alert("error", "Error!", "Something happens in Server!");
    },
  });
  //console.log(JSON.parse(personDetails),length)
}