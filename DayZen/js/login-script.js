const loginForm = document.getElementById("loginForm");
const errorBox = document.getElementById("errorBox");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // We used 'username' and 'password'
        const userInput = document.getElementById("username")?.value.trim();
        const passInput = document.getElementById("password")?.value;

        // If the JS cannot find the fields, it will tell you in the console (F12)
        if (!userInput || !passInput) {
            errorBox.textContent = "The username or password is incorrect. Please try again.";
            errorBox.style.display = "block";
            return;
        }

        const users = JSON.parse(localStorage.getItem("dayzen_users") || "[]");
        const user = users.find(u => 
            (u.username === userInput || u.email === userInput) && u.password === passInput
        );

        if (user) {
            localStorage.setItem("username", user.username);
            localStorage.setItem("dayzen_logged", "true");
            window.location.href = "indexacc.html";
        } else {
            errorBox.textContent = "The username or password is incorrect. Please try again.";
            errorBox.style.display = "block";
        }
    });
}


// Password visibility toggle
document.getElementById('togglePw')?.addEventListener('click', () => {
    const pw = document.getElementById('password');
    const eye = document.getElementById('eyeIcon');
    if (pw) {
        const isPw = pw.type === 'password';
        pw.type = isPw ? 'text' : 'password';
        if (eye) eye.textContent = isPw ? '🙈' : '👁️';
    }
});


