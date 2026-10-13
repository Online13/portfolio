# Direction

## L'idée

Le portfolio est un portfolio pro : il s'adresse à quelqu'un qui veut travailler avec moi. Il montre ce que je propose et ce que j'ai construit.

L'ancien portfolio perso et le sélecteur de modes sont rangés dans `archive/perso/`, hors du build.

## Design

Le design s'inspire de [significa.co](https://significa.co/) : fond sombre, grands titres en deux tons, sections séparées par des filets, texte en Inter.

Comme sur significa, la page n'a pas de marge horizontale : les sections et leurs filets vont d'un bord à l'autre de l'écran. Seul le contenu est tenu dans une colonne centrée (`.pro-container`).

## Sections

Dans l'ordre de la page :

1. **Services** : ce que je propose. Création d'applications mobiles, landing pages, applications fullstack, SaaS. Un clic sur un service ouvre un overlay plein écran, pas une boîte de dialogue ni des cartes : le titre et la description en haut, puis on fait défiler les outils et les étapes du process.
2. **Réalisations** : ce qui a été construit, en deux sections séparées, projets pro et projets perso.
   - Projet pro : un clic agrandit la ligne, qui montre une image, plus d'explications et un bouton vers la page du projet.
   - Projet perso : un aperçu suit le curseur et fait défiler les images du projet ; un clic mène à la page du projet.
   - Chaque réalisation a sa page (`/work/<slug>/`, `/fr/work/<slug>/`). Ses images se déposent dans `src/assets/images/work/<slug>/`.
3. **Développement avec l'IA** : affirmer que je développe aujourd'hui avec l'IA et des outils modernes.
4. **Outils** : les outils maîtrisés en production. Une liste simple, sans détail.
5. **Contact** : un petit formulaire, tout simple. L'envoi passe par un Worker Cloudflare, à faire plus tard.

Pas de FAQ.

## Pages

L'en-tête est le même sur tout le site : le nom, qui ramène à l'accueil, puis À propos, Blog, le bouton Contact et le choix de la langue.

En dehors de l'accueil :

- **À propos** (`/about/`, `/fr/about/`) : qui je suis, en quelques paragraphes, puis deux sections et le même pied de page que l'accueil.
  - Formation : les diplômes, les mêmes que ceux du CV.
  - Galerie : toutes les images déposées dans `src/assets/images/gallery/`. Le nom du fichier sert de description.
- **Blog** (`/blog/`, `/fr/blog/`) : les articles, rangés en deux catégories.
  - Exploration : ce que j'essaie.
  - Retours : ce qu'un projet m'a appris.
  - Un article est un fichier Markdown par langue : `src/services/content/data/articles/<langue>/<slug>.md`. Tant qu'il porte `draft: true`, il porte l'étiquette brouillon et sa page est cachée aux moteurs de recherche.

Le CV s'ouvre par-dessus la page avec `#resume`, et s'imprime en PDF (`bun run cv`).

## Contraintes techniques

- **Une page d'accueil par langue.** L'anglais est sur `/`, le français sur `/fr/`, sans `/en/`.
- **Astro, rendu statique.** Le site est servi comme fichiers statiques.
