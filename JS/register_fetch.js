"use strict";
// employee
const employee_first_name=document.querySelector(".first_name");
const employee_last_name=document.querySelector(".last_name");
const employee_password=document.querySelector(".password");
const employee_confirm_password=document.querySelector(".confirm_password");
const employee_email=document.querySelector(".email");
const employee_phone=document.querySelector(".phone");
const employee_security_question=document.querySelector(".security_question");
const employee_answer=document.querySelector(".answer");
const employee_register_btn=document.querySelector(".register");
const email_err_1 = document.querySelector(".email-err-1")

// employer
const employer_first_name= document.querySelector(".first-name");
const employer_last_name=document.querySelector(".last-name");
const employer_email=document.querySelector(".e_mail");
const employer_phone=document.querySelector(".p_hone");
const employer_password=document.querySelector(".pass_word");
const employer_confirm_password=document.querySelector(".confirm-password");
const employer_answer=document.querySelector(".ans_wer");
const employer_security_question=document.querySelector(".security-question");
const employer_register_btn=document.querySelector(".regi_ster");
const err_msg = document.getElementById("err-msg-1")
const err_msg_ = document.getElementById("err-msg")
const email_err_2 = document.querySelector(".email-err-2")
err_msg.style.display = "none"
err_msg_.style.display = "none"

// post request when job is posted and user is registered for first time.
const user_register= (body,collection)=>{

    fetch(`http://localhost:3000/${collection}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(body),
     }).then(response => response.json())
        .then(data=>console.log(data)
        ).catch(error => console.error('Error:', error)); 
    ;
  }

// register  employee
employee_register_btn.addEventListener("click",(e)=>{
  e.preventDefault()
  if(!isEmail(employer_email)){
    email_err_1.innerHTML = "Please enter a valid email address"
  }
else if(employee_password.value == employee_confirm_password.value){
    err_msg.style.display = "none"
    const employee_body = {
        firstname : employee_first_name.value,
        lastname : employee_last_name.value,
        password : employee_password.value,
        email : employee_email.value,
        phonenumber : employee_phone.value,
        securityquestion :{question :  employee_security_question.value ,answer : employee_answer.value},
        status : "employee", 
        country : "Ethiopia",
        city : "Addis Ababa" , 
        date : new Date().toString()
    }

      user_register(employee_body,"user");
      window.location="employee.html";

}
else{
    err_msg.style.display = "block"
}
})

// register employer

employer_register_btn.addEventListener("click",(e)=>{
  e.preventDefault();
  if(!isEmail(employer_email)){
    email_err_2.innerHTML = "Please enter a valid email address"
  }
else if(employer_password.value == employer_confirm_password.value){
    err_msg_.style.display = "none"
    const employer_body = {
        firstname : employer_first_name.value,
        lastname : employer_last_name.value,
        password : employer_password.value,
        email : employer_email.value,
        phonenumber : employer_email.value,
        securityquestion :{question :  employer_security_question.value ,answer : employer_answer.value},
        status : "employer", 
        country : "Ethiopia",
        city : "Addis Ababa" , 
        date : new Date().toString()
    }
      user_register(employer_body,"user");
      window.location="employer.html";

}else if(employer_password !== employee_confirm_password ){
    err_msg_.style.display = "block"

}

})




function isEmail(email) {
	return  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email);
}