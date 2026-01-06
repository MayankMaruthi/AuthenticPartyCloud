document.getElementById("year").textContent = new Date().getFullYear();

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");
const backdrop = document.getElementById("navBackdrop");
const closeBtn = document.getElementById("navClose");

function openMenu(){
  document.body.classList.add("menu-open");
  document.body.style.overflow="hidden";
}
function closeMenu(){
  document.body.classList.remove("menu-open");
  document.body.style.overflow="";
}

hamburger.addEventListener("click", openMenu);
backdrop.addEventListener("click", closeMenu);
closeBtn.addEventListener("click", closeMenu);

document.querySelectorAll(".nav__link").forEach(link=>{
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keydown",e=>{
  if(e.key==="Escape") closeMenu();
});
