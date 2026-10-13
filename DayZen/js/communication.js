document.addEventListener("DOMContentLoaded", function () {
    const communicationForm = document.getElementById("communicationForm");
    const formMessage = document.getElementById("formMessage");

    if (!communicationForm) return;

    communicationForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const topic = document.getElementById("topic").value;

        if (name === "" || topic === "") {
            formMessage.textContent = "Please complete all required fields.";
            formMessage.style.color = "#ff9b9b";
            return;
        }

        formMessage.textContent = `Thank you, ${name}! Your ${topic} message has been received. 💙`;
        formMessage.style.color = "#8de3bd";
        communicationForm.reset();

        setTimeout(function () {
            formMessage.textContent = "";
        }, 5000);
    });
});
