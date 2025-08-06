document.addEventListener('DOMContentLoaded', function () {
    const hasSeenDashboardTour = localStorage.getItem('dayzen_main-page_tour_completed');

    const tourButton = document.getElementById("take-tour-btn");
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
                    element:document.getElementById("nav_items"),     
                    title: "Navigation",
                    intro: "This is the main navigation bar. You can access different sections of the app from here."
                
                },
                {
                    element:document.getElementById("theme-icon"),
                    title: "Theme Toggle ",
                    intro: "Change Theme to Dark Mode / Light Mode , According to your comfortability"
                },
                 {
                    element:document.getElementById("start-now"),
                    title: "Start Now To Get Started",
                    intro: "Start and you'll be redirected to login page and get to know more about the website"
                },
                {
                   element:document.getElementById("features"),
                    title: "Features List",
                    intro: "Stay organized with time-based reminders ",
                    position: "bottom"
                },
                
                // Add more steps here000000
            ]
        }).oncomplete( ()=>{
            // ✅ Only mark completed on first finish
            localStorage.setItem('dayzen_main-page_tour_completed', 'true');
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