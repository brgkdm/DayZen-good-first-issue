

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".container").style.opacity = "1";
});

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); 


    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    localStorage.setItem("username", username);

    window.location.href = "../pages/indexacc.html";
});

const passwordInput = document.getElementById('password');
const togglePassword = document.getElementById('togglePassword') 
const eyeOpen = document.getElementById('openEye');
const eyeClosed = document.getElementById('closedEye');

if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', (event) => {
    event.preventDefault();
    const isPassword = passwordInput.type === 'password';
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    if (eyeOpen) eyeOpen.style.display = isPassword ? 'none' : 'block';
    if (eyeClosed) eyeClosed.style.display = isPassword ? 'block' : 'none';
    });
}