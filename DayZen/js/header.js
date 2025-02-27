document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("header-container").innerHTML = `
        <head>
            <link rel="stylesheet" href="../css/style.css">
        </head>
        <header role="banner">
            <nav class="navbar navbar-expand-lg" role="navigation">
                <div class="container">
                    <a class="logo" href="/">
                        <img src="/assets/images/logoWhite.png" alt="DayZen Logo" class="logo img">
                        <h1 class="ms-2 mb-0">DayZen</h1>
                    </a>

                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav_items">
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="nav_items">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link" href="../index.html">
                                    <img src="/assets/images/home.png" alt="Home icon" class="nav-img"> Home
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="pages/about.html">
                                    <img src="/assets/images/about_us.png" alt="About Us icon" class="nav-img"> About Us
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="pages/blog.html">
                                    <img src="/assets/images/blog.png" alt="Blog icon" class="nav-img"> Blog
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="pages/contact.html">
                                    <img src="/assets/images/communication.png" alt="Contact icon" class="nav-img"> Contact
                                </a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="pages/register.html">
                                    <img src="/assets/images/userColor.png" alt="Login icon" class="nav-img"> Login
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    `;
});
