function showForgotPasswordForm() {
    document.getElementById("loginForm").style.display = "none";
    // document.getElementById("createAccountForm").style.display = "none";
    document.getElementById("forgotPasswordForm").style.display = "flex";
}

function showLoginForm() {
    document.getElementById("loginForm").style.display = "flex";
    // document.getElementById("createAccountForm").style.display = "none";
    document.getElementById("forgotPasswordForm").style.display = "none";
}

// function showCreateAccountForm() {
//     document.getElementById("loginForm").style.display = "none";
//     document.getElementById("createAccountForm").style.display = "flex";
//     document.getElementById("forgotPasswordForm").style.display = "none";
// }