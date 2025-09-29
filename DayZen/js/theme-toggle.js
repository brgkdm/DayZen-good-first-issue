document.addEventListener('DOMContentLoaded', function() {
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    if (!themeIcon) return;

    // Determine base path depending on folder depth
    const basePath = location.pathname.includes('/pages/') ? '../' : '';
    console.log('Base Path:', basePath);  // Log the base path for debugging

    // Load saved theme from localStorage
    let savedTheme = localStorage.getItem('dayzen_theme') || 'light';
    console.log('Saved Theme:', savedTheme);  // Log the saved theme

    // Check if the saved theme is dark or light and set the initial theme
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.src = basePath + 'assets/images/icons/moon_1.png';  // Path to moon icon
    } else {
        body.classList.add('light-mode');
        themeIcon.src = basePath + 'assets/images/icons/sun.png';  // Path to sun icon
    }

    // Log the icon path being used
    console.log('Icon source:', themeIcon.src);

    // Toggle theme on click
    themeIcon.addEventListener('click', function() {
        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            themeIcon.src = basePath + 'assets/images/icons/sun.png';  // Path to sun icon
            localStorage.setItem('dayzen_theme', 'light');
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            themeIcon.src = basePath + 'assets/images/icons/moon_1.png';  // Path to moon icon
            localStorage.setItem('dayzen_theme', 'dark');
        }

        // Log the icon path after toggle
        console.log('Toggled Icon source:', themeIcon.src);
    });
});
