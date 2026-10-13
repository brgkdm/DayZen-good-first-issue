document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");
  if (!registerForm) return;

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear existing error messages
    document.querySelectorAll(".error-text").forEach((el) => el.remove());

    let isValid = true;
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");

    if (!username.value.trim()) {
      showError(username, "Username is required");
      isValid = false;
    }

    if (!email.value.trim()) {
      showError(email, "Email is required");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) {
      showError(email, "Enter a valid email address");
      isValid = false;
    }

    if (!password.value.trim()) {
      showError(password, "Password is required");
      isValid = false;
    } else if (password.value.trim().length < 4) {
      showError(password, "Password must be at least 4 characters long");
      isValid = false;
    }

    // Stop execution if validation fails
    if (!isValid) {
      return;
    }

    // Save registered user details into localStorage
    const userData = {
      username: username.value.trim(),
      email: email.value.trim(),
      password: password.value.trim()
    };

    localStorage.setItem("registeredUsername", userData.username);
    localStorage.setItem("registeredEmail", userData.email);
    localStorage.setItem("registeredPassword", userData.password);
    localStorage.setItem("dayzen_user", JSON.stringify(userData));

    // Display high-visibility success toast
    const successToast = document.getElementById("successToast");
    if (successToast) {
      successToast.innerText = "🎉 Account created! Redirecting to login...";
      successToast.style.display = "block";
    }

    // Disable button to prevent multiple submissions
    const registerBtn = document.getElementById("registerBtn");
    if (registerBtn) {
      registerBtn.disabled = true;
      registerBtn.innerText = "Redirecting...";
    }

    // Redirect to login page after sign up
    setTimeout(function () {
      window.location.href = "login.html";
    }, 1200);
  });

  function showError(input, message) {
    const errorMsg = document.createElement("div");
    errorMsg.className = "error-text";
    errorMsg.style.color = "#ef4444";
    errorMsg.style.fontSize = "0.8rem";
    errorMsg.style.fontWeight = "600";
    errorMsg.style.marginTop = "4px";
    errorMsg.innerText = message;

    input.insertAdjacentElement("afterend", errorMsg);
  }
});
