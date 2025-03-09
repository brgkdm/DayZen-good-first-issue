document.addEventListener('DOMContentLoaded', function() {
    // Check if this is the user's first visit to the dashboard (using localStorage)
    const hasSeenDashboardTour = localStorage.getItem('dayzen_dashboard_tour_completed');
    
    // If the user hasn't seen the dashboard tour, show it
    if (!hasSeenDashboardTour) {
        initDashboardTour();
    }
    
    // Add event listener to the "Take Tour" button if it exists
    const takeTourBtn = document.getElementById('take-tour-btn');
    if (takeTourBtn) {
        takeTourBtn.addEventListener('click', initDashboardTour);
    }
});

function initDashboardTour() {
    // Create the tour overlay and steps
    createDashboardTourElements();
    
    // Show the tour overlay
    const tourOverlay = document.getElementById('tour-overlay');
    tourOverlay.style.display = 'flex';
    tourOverlay.classList.add('active');
    
    // Add class to body to prevent scrolling
    document.body.classList.add('tour-active');
    
    // Start with the first step
    showDashboardStep(0);
}

function createDashboardTourElements() {
    // Remove any existing tour elements to prevent duplicates
    const existingOverlay = document.getElementById('tour-overlay');
    if (existingOverlay) {
        existingOverlay.remove();
    }
    
    // Create the tour overlay
    const tourOverlay = document.createElement('div');
    tourOverlay.id = 'tour-overlay';
    tourOverlay.className = 'tour-overlay';
    
    // Define the tour steps
    const steps = [
        {
            title: 'Welcome to Your Dashboard!',
            content: 'This is your personal dashboard where you can manage your daily routines and track your progress. Let\'s take a quick tour to help you get started.',
            element: null
        },
        {
            title: 'Navigation',
            content: 'This is the main navigation bar. You can access different sections of the app from here.',
            element: 'nav'
        },
        {
            title: 'Profile',
            content: 'Click on your profile icon to access your account settings and preferences.',
            element: '.user-icon'
        },
        {
            title: 'Main Content',
            content: 'This is where you\'ll find your main actions and information about your routines.',
            element: '.main-content'
        },
        {
            title: 'Quick Actions',
            content: 'These buttons provide quick access to the most common actions you\'ll want to take.',
            element: '.cta-container'
        },
        {
            title: 'Sidebar',
            content: 'The sidebar shows your profile completion status and other important information.',
            element: '.sidebar'
        }
    ];
    
    // Create each tour step
    steps.forEach((step, index) => {
        const stepElement = document.createElement('div');
        stepElement.className = 'tour-step';
        stepElement.id = `tour-step-${index}`;
        
        stepElement.innerHTML = `
            <h3>${step.title}</h3>
            <p>${step.content}</p>
            <div class="tour-buttons">
                <button id="skip-tour-${index}" class="tour-btn skip">Skip Tour</button>
                ${index < steps.length - 1 
                    ? `<button id="next-step-${index}" class="tour-btn next">Next</button>` 
                    : `<button id="end-tour" class="tour-btn next">Get Started</button>`}
            </div>
        `;
        
        tourOverlay.appendChild(stepElement);
    });
    
    // Add the tour overlay to the body
    document.body.appendChild(tourOverlay);
    
    // Add event listeners for the "Skip" buttons
    steps.forEach((step, index) => {
        document.getElementById(`skip-tour-${index}`).addEventListener('click', endDashboardTour);
    });
    
    // Add event listener for the "End Tour" button
    document.getElementById('end-tour').addEventListener('click', endDashboardTour);
    
    // Add event listeners for the "Next" buttons
    steps.forEach((step, index) => {
        if (index < steps.length - 1) {
            document.getElementById(`next-step-${index}`).addEventListener('click', () => {
                showDashboardStep(index + 1);
            });
        }
    });
}

function showDashboardStep(stepIndex) {
    // Hide all steps
    const steps = document.querySelectorAll('.tour-step');
    steps.forEach(step => {
        step.style.display = 'none';
        step.classList.remove('active');
    });
    
    // Show the current step
    const currentStep = document.getElementById(`tour-step-${stepIndex}`);
    currentStep.style.display = 'block';
    currentStep.classList.add('active');
    
    // Remove highlight from all elements
    const highlightedElements = document.querySelectorAll('.tour-highlight');
    highlightedElements.forEach(el => {
        el.classList.remove('tour-highlight');
    });
    
    // Get the element to highlight for this step
    const tourSteps = [
        { element: null },
        { element: 'nav' },
        { element: '.user-icon' },
        { element: '.main-content' },
        { element: '.cta-container' },
        { element: '.sidebar' }
    ];
    
    const elementToHighlight = tourSteps[stepIndex].element;
    
    // Highlight the element if it exists
    if (elementToHighlight) {
        const element = document.querySelector(elementToHighlight);
        if (element) {
            element.classList.add('tour-highlight');
            
            // Scroll to the element if it's not in view
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

function endDashboardTour() {
    // Hide the tour overlay
    const tourOverlay = document.getElementById('tour-overlay');
    tourOverlay.style.display = 'none';
    tourOverlay.classList.remove('active');
    
    // Remove class from body to allow scrolling
    document.body.classList.remove('tour-active');
    
    // Remove highlight from all elements
    const highlightedElements = document.querySelectorAll('.tour-highlight');
    highlightedElements.forEach(el => {
        el.classList.remove('tour-highlight');
    });
    
    // Mark the tour as completed in localStorage
    localStorage.setItem('dayzen_dashboard_tour_completed', 'true');
} 