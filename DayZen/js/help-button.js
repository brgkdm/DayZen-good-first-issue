document.addEventListener("DOMContentLoaded", function () {
    const helpCenterHTML = `
        <!-- Floating Help Button -->
        <button class="help-btn" id="help-btn">?</button>

        <!-- Help Center Popup -->
        <div class="help-center" id="help-center">
            <h4>Help Center</h4>
            <p>How can we assist you today?</p>
            <ul>
                <li><a href="pages/help.html" target="_blank">FAQ</a></li>

                <li><a href="#" onclick="alert('Support page coming soon!')">Contact Support</a></li>
                <li><a href="#" onclick="alert('Live Chat will be available soon!')">Live Chat</a></li>
            </ul>
            <button class="cancel-btn" id="close-help">Close</button>
        </div>
    `;

    // Insert the Help Center HTML at the end of body
    document.body.insertAdjacentHTML("beforeend", helpCenterHTML);

    const helpBtn = document.querySelector("#help-btn");
    const helpCenter = document.querySelector("#help-center");
    const closeHelpBtn = document.querySelector("#close-help");

    // Toggle help center visibility
    helpBtn.addEventListener("click", () => {
        helpCenter.classList.toggle("active");
    });

    closeHelpBtn.addEventListener("click", () => {
        helpCenter.classList.remove("active");
    });
});
