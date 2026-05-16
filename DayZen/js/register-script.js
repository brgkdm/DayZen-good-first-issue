document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const errorBox = document.getElementById('errorBox');

    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            
            const username = document.getElementById('username').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const password = document.getElementById('password').value;
            const confirm = document.getElementById('confirmPassword').value;

            if (password !== confirm) {
                errorBox.textContent = "Passwords do not match";
                errorBox.style.display = 'block';
                return;
            }

            const users = JSON.parse(localStorage.getItem('dayzen_users') || '[]');

            // Evitar duplicados
            if (users.some(u => u.email === email || u.username === username)) {
                errorBox.textContent = "User or email already exists";
                errorBox.style.display = 'block';
                return;
            }

            // Guardar en la lista
            users.push({ username, email, password });
            localStorage.setItem('dayzen_users', JSON.stringify(users));
            localStorage.setItem('username', username);

            alert("Account created! Redirecting...");
            window.location.href = 'indexacc.html';
        });
    }
});

