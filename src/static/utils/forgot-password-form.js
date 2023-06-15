function showForgotPasswordForm() {
    document.getElementById("loginForm").style.display = "none";
    // document.getElementById("createAccountForm").style.display = "none";
    document.getElementById("forgotPasswordForm").style.display = "flex";
}

function showLoginForm() {
    document.getElementById("loginForm").style.display = "flex";
    document.getElementById("createAccountForm").style.display = "none";
    document.getElementById("forgotPasswordForm").style.display = "none";
}

function showCreateAccountForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("createAccountForm").style.display = "flex";
    document.getElementById("forgotPasswordForm").style.display = "none";
}

// Create a container div element
var containerLi = document.createElement("li");
containerLi.className = "nav-item";

// Create a button element
var button = document.createElement("button");
button.className = "try-now-btn";
// button.textContent = "Login";

var aElement = document.createElement("a");
aElement.className = "login";
aElement.href = "#";
aElement.textContent = "Login";

button.appendChild(aElement);
containerLi.appendChild(button);
var comp = document.getElementsByClassName("nav-menu")[0];
comp.appendChild(containerLi);

const isLoggedIn = JSON.stringify(isLoggedIn);

// document.getElementById()
console.log(isLoggedIn);
console.log("hello");

// // Append the button to the container div
// containerDiv.appendChild(button);

// // Assign the container div to the 'comp' variable
// var comp = containerDiv;

