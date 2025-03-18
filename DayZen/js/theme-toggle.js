document.addEventListener('DOMContentLoaded', function() {
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;
    
    // Check if a theme preference is stored
    const savedTheme = localStorage.getItem('dayzen_theme');
    if (savedTheme) {
        if (savedTheme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
            themeIcon.src = 'assets/images/moon_1.png';
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
            themeIcon.src = 'assets/images/sun.png';
        }
    }
    
    // Add click event listener to toggle theme
    if (themeIcon) {
        themeIcon.addEventListener('click', function() {
            if (body.classList.contains('dark-mode')) {
                // Switch to light mode
                body.classList.remove('dark-mode');
                body.classList.add('light-mode');
                themeIcon.src = 'assets/images/sun.png';
                localStorage.setItem('dayzen_theme', 'light');
            } else {
                // Switch to dark mode
                body.classList.remove('light-mode');
                body.classList.add('dark-mode');
                themeIcon.src = 'assets/images/moon_1.png';
                localStorage.setItem('dayzen_theme', 'dark');
            }
        });
    }
}); 