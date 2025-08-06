document.addEventListener('DOMContentLoaded', function() {
    // Check if this is the user's first visit to the profile page (using localStorage)
    const hasSeenProfileTour = localStorage.getItem('dayzen_profile_tour_completed');
    
    let profileTourBtn = document.getElementById("take-tour-btn");


     if(!hasSeenProfileTour){
        profileTour();
    } // If tourBtn doesn't exist return, dont crash the whole code

    function profileTour(){
        const tour = introJs.tour();
        tour.setOptions({
            showProgress : true, 
            steps: [
               {
            title: 'Complete Your Profile',
            intro: 'This page allows you to set up your personal profile. Let\'s walk through the different sections.',
           
        },
            {
            element:document.getElementById("profile-img"),
            title: 'Profile Photo',
            intro: 'Upload a profile photo to personalize your account. Click on the "Add Profile Photo" button to select an image.',
           
        },
        {   element:document.querySelector(".form-group"),
            title: 'Bio',
            intro: 'Tell us about yourself in the bio section. This helps personalize your experience.',
            position: "left"
           
        },
        {
             element:document.getElementById("select-preference"),
            title: 'Fitness Preferences',
            intro: 'Select your fitness preferences to help us tailor recommendations to your interests.',
           
        },
        {
             element:document.getElementById("fitness-goal"),
            title: 'Primary Goal',
            intro: 'Choose your primary fitness goal from the dropdown menu.',
            position: "left"
           
        },
        {
             element:document.querySelector(".cta-button.primary-cta"),
            title: 'Save Your Profile',
            intro: 'Once you\'ve completed your profile, click "Save Profile" to continue.',
           
        },
          ]
          }).oncomplete(()=>{
            // ✅ Set localStorage after tour completes
            localStorage.setItem('dayzen_profile_tour_completed', "true");

        });


    

    tour.start();
    }// Function end point

   profileTourBtn.addEventListener("click", ()=>{
    profileTour();

   });

});