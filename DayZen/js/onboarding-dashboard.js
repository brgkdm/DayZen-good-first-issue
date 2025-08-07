document.addEventListener('DOMContentLoaded', function () {
    const hasSeenDashboardTour = localStorage.getItem('dayzen_dashboard_tour_completed');

    const tourButton = document.querySelector(".tour-button");
    if (!tourButton) return; // If tourBtn doesn't exist return, dont crash the whole code

       function startTour(){
       const tour =  introJs.tour();
       
       tour.setOptions({
            showProgress: true,
            steps: [
                {
                    title: "Welcome to DayZen!",
                    intro: "Let\'s take a quick tour to help you get started with our platform. We\'ll show you the main features and how to use them.",
                },
                {
                    element:document.querySelector(".container"),     
                    title: "Navigation",
                    intro: "This is the main navigation bar. You can access different sections of the app from here."
                
                },
                {
                    element:document.querySelector(".cta-container"),
                    title: "Build Your Workflow in 3 Steps",
                    intro: "Set up your profile, launch your first project, and explore powerful features – all in just a few clicks."
                },
                 {
                    element:document.querySelector(".cta-button.primary-cta"),
                    title: "Complete Your Profile",
                    intro: "Add your details to personalize your experience and get started smoothly."
                },
                {
                   element:document.querySelector(".sidebar"),
                    title: "Profile Progress Bar",
                    intro: "Your Profile progression Bar will Show here"
                },
                  {
                   element:document.querySelector(".cta-button.tertiary-cta"),
                    title: "Explore Features",
                    intro: "You Can Explore this Website Features Here"
                },
                 {
                   element:document.querySelector(".cta-button.secondary-cta"),
                    title: "Start Your First Project",
                    intro: "Kickstart your journey by creating your very first project with ease"
                },
                // Add more steps here000000
            ]
        }).oncomplete( ()=>{
            // ✅ Only mark completed on first finish
            localStorage.setItem('dayzen_dashboard_tour_completed', 'true');
        });

        
  tour.start();
    }; //Function end point//
  
    
    //Add event Listener to the Tour Btn So users can call TourFunction Manually
      tourButton.addEventListener("click",()=>{
       
      startTour();
         
      });
     
// Optional: Auto-start the tour for first-time use
if(!hasSeenDashboardTour){
        startTour();
         }
      
});