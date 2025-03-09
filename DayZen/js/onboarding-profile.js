document.addEventListener('DOMContentLoaded', function() {
    // Check if this is the user's first visit to the profile page (using localStorage)
    const hasSeenProfileTour = localStorage.getItem('dayzen_profile_tour_completed');
    
    // If the user hasn't seen the profile tour, show it
    if (!hasSeenProfileTour) {
        initProfileTour();
    }
    
    // Add event listener to the "Take Tour" button if it exists
    const takeTourBtn = document.getElementById('take-tour-btn');
    if (takeTourBtn) {
        takeTourBtn.addEventListener('click', initProfileTour);
    }
});

function initProfileTour() {
    // Create the tour overlay and steps
    createProfileTourElements();
    
    // Show the tour overlay
    const tourOverlay = document.getElementById('tour-overlay');
    tourOverlay.style.display = 'flex';
    tourOverlay.classList.add('active');
    
    // Add class to body to prevent scrolling
    document.body.classList.add('tour-active');
    
    // Start with the first step
    showProfileStep(0);
}

function createProfileTourElements() {
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
            title: 'Complete Your Profile',
            content: 'This page allows you to set up your personal profile. Let\'s walk through the different sections.',
            element: null
        },
        {
            title: 'Profile Photo',
            content: 'Upload a profile photo to personalize your account. Click on the "Add Profile Photo" button to select an image.',
            element: '.profile-photo'
        },
        {
            title: 'Bio',
            content: 'Tell us about yourself in the bio section. This helps personalize your experience.',
            element: '.form-group:nth-child(2)'
        },
        {
            title: 'Fitness Preferences',
            content: 'Select your fitness preferences to help us tailor recommendations to your interests.',
            element: '.form-group:nth-child(3)'
        },
        {
            title: 'Primary Goal',
            content: 'Choose your primary fitness goal from the dropdown menu.',
            element: '.form-group:nth-child(4)'
        },
        {
            title: 'Save Your Profile',
            content: 'Once you\'ve completed your profile, click "Save Profile" to continue.',
            element: '.profile-cta-container'
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
                    : `<button id="end-tour" class="tour-btn next">Got It</button>`}
            </div>
        `;
        
        tourOverlay.appendChild(stepElement);
    });
    
    // Add the tour overlay to the body
    document.body.appendChild(tourOverlay);
    
    // Add event listeners for the "Skip" buttons
    steps.forEach((step, index) => {
        document.getElementById(`skip-tour-${index}`).addEventListener('click', endProfileTour);
    });
    
    // Add event listener for the "End Tour" button
    document.getElementById('end-tour').addEventListener('click', endProfileTour);
    
    // Add event listeners for the "Next" buttons
    steps.forEach((step, index) => {
        if (index < steps.length - 1) {
            document.getElementById(`next-step-${index}`).addEventListener('click', () => {
                showProfileStep(index + 1);
            });
        }
    });
}

function showProfileStep(stepIndex) {
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
        { element: '.profile-photo' },
        { element: '.form-group:nth-child(2)' },
        { element: '.form-group:nth-child(3)' },
        { element: '.form-group:nth-child(4)' },
        { element: '.profile-cta-container' }
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

function endProfileTour() {
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
    localStorage.setItem('dayzen_profile_tour_completed', 'true');
} 