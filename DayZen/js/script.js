

let routine = {
    name: "Morning Exercise",
    time: "07:00",
    repeat: "Every Day"
};



let routines = [routine];

function listRoutines() {
     let routineList = document.getElementById('routine-list');
     listRoutines();
   
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
});

document.addEventListener("DOMContentLoaded", function() {
    const heroContent = document.querySelector(".hero-content");
    heroContent.classList.add("active");
});

document.addEventListener("DOMContentLoaded", function() {
    const heroContent = document.querySelector(".hero-content");
    heroContent.classList.add("active");

    lastScrollPosition = 0;
    
    window.addEventListener("scroll", function() {
        const featuresSection = document.querySelector(".features");
        const featuresSectionTop = featuresSection.offsetTop;
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > featuresSectionTop - window.innerHeight / 2) {
            featuresSection.classList.add("active");
        }
        else {
            featuresSection.classList.remove("active");
        }
    
        // Check scroll direction
        if (scrollPosition > lastScrollPosition) {
            // Scrolling down
            featuresSection.classList.add("active");
        } else {
            // Scrolling up
            featuresSection.classList.remove("active");
        }
    
        lastScrollPosition = scrollPosition;
    });
});

const themeIcon = document.getElementById('theme-icon');
const body = document.body;

themeIcon.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    body.classList.toggle('light-mode');

    // Toggle between sun and moon icons
    if (body.classList.contains('dark-mode')) {
        themeIcon.src = 'assets/images/moon_1.png';  // Change to moon icon for dark mode
    } else {
        themeIcon.src = 'assets/images/sun.png';  // Change to sun icon for light mode
    }
});

// window.onload = function () {
//     // Select all tour steps and the overlay
//     const tourSteps = document.querySelectorAll('.tour-step');
//     const tourOverlay = document.getElementById('tourOverlay');
//     let currentStep = 0; // Track which step we're on

//     // Show the tour overlay
//     tourOverlay.style.display = 'flex';

//     // Function to show the current step
//     function showStep(step) {
//         // Hide all steps
//         tourSteps.forEach((stepElement, index) => {
//             stepElement.style.display = index === step ? 'block' : 'none';
//         });
//     }

    // // Show the first step
    // showStep(currentStep);

    // // Function to go to the next step
    // function nextStep() {
    //     currentStep++;
    //     if (currentStep < tourSteps.length) {
    //         showStep(currentStep);
    //     } else {
    //         endTour(); // End the tour if we are at the last step
    //     }
    // }

    // // Function to end the tour
    // function endTour() {
    //     tourOverlay.style.display = 'none'; // Hide the tour overlay
    // }

    // // Function to skip the tour and redirect to the home page
    // function skipTour() {
    //     tourOverlay.style.display = 'none'; // Hide the tour overlay
        
    // }

//     // Event listeners for the buttons
//     document.getElementById('nextStep1').addEventListener('click', nextStep);
//     document.getElementById('nextStep2').addEventListener('click', nextStep);
//     document.getElementById('nextStep3').addEventListener('click', nextStep);
//     document.getElementById('endTour').addEventListener('click', endTour);

//     // Skip tour button for all steps
//     document.querySelectorAll('#skipTour').forEach(button => {
//         button.addEventListener('click', skipTour);
//     });

//     // Go to Profile Setup Button
//     document.getElementById('goToProfile').addEventListener('click', function () {
//         window.location.href = 'pages/Profile.html'; // Redirect to the actual profile setup page (change URL as needed)
//     });
// };


    


