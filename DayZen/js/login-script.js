const loginForm = document.getElementById("loginForm");
const errorBox = document.getElementById("errorBox");

if (loginForm) {
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // CAPTURA CORREGIDA: Usamos 'username' y 'password'
        const userInput = document.getElementById("username")?.value.trim();
        const passInput = document.getElementById("password")?.value;

        // Si el JS no encuentra los campos, te lo dirá en la consola (F12)
        if (!userInput || !passInput) {
            errorBox.textContent = "Please fill in all fields.";
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
            errorBox.textContent = "Invalid credentials. Try again.";
            errorBox.style.display = "block";
        }
    });
}


// Lógica del ojo para ver contraseña
document.getElementById('togglePw')?.addEventListener('click', () => {
    const pw = document.getElementById('password');
    const eye = document.getElementById('eyeIcon');
    if (pw) {
        const isPw = pw.type === 'password';
        pw.type = isPw ? 'text' : 'password';
        if (eye) eye.textContent = isPw ? '🙈' : '👁️';
    }
});


