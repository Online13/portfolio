# Direction

## L'idée

Le portfolio est un portfolio pro : il s'adresse à quelqu'un qui veut travailler avec moi. Il montre ce que je propose et ce que j'ai construit.

L'ancien portfolio perso et le sélecteur de modes sont rangés dans `archive/perso/`, hors du build.

## Design

Le design s'inspire de [significa.co](https://significa.co/) : fond blanc, grands titres en deux tons, sections séparées par des filets, texte en Inter.

Comme sur significa, la page n'a pas de marge horizontale : les sections et leurs filets vont d'un bord à l'autre de l'écran. Seul le contenu est tenu dans une colonne centrée (`.pro-container`).

## Sections

Dans l'ordre de la page :

1. **Hero** : qui je suis. Le titre dit « Hi, I'm Nekena Rayane », avec mon portrait, puis « Software Engineer / React Native Enthusiast ». En dessous, quelques paragraphes sur moi et un lien vers le CV.
2. **Services** : ce que je propose. Le titre dit « Services. », et sa deuxième ligne, « I … » avec une phrase par service, change avec la carte au premier plan. En dessous, un carousel infini fait défiler les services : création d'applications mobiles, landing pages, applications fullstack, SaaS. « En savoir plus » sur une carte ouvre un overlay plein écran : le titre et la description en haut, puis on fait défiler les outils et les étapes du process.
3. **Réalisations** : ce qui a été construit, en deux sections séparées, projets pro et projets perso.
   - Projet pro : un clic agrandit la ligne, qui montre une image, plus d'explications et un bouton vers la page du projet.
   - Projet perso : un aperçu suit le curseur et fait défiler les images du projet ; un clic mène à la page du projet.
   - Chaque réalisation a sa page (`/work/<slug>/`, `/fr/work/<slug>/`). Ses images se déposent dans `src/assets/images/work/<slug>/`.
4. **Développement avec l'IA** : affirmer que je développe aujourd'hui avec l'IA et des outils modernes.
5. **Outils** : les outils maîtrisés en production. Une liste simple, sans détail.
6. **Formation** : les diplômes, les mêmes que ceux du CV.
7. **Galerie** : toutes les images déposées dans `src/assets/images/gallery/`. Le nom du fichier sert de description.
8. **Contact** : un petit formulaire, tout simple. L'envoi passe par un Worker Cloudflare, à faire plus tard.

Pas de FAQ.

## Pages

L'en-tête est le même sur tout le site : le nom, qui ramène à l'accueil, puis Blog, le bouton Contact et le choix de la langue.

En dehors de l'accueil :

- **Blog** (`/blog/`, `/fr/blog/`) : les articles, rangés en deux catégories.
  - Exploration : ce que j'essaie.
  - Retours : ce qu'un projet m'a appris.
  - Un article est un fichier Markdown par langue : `src/services/content/data/articles/<langue>/<slug>.md`. Tant qu'il porte `draft: true`, il porte l'étiquette brouillon et sa page est cachée aux moteurs de recherche.

Le CV s'ouvre par-dessus la page avec `#resume`, et s'imprime en PDF (`bun run cv`).

## Contraintes techniques

- **Une page d'accueil par langue.** L'anglais est sur `/`, le français sur `/fr/`, sans `/en/`.
- **Astro, rendu statique.** Le site est servi comme fichiers statiques.
