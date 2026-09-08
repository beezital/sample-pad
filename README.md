# Sample Pad

*(English summary: a self-contained sample-pad web app — 16 neon pads, local audio samples, keyboard shortcuts. One HTML file, no dependencies, French UI.)*

Application web de type « sample pad » : 16 grands pads colorés qui déclenchent chacun un extrait audio, à la manière des contrôleurs DJ.

**➡️ Essayer en ligne : <https://beezital.github.io/sample-pad/>**

## Fonctionnalités

- **16 pads néon** (grille 4 × 4) sur interface sombre
- **Mode Lecture** : un clic (ou une touche) lance le son depuis le début ; un second clic l'arrête et le réinitialise. Les pads peuvent jouer simultanément, avec barre de progression.
- **Mode Config** : chargez un fichier audio local sur chaque pad (« Charger… » / « Effacer »)
- **Raccourcis clavier** : touches `1`–`9`, `0` pour les pads 1 à 10, puis les premières touches de la deuxième rangée pour les pads 11 à 16. Le mappage suit la **position physique** des touches — il fonctionne donc tel quel en AZERTY, QWERTY, QWERTZ… Le pavé numérique est également pris en charge (pads 1 à 10, verrouillage numérique actif).
- **Zoom** réglable de 50 % à 200 %, interface responsive
- **Persistance locale** : les sons sont stockés dans IndexedDB et la configuration dans localStorage — tout est conservé après redémarrage du navigateur ou de l'ordinateur. Aucune donnée ne quitte votre machine.
- **PWA hors ligne** : un service worker met la page en cache — une fois ouverte (ou ajoutée à l'écran d'accueil sur iPad/iPhone), l'application fonctionne sans connexion. Sur iOS, passez par « Ajouter à l'écran d'accueil » et chargez vos sons dans l'application installée : son stockage est distinct de celui de Safari et n'est pas soumis à la purge des 7 jours.

## Utilisation

Aucune installation, aucun build, aucune dépendance : un seul fichier [`index.html`](index.html).

- **En ligne** : ouvrez <https://beezital.github.io/sample-pad/>
- **En local** : ouvrez `index.html` dans votre navigateur, ou servez le dossier :

  ```bash
  python3 -m http.server 8741
  ```

  puis ouvrez <http://localhost:8741>.

> Les échantillons sont stockés **par navigateur et par origine** : la version en ligne et une version locale ont chacune leur propre configuration.

## Navigateurs pris en charge

| Navigateur | Version minimale |
|---|---|
| Chrome / Edge | 111 (mars 2023) |
| Firefox | 126 (mai 2024) |

## Licence

© [Beezital](https://beezital.fr)
