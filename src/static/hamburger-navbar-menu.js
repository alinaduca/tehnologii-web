const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
})

document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
  hamburger.classList.remove("active");
  navMenu.classList.remove("active");
}))

// var prevScrollpos = window.pageYOffset;

// window.onscroll = function() {
//   var currentScrollPos = window.pageYOffset;

//   if (prevScrollpos > currentScrollPos) {
//     document.getElementById("main-header").classList.remove("hidden");
//   } else {
//     document.getElementById("main-header").classList.add("hidden");
//   }

//   prevScrollpos = currentScrollPos;
// }
