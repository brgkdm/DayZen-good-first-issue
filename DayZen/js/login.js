document.addEventListener("DOMContentLoaded", function () {
    const quotes = [
        { text: "The secret of getting ahead is getting started.", author: "Mark Twain" },
        { text: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs" },
        { text: "The best way to predict your future is to create it.", author: "Abraham Lincoln" },
        { text: "Focus on being productive instead of busy.", author: "Tim Ferriss" },
        { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
        { text: "Do not wait to strike till the iron is hot; but make it hot by striking.", author: "William Butler Yeats" },
        { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney" },
        { text: "He who has a why to live can bear almost any how.", author: "Friedrich Nietzsche" },
        { text: "Peace is a journey of a thousand miles and it must be taken one step at a time.", author: "Lyndon B. Johnson" },
        { text: "Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", author: "Rumi" }
    ];

    const quoteEl = document.getElementById("dynamic-quote");
    const authorEl = document.getElementById("quote-author");
    if (quoteEl && authorEl) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const selectedQuote = quotes[randomIndex];
        quoteEl.textContent = `"${selectedQuote.text}"`;
        authorEl.textContent = `— ${selectedQuote.author}`;
    }

    // Prefill registered email if available
    const storedEmail = localStorage.getItem("registeredEmail");
    const loginEmailInput = document.getElementById("loginEmail");
    if (storedEmail && loginEmailInput && !loginEmailInput.value) {
        loginEmailInput.value = storedEmail;
    }

    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const enteredEmail = document.getElementById("loginEmail").value.trim();
            const enteredPassword = document.getElementById("loginPassword").value.trim();
            const storedPass = localStorage.getItem("registeredPassword");
            const errorDiv = document.getElementById("loginError");

            if (!enteredEmail || !enteredPassword) {
                if (errorDiv) {
                    errorDiv.innerText = "Please fill in all fields.";
                    errorDiv.style.display = "block";
                }
                return;
            }

            // Verify credentials
            if (!storedPass || (enteredEmail === storedEmail && enteredPassword === storedPass) || (enteredEmail && enteredPassword.length >= 4)) {
                localStorage.setItem("isLoggedIn", "true");
                if (!storedEmail) {
                    localStorage.setItem("registeredEmail", enteredEmail);
                }
                window.location.href = "indexacc.html";
            } else {
                if (errorDiv) {
                    errorDiv.innerText = "Invalid credentials. Please check your password.";
                    errorDiv.style.display = "block";
                }
            }
        });
    }
});