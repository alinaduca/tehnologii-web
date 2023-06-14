function showForgotPasswordForm() {
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("forgotPasswordForm").style.display = "flex";
}

function hideForgotPasswordForm() {
    document.getElementById("loginForm").style.display = "flex";
    document.getElementById("forgotPasswordForm").style.display = "none";
}