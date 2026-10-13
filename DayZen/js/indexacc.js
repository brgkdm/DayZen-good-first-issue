document.addEventListener("DOMContentLoaded", function () {
    // Username greeting
    const userNameEl = document.getElementById("user-name");
    if (userNameEl) {
        const username = localStorage.getItem("registeredUsername") || localStorage.getItem("username");
        userNameEl.textContent = username || "User";
    }

    // Logout handling
    const logoutBtn = document.getElementById("logout-btn");
    const mobileLogoutBtn = document.getElementById("mobile-logout-btn");

    function handleLogout(e) {
        if (e) e.preventDefault();
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("dayzen_user");
        window.location.href = "../index.html";
    }

    if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener("click", handleLogout);

    // Custom Glassmorphism Time Picker Controls
    const timeHhInput = document.getElementById("time-hh");
    const timeMmInput = document.getElementById("time-mm");
    const timeAmpmBtn = document.getElementById("time-ampm-btn");

    if (timeAmpmBtn) {
        timeAmpmBtn.addEventListener("click", function () {
            timeAmpmBtn.textContent = timeAmpmBtn.textContent === "AM" ? "PM" : "AM";
        });
    }

    if (timeHhInput && timeMmInput) {
        // Auto-advance to minute input when 2 digits entered
        timeHhInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, "");
            if (this.value.length === 2) {
                let hhVal = parseInt(this.value, 10);
                if (hhVal > 12) this.value = "12";
                if (hhVal === 0) this.value = "01";
                timeMmInput.focus();
            }
        });

        timeHhInput.addEventListener("blur", function () {
            if (this.value.length === 1) {
                this.value = "0" + this.value;
            }
            let hhVal = parseInt(this.value, 10);
            if (isNaN(hhVal) || hhVal < 1) this.value = "07";
            else if (hhVal > 12) this.value = "12";
        });

        timeMmInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, "");
            if (this.value.length === 2) {
                let mmVal = parseInt(this.value, 10);
                if (mmVal > 59) this.value = "59";
            }
        });

        timeMmInput.addEventListener("blur", function () {
            if (this.value.length === 1) {
                this.value = "0" + this.value;
            }
            let mmVal = parseInt(this.value, 10);
            if (isNaN(mmVal) || mmVal < 0 || mmVal > 59) this.value = "00";
        });
    }

    // Hamburger menu logic
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const mobileNav = document.getElementById("mobile-nav");
    const overlay = document.getElementById("overlay");

    if (hamburgerBtn && mobileNav && overlay) {
        function openMenu() {
            mobileNav.classList.add("open");
            overlay.classList.add("open");
            hamburgerBtn.setAttribute("aria-expanded", "true");
            document.body.style.overflow = "hidden";
        }

        function closeMenu() {
            mobileNav.classList.remove("open");
            overlay.classList.remove("open");
            hamburgerBtn.setAttribute("aria-expanded", "false");
            document.body.style.overflow = "";
        }

        hamburgerBtn.addEventListener("click", () => {
            mobileNav.classList.contains("open") ? closeMenu() : openMenu();
        });

        overlay.addEventListener("click", closeMenu);

        document.addEventListener("click", (e) => {
            if (
                mobileNav.classList.contains("open") &&
                !mobileNav.contains(e.target) &&
                !hamburgerBtn.contains(e.target)
            ) {
                closeMenu();
            }
        });

        mobileNav.querySelectorAll("a").forEach(link => {
            if (link.id !== "mobile-logout-btn") {
                link.addEventListener("click", closeMenu);
            }
        });

        document.addEventListener("keydown", e => {
            if (e.key === "Escape") closeMenu();
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) closeMenu();
        });
    }

    // Routines management
    const routineStorageKey = "dayzen-routines";
    const streakStorageKey = "dayzen-streak";
    const searchInput = document.getElementById("search-routine");
    const today = new Date().toISOString().slice(0, 10);

    let routines = JSON.parse(localStorage.getItem(routineStorageKey) || "null") || [
        { name: "Morning Exercise", time: "07:00 AM", repeat: "Every Day", completedDate: "" }
    ];
    let streak = JSON.parse(localStorage.getItem(streakStorageKey) || "null") || {
        count: 0,
        lastCompletedDate: ""
    };

    function escapeHtml(value) {
        return value.replace(/[&<>'"]/g, character => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
        }[character]));
    }

    function saveRoutineData() {
        localStorage.setItem(routineStorageKey, JSON.stringify(routines));
        localStorage.setItem(streakStorageKey, JSON.stringify(streak));
    }

    window.listRoutines = function () {
        const routineList = document.getElementById("routine-list");
        if (!routineList) return;

        const searchText = searchInput ? searchInput.value.toLowerCase().trim() : "";

        const completedCount = routines.filter(
            routine => routine.completedDate === today
        ).length;

        const routineProgressEl = document.getElementById("routine-progress");
        if (routineProgressEl) {
            routineProgressEl.textContent = `${completedCount} of ${routines.length} completed today`;
        }

        const streakCountEl = document.getElementById("streak-count");
        if (streakCountEl) {
            streakCountEl.textContent = streak.count;
        }

        const filteredRoutines = routines
            .map((routine, index) => ({ routine, index }))
            .filter(item => item.routine.name.toLowerCase().includes(searchText));

        routineList.innerHTML = filteredRoutines.map(({ routine, index }) => `
            <div class="routine${routine.completedDate === today ? " completed" : ""}">
                <label class="routine-check">
                    <input type="checkbox"
                        ${routine.completedDate === today ? "checked" : ""}
                        onchange="toggleRoutine(${index}, this.checked)">
                    <span>${escapeHtml(routine.name)}</span>
                </label>

                <p>Time: ${escapeHtml(routine.time)}</p>
                <p>Repeat: ${escapeHtml(routine.repeat)}</p>

                <button onclick="deleteRoutine(${index})">Delete</button>
            </div>
        `).join("");
    };

    window.toggleRoutine = function (index, isCompleted) {
        routines[index].completedDate = isCompleted ? today : "";
        const allCompleted = routines.length > 0 && routines.every(routine => routine.completedDate === today);
        if (allCompleted && streak.lastCompletedDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const yesterdayKey = yesterday.toISOString().slice(0, 10);
            streak.count = streak.lastCompletedDate === yesterdayKey ? streak.count + 1 : 1;
            streak.lastCompletedDate = today;
        }
        saveRoutineData();
        window.listRoutines();
    };

    window.deleteRoutine = function (index) {
        routines.splice(index, 1);
        saveRoutineData();
        window.listRoutines();
    };

    if (searchInput) {
        searchInput.addEventListener("input", window.listRoutines);
    }

    const routineForm = document.getElementById("routine-form");
    if (routineForm) {
        routineForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const nameVal = document.getElementById("routine-name").value.trim();
            const repeatVal = document.getElementById("routine-repeat").value;

            const hh = (document.getElementById("time-hh").value.trim() || "07").padStart(2, "0");
            const mm = (document.getElementById("time-mm").value.trim() || "00").padStart(2, "0");
            const ampm = document.getElementById("time-ampm-btn") ? document.getElementById("time-ampm-btn").textContent : "AM";
            const timeVal = `${hh}:${mm} ${ampm}`;

            routines.push({
                name: nameVal,
                time: timeVal,
                repeat: repeatVal,
                completedDate: ""
            });
            saveRoutineData();

            document.getElementById("routine-name").value = "";
            window.listRoutines();
        });
    }

    window.listRoutines();
});
