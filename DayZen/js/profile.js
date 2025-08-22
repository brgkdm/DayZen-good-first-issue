document.addEventListener('DOMContentLoaded', function() {
    const photoUpload = document.getElementById('photo-upload');
    const profileImg = document.getElementById('profile-img');

    photoUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                profileImg.src = e.target.result;
            }
            reader.readAsDataURL(file);
        }
    });
});

document.getElementById("back-btn").addEventListener("click",()=>{
    window.location.href = "indexacc.html";
});

const logoutBtn = document.querySelector('.log-out-btn');
const logoutPrompt = document.querySelector('.log-out-prompt');
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');

logoutBtn.addEventListener('click', () => {
    logoutBtn.style.display = "none";

    logoutPrompt.style.display = "block";
});

noBtn.addEventListener('click', () => {
    logoutBtn.style.display = "block";

    logoutPrompt.style.display = "none";
});

yesBtn.addEventListener('click', () => {
    window.location.href = "../pages/login.html";
});