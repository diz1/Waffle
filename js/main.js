document.addEventListener("DOMContentLoaded",(()=>{const{body:e}=document;document.querySelector(".header").addEventListener("click",(t=>{t.target.closest(".burger")&&(e.classList.contains("menu-open")?e.classList.remove("menu-open"):e.classList.add("menu-open"))})),window.addEventListener("resize",(({target:t})=>{t.matchMedia("(min-width: 1440px)").matches&&e.classList.remove("menu-open")}))}));