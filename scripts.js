document.addEventListener('DOMContentLoaded', function() {
    const learningSteps = [
        "Introduction au web sémantique",
        "Comprendre les balises HTML5",
        "Utilisation des vocabulaires sémantiques",
        "Évaluation de la qualité des données sémantiques"
    ];

    const container = document.getElementById('learning-steps');

    learningSteps.forEach(step => {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = step;
        container.appendChild(card);
    });
});
