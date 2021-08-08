// mobile menu open close
function openNav() {
  document.getElementById("mySidenav").style.left = "0";
}

function closeNav() {
  document.getElementById("mySidenav").style.left = "-100%";
}

function openchat() {
  var x= document.getElementById("sidepanel");
  var y= document.getElementById("cht-btn");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#imagePreview').css('background-image', 'url('+e.target.result +')');
            $('#imagePreview').hide();
            $('#imagePreview').fadeIn(650);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$("#imageUpload").change(function() {
    readURL(this);
});
//console.log('hello')
async function selectTest(id,index){
   //console.log(index,id)
   let str=''
   $('.test-div').html(str);
   let selectClasses=document.getElementsByClassName('btn-skyblue-border')
   for (let i = 0; i < selectClasses.length; i++) {
     //const element = array[index];
     if(i!=index){
       //console.log(selectClasses[i])
       selectClasses[i].classList.remove('select-btn')
      }
      else{
       selectClasses[i].classList.add('select-btn')

      }
   }
   $.ajax ({
    url: '/getTestById/'+id,
    method: 'Get',
    
    success:function(res) {
      console.log(res.tests.test_list);
      
     let headstr=` <div class="col-12 text-center">
      <h4>
          ${res.tests.test_list.length} tests match your needs:
      </h4>
  </div>`
  let body;
  res.tests.test_list.forEach(ele => {
    var spot = ele;
 body=`
 <div class="col-xl-2 col-lg-4 col-md-6">
     <div class="test-box">
         <div class="package-name">
             <span class="text-white">
              ${ele.packageName}                                                  
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
             <a href="/choose-slots/${res.tests._id}/${ele.test_id}" class="btn-purple d-inline-block mt-4 mb-2">
                 BOOK A PCR
             </a>
         </div> 
     </div>
 </div>                                            
 
   
`
  })
  str=`${headstr}  <div class="row justify-content-center">  ${body} </div>`
  $('.test-div').html(str);

     },
    error: function(){
        Toast('error', 'Error!', 'Something happens in Server!');
    }
});
  

 }
// Add active class to the current button (highlight it)
var pln = document.getElementById("plans");
var btn = pln.getElementsByClassName("btns");
for (var i = 0; i < btn.length; i++) {
  btn[i].addEventListener("click", function() {
  var current = pln.getElementsByClassName("active");
  current[0].className = current[0].className.replace(" active", "");
  this.className += " active";
  });
}
