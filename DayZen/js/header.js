document.addEventListener("DOMContentLoaded", function () {
    const headerContainer = document.getElementById("header-container");
    headerContainer.innerHTML = `
        <header class="main-header">
            <nav class="custom-navbar">
                <div class="nav-container">
                    <a class="logo-wrapper" href="/">
                        <div class="logo-icon-bg">
                            <img src="/assets/images/logoWhite.png" alt="DayZen Logo" class="logo-img">
                        </div>
                        <span class="logo-text">Day<span class="text-gradient">Zen</span></span>
                    </a>

                    <ul class="nav-menu">
                        <li><a class="nav-link" href="/index.html">Home</a></li>
                        <li><a class="nav-link" href="/about.html">About</a></li>
                        <li><a class="nav-link" href="/blog.html">Blog</a></li>
                        <li><a class="nav-link" href="/contact.html">Contact</a></li>
                        <li><a class="login-pill" href="/register.html">Sign In</a></li>
                    </ul>
                </div>
            </nav>
        </header>
    `;
});

window.addEventListener("scroll", () => {
    const nav = document.querySelector(".custom-navbar");
    if (window.scrollY > 20) {
        nav.classList.add("scrolled");
    } else {
        nav.classList.remove("scrolled");
    }
});