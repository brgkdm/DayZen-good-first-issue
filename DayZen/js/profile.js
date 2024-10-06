document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const profilePhotoInput = document.getElementById('profile-photo-input');
    const profilePhoto = document.getElementById('profile-photo');
    const photoCheckbox = document.getElementById('photo-checkbox');
    
    const bioInput = document.getElementById('bio-input');
    const saveBioButton = document.getElementById('save-bio');
    const savedBioText = document.getElementById('saved-bio');
    const bioCheckbox = document.getElementById('bio-checkbox');
    
    const progress = document.getElementById('progress');
    const progressText = document.getElementById('progress-text');
    
    let tasksCompleted = 0;

    // Helper function to update progress bar
    function updateProgress() {
        const percentComplete = Math.min((tasksCompleted / 2) * 100, 100); // Max of 100%
        progress.style.width = percentComplete + '%';
        progressText.textContent = percentComplete + '% Profile Completed';
    }

    // Handle profile photo upload
    profilePhotoInput.addEventListener('change', function() {
        const file = profilePhotoInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profilePhoto.src = e.target.result;
                profilePhoto.style.display = 'block'; // Ensure image is visible
                profilePhotoInput.style.display = 'none'; // Hide the file input
                if (!photoCheckbox.checked) {
                    tasksCompleted++;
                }
                photoCheckbox.checked = true; // Update checkbox
                updateProgress();
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle bio saving
    saveBioButton.addEventListener('click', function() {
        const bioText = bioInput.value.trim();
        if (bioText !== '') {
            localStorage.setItem('userBio', bioText); // Save bio in localStorage
            savedBioText.style.display = 'block';
            if (!bioCheckbox.checked) {
                tasksCompleted++;
            }
            bioCheckbox.checked = true; // Update checkbox
            updateProgress();
        }
    });

    // Check if bio is already saved in localStorage on page load
    const savedBio = localStorage.getItem('userBio');
    if (savedBio) {
        bioInput.value = savedBio;
        bioCheckbox.checked = true;
        tasksCompleted++;
        savedBioText.style.display = 'block';
    }

    // Update progress bar on page load
    updateProgress(); // Call this initially to update the progress bar
});
