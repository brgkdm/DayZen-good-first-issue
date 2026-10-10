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

  // Page transition fade animation
  document.documentElement.style.opacity = 0;
  document.documentElement.style.transition = "opacity 0.35s ease";
  requestAnimationFrame(() => {
    document.documentElement.style.opacity = 1;
  });

  document.querySelectorAll('a[href]').forEach((link) => {
    const url = link.getAttribute('href');
    if (!url || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:') || link.target === '_blank') {
      return;
    }

    const isExternal = url.startsWith('http') && !url.includes(window.location.hostname);
    if (isExternal) return;

    link.addEventListener('click', function (event) {
      if (url.startsWith('#')) return;
      event.preventDefault();
      document.documentElement.style.opacity = 0;
      setTimeout(() => {
        window.location.href = link.href;
      }, 280);
    });
  });

  // Progress ring animation
  const circle = document.querySelector(".ring-progress");
  const value = document.getElementById("progressValue");
  if (circle && value) {
    const percent = 75;
    const radius = 85;
    const circumference = 2 * Math.PI * radius;

    circle.style.strokeDasharray = circumference;
    circle.style.strokeDashoffset = circumference;

    setTimeout(() => {
      const offset = circumference - (percent / 100) * circumference;
      circle.style.strokeDashoffset = offset;
      value.innerHTML = percent + "%";
    }, 300);
  }

  // Close navbar collapse on click outside
  document.addEventListener("click", function (e) {
    const navbar = document.querySelector(".navbar-collapse");
    const toggler = document.querySelector(".navbar-toggler");

    if (
      navbar &&
      toggler &&
      navbar.classList.contains("show") &&
      !navbar.contains(e.target) &&
      !toggler.contains(e.target) &&
      typeof bootstrap !== "undefined"
    ) {
      const instance = bootstrap.Collapse.getInstance(navbar);
      if (instance) instance.hide();
    }
  });
});

