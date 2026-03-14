// -------------------- ROUTINE DATA --------------------
let routine = {
  name: "Morning Exercise",
  time: "07:00",
  repeat: "Every Day",
};

let routines = [routine];

// -------------------- LIST ROUTINES --------------------
function listRoutines() {
  const routineList = document.getElementById("routine-list");

  // Prevent error if element doesn't exist on this page
  if (!routineList) return;

  routineList.innerHTML = "";

  routines.forEach(function (routine, index) {
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

// -------------------- ADD ROUTINE --------------------
function addRoutine() {
  const nameInput = document.getElementById("name");
  const timeInput = document.getElementById("time");
  const repeatInput = document.getElementById("repeat");

  // Safety check
  if (!nameInput || !timeInput || !repeatInput) return;

  let newRoutine = {
    name: nameInput.value,
    time: timeInput.value,
    repeat: repeatInput.value,
  };

  routines.push(newRoutine);
  listRoutines();
}

// -------------------- DELETE ROUTINE --------------------
function deleteRoutine(index) {
  routines.splice(index, 1);
  listRoutines();
}

// -------------------- DOM CONTENT LOADED --------------------
document.addEventListener("DOMContentLoaded", function () {
  // Load routines safely
  listRoutines();

  // Hero animation (safe)
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.classList.add("active");
  }

  // Scroll animation (safe)
  let lastScrollPosition = 0;
  const featuresSection = document.querySelector(".features");

  if (featuresSection) {
    window.addEventListener("scroll", function () {
      const featuresTop = featuresSection.offsetTop;
      const scrollPosition = window.scrollY;

      if (scrollPosition > featuresTop - window.innerHeight / 2) {
        featuresSection.classList.add("active");
      } else {
        featuresSection.classList.remove("active");
      }

      lastScrollPosition = scrollPosition;
    });
  }
});

// -------------------- THEME TOGGLE --------------------
const themeIcon = document.getElementById("theme-icon");
const body = document.body;

if (themeIcon) {
  themeIcon.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode");

    if (body.classList.contains("dark-mode")) {
      themeIcon.src = "assets/images/moon_1.png";
    } else {
      themeIcon.src = "assets/images/sun.png";
    }
  });
}
