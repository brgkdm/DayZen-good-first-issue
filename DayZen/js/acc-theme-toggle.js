document.addEventListener('DOMContentLoaded', function() {
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    if (!themeIcon) return;

    // Load saved theme or default to light
    let savedTheme = localStorage.getItem('dayzen_theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.src = '../assets/images/moon_1.png';
    } else {
        body.classList.add('light-mode');
        themeIcon.src = '../assets/images/sun.png';
    }

    themeIcon.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            themeIcon.src = '../assets/images/sun.png';
            localStorage.setItem('dayzen_theme', 'light');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            themeIcon.src = '../assets/images/moon_1.png';
            localStorage.setItem('dayzen_theme', 'dark');
        }
    });
});
