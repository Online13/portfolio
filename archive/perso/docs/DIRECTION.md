# Direction

## L'idée

Le portfolio a plusieurs **modes**. Changer de mode ne change pas un thème de couleurs : ça change tout le design, et le contenu avec. Chaque mode est un portfolio à part entière, pensé pour un visiteur différent.

## Les modes

| Mode | Valeur dans l'URL | Pour qui, pour quoi | État |
| --- | --- | --- | --- |
| **Explore** | `explore` | Un laboratoire de design : essayer des directions cohérentes (futuriste, etc.) qui peuvent devenir des modes. | À faire. |
| **Pro** | `pro` | Quelqu'un qui veut travailler avec moi. Sections attendues d'un site pro : les services que je propose, etc. | Sections en place, à ajuster. |
| **Créatif** | `creatif` | Faire ce qui me plaît : animations, shaders, décoration, sans souci de cohérence. | À faire. |
| **Perso** | `perso` | Ce qui fait de moi, moi : qui je suis, ce que je fais en dehors du travail, une petite galerie de photos. | C'est le portfolio actuel, à compléter. |

La liste n'est pas fermée : d'autres modes pourront s'ajouter plus tard, par exemple un mode futuriste sorti du mode explore.

Les quatre modes sont mis en place tout de suite, ensemble. Avant de les construire, on fixe le contenu de chacun.

## Contenu de chaque mode

### Pro

Le design s'inspire de [significa.co](https://significa.co/) : fond sombre, grands titres en deux tons, sections séparées par des filets.

Comme sur significa, la page n'a pas de marge horizontale : les sections et leurs filets vont d'un bord à l'autre de l'écran. Seul le contenu est tenu dans une colonne centrée (`.pro-container`).

Dans l'ordre de la page :

1. **Services** : ce que je propose. Création d'applications mobiles, landing pages, automatisation, SaaS. Un clic sur un service ouvre un overlay plein écran, pas une boîte de dialogue ni des cartes : le titre et la description en haut, puis on fait défiler les outils et les étapes du process.
2. **Réalisations** : ce qui a été construit, en deux sections séparées, projets pro et projets perso.
   - Projet pro : un clic agrandit la ligne, qui montre une image, plus d'explications et un bouton vers la page du projet.
   - Projet perso : un aperçu suit le curseur et fait défiler les images du projet ; un clic mène à la page du projet.
   - Chaque réalisation a sa page (`/work/<slug>/`, `/fr/work/<slug>/`), dans le design du mode pro. Ses images se déposent dans `src/assets/images/work/<slug>/`.
3. **Développement avec l'IA** : affirmer que je développe aujourd'hui avec l'IA et des outils modernes.
4. **Outils** : les outils maîtrisés en production. Une liste simple, sans détail.
5. **Contact** : un petit formulaire, tout simple. L'envoi passe par un Worker Cloudflare, à faire plus tard.

Pas de FAQ.

### Perso

Le portfolio actuel sert de base : à propos, projets en cours, blog, CV. S'y ajoute ce qui fait de moi, moi, dont une petite galerie de photos.

### Créatif

Il reprend des sections des autres modes, mais le sujet est la façon de les exprimer : animations, shaders, effets. C'est la forme qui décide de ce qu'on montre et de comment on le montre. C'est le mode où tout est permis : une idée qui me plaît, je l'implémente ici. Il n'a pas à être cohérent ni régulier d'un bout à l'autre.

### Explore

Le mode où on essaie de nouveaux designs. Chaque section peut avoir un design différent (futuriste, ou autre), mais chacun est un design cohérent, un vrai système qu'on pourrait étendre à une page entière. Un design qui tient la route peut ensuite devenir un mode à part.

Le contenu des sections reste à définir.

### Explore et créatif : la différence

Les deux se ressemblent, on les sépare quand même.

- **Créatif** porte sur la présentation et la décoration : comment on montre le contenu. Aucune cohérence exigée.
- **Explore** porte sur le design : on y cherche des directions cohérentes, avec l'idée d'en tirer de nouveaux modes.

## Ce qui change d'un mode à l'autre

- **Le design, entièrement** : mise en page, typographie, ambiance. Deux modes n'ont pas à se ressembler.
  - **Pro** : moderne.
  - **Perso** : un endroit où on se sent chez soi. C'est le design actuel, avec la police [Libron](https://github.com/nicoverbruggen/libron) à l'essai. L'ombre d'arbre et l'horloge lui appartiennent ; les deux vont ensemble et n'apparaissent dans aucun autre mode.
  - **Créatif** : libre, porté par les animations et les shaders, sans cohérence imposée.
  - **Explore** : plusieurs designs côte à côte, un par section, chacun cohérent en lui-même.
- **Le contenu** : chaque mode a ses propres sections. Le mode pro a une section services, les autres non.

Seul le sélecteur de mode est commun à tous les modes. Le pied de page et le sélecteur de langue appartiennent à chaque mode, qui les dessine dans son propre design. Le mode créatif peut jouer avec le sien (par exemple un pied de page qui s'enfuit).

## Choisir un mode

Le mode est toujours dans l'URL, dans un paramètre : `?mode=pro`, `?mode=explore`, `?mode=creatif`, `?mode=perso`. Un lien mène donc directement à un mode précis.

Le mode par défaut est **pro**. Si on arrive sans paramètre (sur `/` par exemple), la page ajoute tout de suite `?mode=pro` à l'URL, sans rechargement. Changer de mode met le paramètre à jour.

Dans la page, on change de mode avec un sélecteur dessiné pour ça, pas avec un composant d'interface standard (ni liste déroulante, ni case à cocher, ni onglets) :

- Une zone de la page sert de déclencheur. Quand la souris passe dessus, le sélecteur s'ouvre. Deux emplacements à tester : en haut à droite, ou au centre en bas.
- Au clavier, un raccourci ouvre le sélecteur. À faire plus tard.
- Au tactile, il n'y a pas de survol : à prévoir plus tard.
- Il est fait de cercles au tracé discontinu : chaque cercle est découpé en arcs, et les arcs se partagent entre les modes (pro, créatif, explore, perso).
- Cliquer sur un mode change toute la page : le design, le contenu, l'ambiance. La transition fait partie du design, elle doit donner l'impression de changer d'endroit.

## Contraintes techniques

- **Une seule page HTML par langue.** L'anglais est sur `/`, le français sur `/fr/`, sans `/en/`. La langue est dans le chemin, le mode dans le paramètre (`/fr/?mode=perso`), et le mode est conservé quand on change de langue. Les modes ne sont pas des routes séparées : la page contient tous les modes, et le changement se fait dans la page, sans rechargement.
- **Astro, rendu statique.** Chaque mode est rendu au build dans cette page. Le site est servi comme fichiers statiques, donc le paramètre d'URL est lu côté client.
- **La duplication est acceptée pour le moment.** Si les mêmes données (projets, expériences) se retrouvent rendues dans plusieurs modes, tant pis. On factorisera quand ça gênera.

## À trancher

- Le mode explore : quel contenu dans ses sections, et quels designs essayer en premier.
- L'emplacement de la zone qui ouvre le sélecteur : en haut à droite ou au centre en bas, à choisir après essai.
- Les sections exactes du mode créatif.
