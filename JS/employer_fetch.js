"use strict";
// post job

const status=document.querySelector("#status");
const jobtitle=document.querySelector("#jobTitle")
const Company=document.querySelector("#Company");
const jobType=document.querySelector("#JobType");
const level_of_education=document.querySelector("#level_of_education");
const experience=document.querySelector("#Experience");
const locationn=document.querySelector("#location");
const quanitity_required=document.querySelector("#Quanitity_Required");
const salary=document.querySelector("#Salary");
const deadline=document.querySelector("#Deadline");
const postbtn = document.querySelector("#button_post")

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
const t_body = document.getElementById("t-body");
let delete_job;
let edit_job;


let get_all_job = fetch( "http://localhost:3000/job")
.then((response) => response.json())
.then((data) => {
  return data.reverse()
});

const user_register= (body,collection)=>
{
    fetch(`http://localhost:3000/${collection}`, {
    method: 'POST',
    headers: {
        'Content-type': 'application/json; charset=UTF-8',
},
body: JSON.stringify(body),
}).then(response => response.json())
    .then(data=>console.log(data)
    ).catch(error => console.error('Error:', error)); 
}

//  Post Job request 
postbtn.addEventListener("click" , (e)=>{
  e.preventDefault();
  const body = {
   status: status.value,
   job_title : jobtitle.value,
   company : Company.value,
   job_type : jobType.value,
   level_of_education : level_of_education.value,
   experience : experience.value,
   location : locationn.value,
   vacancies : quanitity_required.value,
   salary : salary.value,
   deadline : deadline.value,
  }
  console.log(body);

//   user_register(body,"signin");
  user_register(body,"job");
  window.location="employer.html";
})




get_all_job.then(data=>{
    data.forEach(elem =>{
       const  format=
       `<tr>
          <td data-label="Job Title">${elem.job_title}</td>
          <td data-label="Location">${elem.location}</td>
          <td data-label="Status">${elem.status}</td>
          <td data-label="date">${elem.deadline}</td>
          <td data-id="${elem._id}" class="edit_job"><a href="#"><img data-id="${elem._id}" src="image/edit.png" alt="" height="40"></a></td>
          <td data-id="${elem._id}" class="delete_job"><a href="#"><img data-id="${elem._id}" src="image/trash.png" alt="" height="40"></a></td>
      </tr>`
          t_body.innerHTML +=format;
  })

        delete_job = document.querySelectorAll(".delete_job");
        edit_job = document.querySelectorAll(".edit_job");
        console.log(delete_job);
        console.log(edit_job);
        delete_job.forEach(ele=>{
          ele.addEventListener("click",e=>{
            e.preventDefault();
            console.log(e.target.dataset.id);
            fetch(`http://localhost:3000/job/${e.target.dataset.id}`, { method: 'DELETE' })
            .then(() => 'Delete successful');
          })
        })

        edit_job.forEach(ele=>{
          ele.addEventListener("click",e=>{
            e.preventDefault();
            overlay.classList.remove("hide");
            button_edit.classList.remove("hide");
            const see_more = document.querySelectorAll(".see_more");
            overlay.classList.remove("hide");
            const id_required=e.target.dataset.id;
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

            button_edit.addEventListener("click",e=>{
              e.preventDefault();
              console.log(Job_Type.value);
              const data={
              status: Sta_tus.value,
              job_title : job_Title.value,
              company : Comp_any.value,
              job_type : Job_Type.value,
              level_of_education : Qualifi_cations.value,
              experience : Exper_ience.value,
              location : Loca_tion.value,
              vacancies : Quanitity_Required.value,
              salary : Sal_ary.value,
              deadline : Dead_line.value,
            };

             fetch( `http://localhost:3000/job/${id_required}`, {
              method: 'PUT',
              headers: {
                'Content-type': 'application/json'
              },
              body: JSON.stringify(data)
            }).then(response => response.json())
              .then(data => console.log(data));
        })
            
       })
    })
})


close.addEventListener("click", function () {
    overlay.classList.add("hide");
  });
  