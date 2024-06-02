document.addEventListener('DOMContentLoaded', function() {
    const learningSteps = [
        "Introduction au web sémantique",
        "Comprendre les balises HTML5",
        "Utilisation des vocabulaires sémantiques"
    ];

    const ul = document.getElementById('learning-steps');

    learningSteps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        ul.appendChild(li);
    });
});
