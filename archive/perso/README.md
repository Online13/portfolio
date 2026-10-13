# Archive : portfolio perso et modes

Le site a été un temps plusieurs portfolios en une page, choisis par `?mode=` (pro, explore, créatif, perso). Il est
maintenant pro seulement. Ce dossier garde ce qui a été retiré ; rien ici n'est compilé ni vérifié (exclu de
`tsconfig.json` et du scan Tailwind dans `src/styles/global.css`).

Les fichiers gardent leur chemin d'origine : `archive/perso/src/x` vivait dans `src/x`.

## Ce qu'il y a

- `docs/DIRECTION.md` : la direction d'origine, avec les quatre modes et le sélecteur.
- `src/modules/mode` : le sélecteur de mode (les anneaux) et sa logique (`?mode=`, `data-mode`).
- `src/modules/about`, `blog`, `project` : les sections du portfolio perso.
- `src/modules/tree-shadow`, `clock` : l'ombre d'arbre en WebGL et son horloge.
- `src/components/Footer.astro` : le pied de page fixe, découvert en fin de défilement.
- `src/assets` : la police Libron, la photo de profil, les photos pour la galerie.
- `src/services/content` : les dépôts `articles` et `user` (années d'expérience), et `user.json`.

## Copies de fichiers encore vivants, tels qu'ils étaient avec les modes

- `src/components/Home.astro`, `NotFound.astro`, `src/layouts/MainLayout.astro` : l'assemblage des modes et de la pièce perso.
- `src/styles/global.css` : les polices Cabin et Libron, `.trigger`, `b`.
- `src/services/i18n/ui.ts` : les textes `mode`, `about`, `hoverCard`, `projects`, `blog`, `footer`, `clock`.
- `astro.config.mjs` : les polices Cabin et Libron.

## Pour le remettre en route

- Réinstaller `three` et `@types/three` (l'ombre d'arbre).
- La collection `articles` a été retirée de `src/services/content/collections.ts`.
- Les icônes des réseaux (`SocialNetworkLinks`) sont maintenant dans `src/modules/social`.
