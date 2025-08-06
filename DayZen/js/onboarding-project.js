document.addEventListener('DOMContentLoaded', function () {
    const hasSeenDashboardTour = localStorage.getItem('dayzen_project_tour_completed');

    const tourButton = document.querySelector(".tour-button");
    if (!tourButton) return; // If tourBtn doesn't exist return, dont crash the whole code

       function startTour(){
       const tour =  introJs.tour();
       
       tour.setOptions({
            showProgress: true,
            steps: [
                {
                    title: "Create Project",
                    intro: "Create your new project here",
                },
                {
                    element:document.getElementById("project-name"),     
                    title: "Project Name",
                    intro: "Enter Your Project Name"
                
                },
                {
                    element:document.getElementById("project-description"),
                    title: "Project Description",
                    intro: "Add a brief and clear description of your project. This helps you stay focused and makes your routine more meaningful.  "
                },
                 {
                    element:document.getElementById("Project-Type"),
                    title: "Choose Project Type",
                    intro: "Select the category that best fits your project. This helps organize your routines by purpose—study, workout, work, or anything else."
                },
                {
                   element:document.querySelector(".cta-button.primary-cta"),
                    title: "Create Project",
                    intro: "You're Almost There , Create to get done",
                    position: "bottom"
                },
                
                // Add more steps here000000
            ]
        }).oncomplete( ()=>{
            // ✅ Only mark completed on first finish
            localStorage.setItem('dayzen_project_tour_completed', 'true');
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