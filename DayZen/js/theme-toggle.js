document.addEventListener('DOMContentLoaded', function () {
    const themeIcon = document.getElementById('theme-icon');
    const body = document.body;

    if (!themeIcon) return;

    // Determine base path depending on folder depth
    const basePath = location.pathname.includes('/pages/') ? '../' : '';

    // Load saved theme from localStorage
    let savedTheme = localStorage.getItem('dayzen_theme') || 'light';

    // Apply saved theme
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeIcon.src = basePath + 'assets/images/icons/moon_1.png';
    } else {
        body.classList.add('light-mode');
        themeIcon.src = basePath + 'assets/images/icons/sun.png';
    }

    // Toggle theme on click
    themeIcon.addEventListener('click', function () {
        let message = '';

        if (body.classList.contains('dark-mode')) {
            body.classList.replace('dark-mode', 'light-mode');
            themeIcon.src = basePath + 'assets/images/icons/sun.png';
            localStorage.setItem('dayzen_theme', 'light');
            message = 'Light mode enabled';
        } else {
            body.classList.replace('light-mode', 'dark-mode');
            themeIcon.src = basePath + 'assets/images/icons/moon_1.png';
            localStorage.setItem('dayzen_theme', 'dark');
            message = 'Dark mode enabled';
        }

        showThemeFeedback(message);
    });
});

/**
 * Shows a temporary feedback message on theme change
 */
function showThemeFeedback(message) {
    const feedback = document.createElement('div');
    feedback.textContent = message;

    feedback.style.position = 'fixed';
    feedback.style.bottom = '20px';
    feedback.style.right = '20px';
    feedback.style.padding = '10px 16px';
    feedback.style.backgroundColor = '#333';
    feedback.style.color = '#fff';
    feedback.style.borderRadius = '6px';
    feedback.style.fontSize = '14px';
    feedback.style.boxShadow = '0 4px 10px rgba(0,0,0,0.3)';
    feedback.style.zIndex = '1000';

    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.remove();
    }, 2000);
}
