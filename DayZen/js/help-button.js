document.addEventListener("DOMContentLoaded", function() {
    const helpContainer = document.getElementById("help-container");
    if (helpContainer) {
        // Just the button as per the simplified requirements
        helpContainer.innerHTML = '<button class="help-btn" title="We are here to help">?</button>';
        
        const btn = helpContainer.querySelector('.help-btn');
        btn.addEventListener('click', function() {
            alert("Peace and Serenity! Our support team will be with you shortly.");
        });
    }
});