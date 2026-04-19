

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".container").style.opacity = "1";
});

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

document.getElementById("securityMessage").style.display="block";
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    localStorage.setItem("username", username);

    // If user skips security
    document.getElementById("skipSecurity").addEventListener("click", function() {
        window.location.href = "../pages/indexacc.html";
    });

    // If user wants to setup security
    document.getElementById("setup2fa").addEventListener("click", function() {
        alert("2FA setup feature coming soon!");
    });
});
