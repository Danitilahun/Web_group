const signup=document.querySelector(".sign");
const login=document.querySelector(".log");
const sign_up=document.querySelector(".sign_in");
const log_in=document.querySelector(".log_in");
const form=document.querySelectorAll(".login");
const email=document.querySelector(".email");
const password=document.querySelector(".password");
const status=document.querySelector(".status");
const confirm=document.querySelector(".c-password");
console.log(password);

login.addEventListener("click",(e)=>{
  e.preventDefault()
  const name=e.target.dataset.val;
  form.forEach(site=>{
    site.classList.remove("hide");
    if (site.dataset.val===name){
        site.classList.add("hide");
    }
  })

  })
signup.addEventListener("click",(e)=>{
    e.preventDefault()
    const name=e.target.dataset.val;
    form.forEach(site=>{
      site.classList.remove("hide");
      if (site.dataset.val===name){
          site.classList.add("hide");
      }
    })
})

log_in.addEventListener("click",e=>{
    e.preventDefault()
    var selectedValue = status.options[status.selectedIndex].value;
    window.location=`${selectedValue}.html`;
})

sign_in.addEventListener("click",e=>{
    e.preventDefault()
    var selectedValue = status.options[status.selectedIndex].value;
    window.location=`${selectedValue}.html`;
})








