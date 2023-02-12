"use strict";


const log_email=document.querySelector(".log-email");
const log_password=document.querySelector(".log-password");
const log_in_btn=document.querySelector(".log-in-btn");



let get_all_user = fetch( "http://localhost:3000/user")
.then((response) => response.json())
.then((data) => {
  return data.reverse()
});


// login method
log_in_btn.addEventListener("click",e=>{
  e.preventDefault();
  get_all_user.then(data=>{
    data.forEach(ele=>{
      if (ele.email===log_email.value){
        window.location=`${ele.status}.html`;
      }
    })
  })
})


