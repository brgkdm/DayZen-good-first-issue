document.addEventListener('DOMContentLoaded', function() {
    // Handle project type selection
    const projectTypeCards = document.querySelectorAll('.project-type-card');
    let selectedType = null;

    projectTypeCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove selected class from all cards
            projectTypeCards.forEach(c => c.classList.remove('selected'));
            
            // Add selected class to clicked card
            this.classList.add('selected');
            
            // Store the selected type
            selectedType = this.querySelector('h3').textContent;
        });
    });

    // Handle form submission
    const createButton = document.querySelector('.primary-cta');
    createButton.addEventListener('click', function() {
        const projectName = document.getElementById('project-name').value;
        const projectDescription = document.getElementById('project-description').value;
        
        // Validate form
        if (!projectName) {
            alert('Please enter a project name');
            return;
        }
        
        if (!selectedType) {
            alert('Please select a project type');
            return;
        }
        
        // Store project data (in a real app, this would be sent to a server)
        const projectData = {
            name: projectName,
            description: projectDescription,
            type: selectedType,
            createdAt: new Date().toISOString()
        };
        
        // For demo purposes, store in localStorage
        const projects = JSON.parse(localStorage.getItem('projects') || '[]');
        projects.push(projectData);
        localStorage.setItem('projects', JSON.stringify(projects));
        
        // Redirect to dashboard with success message
        alert('Project created successfully!');
        window.location.href = 'indexacc.html';
    });
}); 