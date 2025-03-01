document.addEventListener("DOMContentLoaded", function () {

    const helpCenterHTML = `
        <!-- Floating Help Button -->
        <button class="help-btn" id="help-btn">?</button>

        <!-- Help Center Popup -->
        <div class="help-center" id="help-center">
            <h4>Help Center</h4>
            <p>How can we assist you today?</p>
            <ul>
                <li><a href="/pages/help.html">FAQ</a></li>
                <li><a href="#">Contact Support</a></li>
                <li><a href="#">Live Chat</a></li>
            </ul>
            <button class="cancel-btn" id="close-help">Close</button>
        </div>
    `;

    // Inserir HTML no final do body
    document.body.insertAdjacentHTML("beforeend", helpCenterHTML);

    // Selecionar os elementos criados
    const helpBtn = document.querySelector("#help-btn");
    const helpCenter = document.querySelector("#help-center");
    const closeHelpBtn = document.querySelector("#close-help");

    // Evento para abrir/fechar o Help Center
    helpBtn.addEventListener("click", function () {
        helpCenter.classList.toggle("active");
    });

    closeHelpBtn.addEventListener("click", function () {
        helpCenter.classList.remove("active");
    });
});
