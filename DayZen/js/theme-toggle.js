document.addEventListener('DOMContentLoaded', function () {
    const body = document.body;
    const basePath = location.pathname.includes('/pages/') ? '../' : '';

    // Load saved theme from localStorage
    let savedTheme = localStorage.getItem('dayzen_theme') || 'light';

    function applyTheme(theme) {
        if (theme === 'dark') {
            body.classList.add('dark-mode');
            body.classList.remove('light-mode');
        } else {
            body.classList.add('light-mode');
            body.classList.remove('dark-mode');
        }
        updateThemeUI(theme);
    }

    function updateThemeUI(theme) {
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) {
            themeIcon.src = basePath + (theme === 'dark' ? 'assets/images/icons/moon_1.png' : 'assets/images/icons/sun.png');
        }

        // Update all logo images for dark mode visibility
        const logos = document.querySelectorAll('img[src*="logo"], img[alt*="Logo"], img[alt*="logo"]');
        logos.forEach(logo => {
            if (theme === 'dark') {
                logo.classList.add('logo-dark-mode');
            } else {
                logo.classList.remove('logo-dark-mode');
            }
        });
    }

    // Apply saved theme immediately
    applyTheme(savedTheme);

    // Find toggle elements
    const themeToggle = document.getElementById('theme-toggle') || 
                        document.querySelector('.theme-toggle-wrapper') ||
                        (document.getElementById('theme-icon') ? document.getElementById('theme-icon').parentElement : null);

    if (themeToggle) {
        themeToggle.setAttribute('role', 'button');
        themeToggle.setAttribute('tabindex', '0');
        themeToggle.setAttribute('aria-label', 'Toggle dark mode');

        const handleToggle = function (e) {
            if (e.type === 'keydown' && e.key !== 'Enter' && e.key !== ' ') return;
            if (e.type === 'keydown') e.preventDefault();

            let currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
            let newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            localStorage.setItem('dayzen_theme', newTheme);
            applyTheme(newTheme);

            showThemeFeedback(newTheme === 'dark' ? 'Dark mode enabled 🌙' : 'Light mode enabled ☀️');
        };

        themeToggle.addEventListener('click', handleToggle);
        themeToggle.addEventListener('keydown', handleToggle);
    }
});

/**
 * Shows a temporary feedback toast on theme change
 */
function showThemeFeedback(message) {
    let existingFeedback = document.getElementById('dayzen-theme-feedback');
    if (existingFeedback) existingFeedback.remove();

    const feedback = document.createElement('div');
    feedback.id = 'dayzen-theme-feedback';
    feedback.textContent = message;

    feedback.style.position = 'fixed';
    feedback.style.bottom = '24px';
    feedback.style.right = '24px';
    feedback.style.padding = '12px 20px';
    feedback.style.backgroundColor = 'rgba(15, 23, 42, 0.9)';
    feedback.style.color = '#ffffff';
    feedback.style.backdropFilter = 'blur(12px)';
    feedback.style.border = '1px solid rgba(255, 255, 255, 0.15)';
    feedback.style.borderRadius = '30px';
    feedback.style.fontSize = '14px';
    feedback.style.fontWeight = '500';
    feedback.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    feedback.style.zIndex = '99999';
    feedback.style.transition = 'all 0.3s ease';

    document.body.appendChild(feedback);

    setTimeout(() => {
        feedback.style.opacity = '0';
        feedback.style.transform = 'translateY(10px)';
        setTimeout(() => feedback.remove(), 300);
    }, 2200);
}
