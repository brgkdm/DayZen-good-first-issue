document.addEventListener('DOMContentLoaded', function() {
    // Check if this is the user's first visit to the project page (using localStorage)
    const hasSeenProjectTour = localStorage.getItem('dayzen_project_tour_completed');
    
    // If the user hasn't seen the project tour, show it
    if (!hasSeenProjectTour) {
        initProjectTour();
    }
    
    // Add event listener to the "Take Tour" button if it exists
    const takeTourBtn = document.getElementById('take-tour-btn');
    if (takeTourBtn) {
        takeTourBtn.addEventListener('click', initProjectTour);
    }
});

function initProjectTour() {
    // Create the tour overlay and steps
    createProjectTourElements();
    
    // Show the tour overlay
    const tourOverlay = document.getElementById('tour-overlay');
    tourOverlay.style.display = 'flex';
    tourOverlay.classList.add('active');
    
    // Add class to body to prevent scrolling
    document.body.classList.add('tour-active');
    
    // Start with the first step
    showProjectStep(0);
}

function createProjectTourElements() {
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
            title: 'Create Your First Project',
            content: 'This page allows you to create a new routine or project to track. Let\'s walk through the process together.',
            element: null
        },
        {
            title: 'Project Details',
            content: 'Start by giving your project a name and description. Be specific to help you remember what this routine is for.',
            element: '.form-group:nth-child(1), .form-group:nth-child(2)'
        },
        {
            title: 'Project Type',
            content: 'Select the type of project that best fits your routine. This helps organize your activities.',
            element: '.project-types'
        },
        {
            title: 'Create Your Project',
            content: 'Once you\'ve filled in all the details, click the "Create Project" button to save your new routine.',
            element: '.project-cta-container'
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
        document.getElementById(`skip-tour-${index}`).addEventListener('click', endProjectTour);
    });
    
    // Add event listener for the "End Tour" button
    document.getElementById('end-tour').addEventListener('click', endProjectTour);
    
    // Add event listeners for the "Next" buttons
    steps.forEach((step, index) => {
        if (index < steps.length - 1) {
            document.getElementById(`next-step-${index}`).addEventListener('click', () => {
                showProjectStep(index + 1);
            });
        }
    });
}

function showProjectStep(stepIndex) {
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
        { element: '.form-group:nth-child(1), .form-group:nth-child(2)' },
        { element: '.project-types' },
        { element: '.project-cta-container' }
    ];
    
    const elementToHighlight = tourSteps[stepIndex].element;
    
    // Highlight the element if it exists
    if (elementToHighlight) {
        const elements = document.querySelectorAll(elementToHighlight);
        if (elements.length > 0) {
            elements.forEach(element => {
                element.classList.add('tour-highlight');
            });
            
            // Scroll to the first element if it's not in view
            elements[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }
}

function endProjectTour() {
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
    localStorage.setItem('dayzen_project_tour_completed', 'true');
} 