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

// js for myAccount / Login button by "token" cookie
function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
}

const tokenButton = document.getElementById('my-account-button');
const loginButton = document.getElementById('login-button');

fetch('/check-token')
  .then(response => response.json())
  .then(data => {
    if (data.hasToken) {
      // "token" cookie exists, show "My Account" button, but hide "Login" button
      tokenButton.style.display = 'block';
      loginButton.style.display = 'none';
    } else {
      // "token" cookie doesn't exist, show "Login" button, but hide "My Account" button
      tokenButton.style.display = 'none';
      loginButton.style.display = 'block';
    }
  })
  .catch(error => {
    console.log('Error:', error);
  });




// const tokenCookie = document.cookie;
// const tokenButton = document.getElementById('my-account-button');
// const loginButton = document.getElementById('login-button');

// console.log('tokenCookie: ' + tokenCookie);

// if (tokenCookie.includes('token')) {
//   // "token" cookie exists, show "My Account" button, but hide "Login" button
//   tokenButton.style.display = 'block';
//   loginButton.style.display = 'none';
// } else {
//   // "token" cookie doesn t exists, show "Login" button, but hide "My Account" button
//   tokenButton.style.display = 'none';
//   loginButton.style.display = 'block';
// }