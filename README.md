# sementiquecc


# Portfolio - Cours Web Sémantique

Ce projet est un portfolio interactif conçu pour montrer les étapes d'apprentissage et d'avancement dans un cours de web sémantique. Il utilise HTML, CSS et JavaScript pour créer une page web simple mais élégante.

## Structure du Projet

Le projet se compose de trois fichiers principaux :

1. **index.html** : Le fichier HTML qui contient la structure de base de la page.
2. **styles.css** : Le fichier CSS qui contient les styles pour donner une apparence agréable à la page.
3. **scripts.js** : Le fichier JavaScript qui ajoute dynamiquement les étapes d'apprentissage à la liste.

## Installation et Utilisation

Pour utiliser ce projet, suivez les étapes ci-dessous :

1. Clonez le dépôt ou téléchargez les fichiers source.
    ```sh
    git clone https://github.com/votre-utilisateur/portfolio-web-semantique.git
    ```
2. Ouvrez le fichier `index.html` dans votre navigateur web.

## Contenu

### index.html

Ce fichier contient la structure HTML de base pour le portfolio :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio - Web Sémantique</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header>
        <h1>Portfolio - Cours Web Sémantique</h1>
    </header>
    <main>
        <section>
            <h2>Étapes d'Apprentissage</h2>
            <ul id="learning-steps">
                <!-- Les étapes seront ajoutées ici via JavaScript -->
            </ul>
        </section>
    </main>
    <footer>
        <p>&copy; 2024 Mon Portfolio</p>
    </footer>
    <script src="scripts.js"></script>
</body>
</html>
