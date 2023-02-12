"use strict";
// see detail page 
const Sta_tus=document.querySelector("#Sta_tus");
const job_Title=document.querySelector("#job_Title");
const Comp_any=document.querySelector("#Comp_any");
const Job_Type=document.querySelector("#Job_Type");
const Qualifi_cations=document.querySelector("#Qualifi_cations");
const Exper_ience=document.querySelector("#Exper_ience");
const Loca_tion=document.querySelector("#Loca_tion");
const Quanitity_Required=document.querySelector("#Quanitity-Required");
const Sal_ary=document.querySelector("#Sal_ary");
const Dead_line=document.querySelector("#Dead_line");

// pop up 
const overlay = document.querySelector(".overlay");
const close = document.querySelector(".close");
const button_edit=document.querySelector(".button_edit");

const tbody = document.getElementById("tbody");
// const t_body = document.getElementById("t-body");
const users=document.querySelector(".users");

let get_all_job = fetch( "http://localhost:3000/job")
.then((response) => response.json())
.then((data) => {
  return data.reverse()
});

let get_all_user = fetch( "http://localhost:3000/user")
.then((response) => response.json())
.then((data) => {
console.log(data);
  return data.reverse();
});

get_all_user.then(data=>{
  console.log(data);
  data.forEach(elem =>{
       const  format= 
       `<tr>
          <td> ${elem.firstname + " " + elem.lastname} </td>
          <td>${elem.country+","+elem.city} </td>
          <td>${elem.email}</td>
          <td>${elem.phonenumber}</td>
          <td data-id="${elem._id}" class="delete_job"><a href="#"><img data-id="${elem._id}" src="image/trash.png" alt="" height="40"></a></td>
      </tr> `
          users.innerHTML +=format

        
      const delete_job = document.querySelectorAll(".delete_job");
      delete_job.forEach(ele=>{
            ele.addEventListener("click",e=>{
            e.preventDefault();
            fetch(`http://localhost:3000/user/${e.target.dataset.id}`, { method: 'DELETE' })
            .then(() => 'Delete successful');
            })
        })
  })
})

get_all_job.then(data=>{
  data.forEach(elem =>{
    console.log(elem.status);
       const  format=`<tr>
        <td data-label="Job Title">${elem.job_title}</td>
        <td data-label="Location">${elem.location}</td>
        <td data-label="Status">${elem.status}</td>
        <td data-label="date">${elem.deadline}</td>
        <td data-id="${elem._id}" class="see_more"><a data-id="${elem._id}" href="#">info</a></td>
        <td data-id="${elem._id}" class="delete_job"><a href="#"><img data-id="${elem._id}" src="image/trash.png" alt="" height="40"></a></td>
        </tr>`
          tbody.innerHTML +=format
  })

      const delete_job = document.querySelectorAll(".delete_job");
      const see_more = document.querySelectorAll(".see_more");

      delete_job.forEach(ele=>{
            ele.addEventListener("click",e=>{
            e.preventDefault();
            console.log(e.target.dataset.id);
            fetch(`http://localhost:3000/job/${e.target.dataset.id}`, { method: 'DELETE' })
            .then(() => 'Delete successful');
            })
        })

      see_more.forEach(ele=>{
        
        ele.addEventListener("click",e=>{

          e.preventDefault();
          overlay.classList.remove("hide");
          fetch(`http://localhost:3000/job/${e.target.dataset.id}`)
          .then((response) => response.json())
          .then((data) => {
            Sta_tus.value=data.status;
            job_Title.value=data.job_title;
            Comp_any.value=data.company;
            Job_Type.value=data.job_type;
            Qualifi_cations.value=data.level_of_education;
            Exper_ience.value=data.experience;
            Loca_tion.value=data.location;
            Quanitity_Required.value=data.vacancies;
            Sal_ary.value=data.salary ;
            Dead_line.value=data.deadline;
          });
        })
})
})

close.addEventListener("click", function () {
  overlay.classList.add("hide");
});
