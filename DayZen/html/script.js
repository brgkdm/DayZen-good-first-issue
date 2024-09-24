document.addEventListener('DOMContentLoaded', function() {
    // Profile completion logic
    let completedTasks = 0;
    const totalTasks = 3; // We have 3 tasks: Upload Avatar, Add Bio, Set Preferences
    const progressBar = document.getElementById('profile-progress');
    const progressPercent = document.getElementById('progress-percent');
    const uploadAvatarCheckbox = document.getElementById('upload-avatar-checkbox');
    const bioCheckbox = document.getElementById('bio-checkbox');
    const preferencesCheckbox = document.getElementById('preferences-checkbox');
    
    function updateProgress() {
        const progress = (completedTasks / totalTasks) * 100;
        progressBar.style.width = progress + '%';
        progressPercent.textContent = `Profile Completion: ${progress}%`;
    }

    // Check if the avatar was uploaded (simulation)
    document.getElementById('upload-avatar').addEventListener('change', function() {
        if (!uploadAvatarCheckbox.checked) {
            uploadAvatarCheckbox.checked = true;
            completedTasks += 1;
            updateProgress();
        }
    });

    // Check if bio was added
    document.getElementById('bio').addEventListener('input', function() {
        if (this.value.trim() !== '' && !bioCheckbox.checked) {
            bioCheckbox.checked = true;
            completedTasks += 1;
            updateProgress();
        }
    });

    // Check if preferences were set
    document.getElementById('preferences').addEventListener('input', function() {
        if (this.value.trim() !== '' && !preferencesCheckbox.checked) {
            preferencesCheckbox.checked = true;
            completedTasks += 1;
            updateProgress();
        }
    });

    updateProgress(); // Initialize progress on page load

    // Simulate avatar upload preview
    document.getElementById('upload-avatar').addEventListener('change', function(event) {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = function(e) {
            document.querySelector('.profile-image img').src = e.target.result;
        }

        if (file) {
            reader.readAsDataURL(file);
        }
    });

    // Routine management
    let routine = {
        name: "Morning Exercise",
        time: "07:00",
        repeat: "Every Day"
    };

    let routines = [routine];

    function listRoutines() {
        let routineList = document.getElementById('routine-list');
        routineList.innerHTML = '';

        routines.forEach(function(routine, index) {
            routineList.innerHTML += `
                <div class="routine">
                    <h3>${routine.name}</h3>
                    <p>Time: ${routine.time}</p>
                    <p>Repeat: ${routine.repeat}</p>
                    <button onclick="deleteRoutine(${index})">Delete</button>
                </div>
            `;
        });
    }

    function addRoutine() {
        let name = document.getElementById('name').value;
        let time = document.getElementById('time').value;
        let repeat = document.getElementById('repeat').value;

        let newRoutine = {
            name: name,
            time: time,
            repeat: repeat
        };

        routines.push(newRoutine);
        listRoutines();
    }

    function deleteRoutine(index) {
        routines.splice(index, 1);
        listRoutines();
    }

    listRoutines(); // Initialize routine list on page load

    // Hero section animation
    const heroContent = document.querySelector(".hero-content");
    heroContent.classList.add("active");

    window.addEventListener("scroll", function() {
        const featuresSection = document.querySelector(".features");
        const featuresSectionTop = featuresSection.offsetTop;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > featuresSectionTop - window.innerHeight / 2) {
            featuresSection.classList.add("active");
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    let completedTasks = 0;
    const totalTasks = 3;
    const progressBar = document.getElementById('profile-progress');
    const progressPercent = document.getElementById('progress-percent');
    const uploadAvatarCheckbox = document.getElementById('upload-avatar-checkbox');
    const bioCheckbox = document.getElementById('bio-checkbox');
    const preferencesCheckbox = document.getElementById('preferences-checkbox');

    function updateProgress() {
        const progress = (completedTasks / totalTasks) * 100;
        progressBar.style.width = progress + '%';
        progressPercent.textContent = `Profile Completion: ${progress}%`;
    }

    // Check if the avatar was uploaded (simulation)
    document.getElementById('upload-avatar').addEventListener('change', function () {
        if (!uploadAvatarCheckbox.checked) {
            uploadAvatarCheckbox.checked = true;
            completedTasks += 1;
            updateProgress();
        }

        const file = this.files[0];
        const reader = new FileReader();
        reader.onload = function (e) {
            document.querySelector('.profile-image img').src = e.target.result;
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    });

    // Check if bio was added
    document.getElementById('bio').addEventListener('input', function () {
        if (this.value.trim() !== '' && !bioCheckbox.checked) {
            bioCheckbox.checked = true;
            completedTasks += 1;
            updateProgress();
        }
    });

    // Check if preferences were set
    document.getElementById('preferences').addEventListener('input', function () {
        if (this.value.trim() !== '' && !preferencesCheckbox.checked) {
            preferencesCheckbox.checked = true;
            completedTasks += 1;
            updateProgress();
        }
    });

    // Handle form submission and update profile view
    document.getElementById('profile-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const bio = document.getElementById('bio').value;
        const preferences = document.getElementById('preferences').value;

        // Update profile info in the view
        document.querySelector('.profile-info h3').textContent = name;
        document.querySelector('.profile-info p:nth-child(3)').textContent = `Bio: ${bio}`;
        document.querySelector('.profile-info p:nth-child(4)').textContent = `Preferences: ${preferences}`;

        alert("Profile updated successfully!");
    });

    updateProgress(); // Initialize progress on page load
});

