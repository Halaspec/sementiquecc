document.addEventListener('DOMContentLoaded', function() {
    const learningSteps = [
        "Introduction au web sémantique",
        "Comprendre les balises HTML5",
        "Utilisation des microdonnées et RDFa",
        "Création d'un schéma JSON-LD",
        "Utilisation des vocabulaires sémantiques",
        "Développement d'une ontologie",
        "Interrogation de données sémantiques avec SPARQL",
        "Évaluation de la qualité des données sémantiques"
    ];

    const ul = document.getElementById('learning-steps');

    learningSteps.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        ul.appendChild(li);
    });
});
