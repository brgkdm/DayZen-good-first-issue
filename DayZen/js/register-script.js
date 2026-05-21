document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.getElementById("registerForm");
    const errorBox     = document.getElementById('errorBox');
    const registerBtn  = document.getElementById('registerBtn');

    const usernameInput = document.getElementById('username');
    const emailInput    = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmInput  = document.getElementById('confirmPassword');

    const hintUsername = document.getElementById('hint-username');
    const hintEmail    = document.getElementById('hint-email');
    const hintPassword = document.getElementById('hint-password');
    const hintConfirm  = document.getElementById('hint-confirm');

    // Password strength bars
    const bars          = [1,2,3,4].map(i => document.getElementById('bar' + i));
    const strengthLabel = document.getElementById('strengthLabel');
    const strengthColors = ['#e53e3e', '#e53e3e', '#f6ad55', '#38a169'];
    const strengthTexts  = ['', 'Weak', 'Fair', 'Strong'];

    function scorePassword(pw) {
        let score = 0;
        
        if (pw.length >= 8)            score++;
        if (/[A-Z]/.test(pw))          score++;
        if (/[0-9]/.test(pw))          score++;
        if (/[^A-Za-z0-9]/.test(pw))  score++;
        return score;
    }

    function isValidEmail(val) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
    }

    function isValidUsername(val) {
        return val.length >= 3;
    }

    function updateStrengthBars(pw) {
        const score = scorePassword(pw);
        bars.forEach((bar, i) => {
            bar.style.background = i < score ? strengthColors[score - 1] : '#e2e8f0';
        });
        strengthLabel.textContent = pw.length ? strengthTexts[score] || 'Weak' : '';
        strengthLabel.style.color = score > 0 ? strengthColors[score - 1] : '#7a8494';
    }

    function validateAll() {
        const username = usernameInput.value.trim();
        const email    = emailInput.value.trim();
        const password = passwordInput.value;
        const confirm  = confirmInput.value;

        const usernameOk = isValidUsername(username);
        const emailOk    = isValidEmail(email);
        const passwordOk = scorePassword(password) >= 2; // al menos "Fair"
        const confirmOk  = confirm.length > 0 && password === confirm;

        registerBtn.disabled = !(usernameOk && emailOk && passwordOk && confirmOk);
    }

    // Username
    usernameInput.addEventListener('input', () => {
        const val = usernameInput.value.trim();
        if (!val) {
            hintUsername.textContent = '';
            usernameInput.classList.remove('valid', 'invalid');
        } else if (!isValidUsername(val)) {
            hintUsername.textContent = 'Minimum 3 characters';
            hintUsername.className   = 'field-hint';
            usernameInput.classList.replace('valid', 'invalid') || usernameInput.classList.add('invalid');
        } else {
            hintUsername.textContent = '';
            usernameInput.classList.remove('invalid');
            usernameInput.classList.add('valid');
        }
        validateAll();
    });

    // Email
    emailInput.addEventListener('input', () => {
        const val = emailInput.value.trim();
        if (!val) {
            hintEmail.textContent = '';
            emailInput.classList.remove('valid', 'invalid');
        } else if (!isValidEmail(val)) {
            hintEmail.textContent = 'Enter a valid email';
            hintEmail.className   = 'field-hint';
            emailInput.classList.remove('valid'); emailInput.classList.add('invalid');
        } else {
            hintEmail.textContent = '';
            emailInput.classList.remove('invalid'); emailInput.classList.add('valid');
        }
        validateAll();
    });

    // Password
    passwordInput.addEventListener('input', () => {
        const pw = passwordInput.value;
        updateStrengthBars(pw);
        if (!pw) {
            hintPassword.textContent = '';
            passwordInput.classList.remove('valid', 'invalid');
        } else if (scorePassword(pw) < 2) {
            hintPassword.textContent = 'Use uppercase, numbers or symbols';
            hintPassword.className   = 'field-hint';
            passwordInput.classList.remove('valid'); passwordInput.classList.add('invalid');
        } else {
            hintPassword.textContent = '';
            passwordInput.classList.remove('invalid'); passwordInput.classList.add('valid');
        }
        // re-validar confirm si ya tiene algo
        if (confirmInput.value) confirmInput.dispatchEvent(new Event('input'));
        validateAll();
    });

    // Confirm password
    confirmInput.addEventListener('input', () => {
        const pw      = passwordInput.value;
        const confirm = confirmInput.value;
        if (!confirm) {
            hintConfirm.textContent = '';
            confirmInput.classList.remove('valid', 'invalid');
        } else if (pw !== confirm) {
            hintConfirm.textContent = 'Passwords do not match';
            hintConfirm.className   = 'field-hint';
            confirmInput.classList.remove('valid'); confirmInput.classList.add('invalid');
        } else {
            hintConfirm.textContent = 'Passwords match';
            hintConfirm.className   = 'field-hint ok';
            confirmInput.classList.remove('invalid'); confirmInput.classList.add('valid');
        }
        validateAll();
    });

    // Toggle password visibility
    document.getElementById('togglePw1')?.addEventListener('click', () => {
        const isPw = passwordInput.type === 'password';
        passwordInput.type = isPw ? 'text' : 'password';
        document.getElementById('eyeIcon1').textContent = isPw ? '🙈' : '👁️';
    });

    document.getElementById('togglePw2')?.addEventListener('click', () => {
        const isPw = confirmInput.type === 'password';
        confirmInput.type = isPw ? 'text' : 'password';
        document.getElementById('eyeIcon2').textContent = isPw ? '🙈' : '👁️';
    });

    // Submit
    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();

            const username = usernameInput.value.trim();
            const email    = emailInput.value.trim().toLowerCase();
            const password = passwordInput.value;
            const confirm  = confirmInput.value;

            if (password !== confirm) {
                errorBox.textContent    = "Passwords do not match";
                errorBox.style.display  = 'block';
                return;
            }

            const users = JSON.parse(localStorage.getItem('dayzen_users') || '[]');

            if (users.some(u => u.email === email || u.username === username)) {
                errorBox.textContent   = "User or email already exists";
                errorBox.style.display = 'block';
                return;
            }

            users.push({ username, email, password });
            localStorage.setItem('dayzen_users', JSON.stringify(users));
            localStorage.setItem('username', username);
            localStorage.setItem('dayzen_logged', 'true');

            alert("Account created! Redirecting...");
            window.location.href = 'indexacc.html';
        });
    }
});

