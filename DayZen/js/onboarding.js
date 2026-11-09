document.addEventListener("DOMContentLoaded", function () {
    const tourButton = document.getElementById("take-tour-btn");
    const completionKey = "dayzen_main-page_tour_completed";

    // The landing page may not include a tour button in every layout.
    if (!tourButton || typeof introJs !== "function") {
        return;
    }

    function startTour() {
        const steps = [
            {
                title: "Welcome to DayZen!",
                intro: "Let's take a quick tour of DayZen and see how it can help you organize your day."
            },
            {
                element: document.getElementById("nav_items"),
                title: "Explore DayZen",
                intro: "Use the navigation menu to explore the different sections of DayZen.",
                position: "bottom"
            },
            {
                element: document.getElementById("theme-icon"),
                title: "Choose Your Theme",
                intro: "Use the theme toggle to switch between light and dark mode.",
                position: "left"
            }
        ];

        // Only include steps whose target elements exist on this page.
        const availableSteps = steps.filter(function (step) {
            return !step.element || document.body.contains(step.element);
        });

        const tour = introJs();
        tour.setOptions({
            steps: availableSteps,
            showProgress: true,
            showBullets: true,
            exitOnOverlayClick: false,
            nextLabel: "Next",
            prevLabel: "Back",
            doneLabel: "Finish",
            skipLabel: "Skip tour",
            tooltipClass: "dayzen-onboarding-tooltip"
        });

        tour.oncomplete(function () {
            localStorage.setItem(completionKey, "true");
        });

        // Skipping is allowed and remembered so the tour does not automatically
        // reopen on every visit. The Take Tour button can always start it again.
        tour.onexit(function () {
            localStorage.setItem(completionKey, "true");
        });

        tour.start();
    }

    tourButton.addEventListener("click", startTour);

    // Automatically show the tour once for first-time visitors.
    if (localStorage.getItem(completionKey) !== "true") {
        startTour();
    }
});
