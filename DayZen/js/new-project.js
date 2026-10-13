document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.project-type-card, .type-card');
    let selectedType = null;

    cards.forEach(card => {
        card.addEventListener('click', () => {
            cards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            selectedType = card.dataset.type || card.getAttribute('data-type');
        });
    });

    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const nameInput = document.getElementById('project-name');
            const name = nameInput ? nameInput.value : 'New Project';

            if (!selectedType) {
                alert('Please select a project type to continue.');
                return;
            }

            alert(`Success! Your "${name}" ${selectedType} project has been created.`);
            window.location.href = '../index.html';
        });
    }
});