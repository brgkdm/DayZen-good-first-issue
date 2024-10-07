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

document.addEventListener('DOMContentLoaded', function() {
    listRoutines();
    
    // Animation for the hero content
    const heroContent = document.querySelector(".hero-content");
    heroContent.classList.add("active");

    // Scroll animation for features section
    window.addEventListener("scroll", function() {
        const featuresSection = document.querySelector(".features");
        const featuresSectionTop = featuresSection.offsetTop;
        const scrollPosition = window.scrollY;

        if (scrollPosition > featuresSectionTop - window.innerHeight / 2) {
            featuresSection.classList.add("active");
        }
    });
    // Load saved theme preference
    const body = document.body;
    const themeIcon = document.getElementById('theme-icon');

    // Apply saved theme preference
    if (localStorage.getItem('dark-mode') === 'true') {
        body.classList.add('dark-mode');
        themeIcon.src = 'assets/images/moon.png'; // Change to moon icon in dark mode
    }

    // Toggle theme on click
    themeIcon.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        // Toggle between sun and moon icons
        if (body.classList.contains('dark-mode')) {
            themeIcon.src = 'assets/images/moon.png'; // Change to moon icon for dark mode
            localStorage.setItem('dark-mode', 'true'); // Save preference
        } else {
            themeIcon.src = 'assets/images/sun.jpeg'; // Change to sun icon for light mode
            localStorage.setItem('dark-mode', 'false'); // Save preference
        }
    });
    
});
