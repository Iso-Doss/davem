# Site DAVEM

Site vitrine en React (Vite), aux couleurs de la charte graphique v2.
Français et anglais, mode clair et sombre, formulaire de demande en 3 étapes, pages légales.

## Lancer le site en local

```bash
npm install
npm run dev
```

## Créer la version en ligne

```bash
npm run build
```

Le dossier `dist/` est prêt à être déposé chez n'importe quel hébergeur (Netlify, Vercel, OVH…).

## Où modifier quoi

| Fichier | Contenu |
| --- | --- |
| `src/i18n.js` | Tous les textes, en français (`fr`) et en anglais (`en`), y compris les pages légales |
| `src/App.jsx` | En-tête, accueil, pied de page, bouton retour en haut |
| `src/ContactForm.jsx` | Formulaire de demande en 3 étapes |
| `src/Legal.jsx` | Mise en page des pages Confidentialité et Conditions |
| `src/styles.css` | Couleurs et styles (thème clair en haut, thème sombre juste en dessous) |
| `public/charte/` | Charte graphique, ouverte depuis le pied de page |

Adresses des pages légales : `/#/confidentialite` et `/#/conditions`.

## À compléter avant la mise en ligne

- **Coordonnées** : dans `src/i18n.js`, remplacer `+000 00 00 00 00`, `contact@[domaine]` et `[Adresse, ville]` (version FR et EN).
- **Envoi du formulaire** : la fonction `sendRequest` en haut de `src/ContactForm.jsx` n'envoie rien pour l'instant. Un exemple avec Formspree est en commentaire.
- **Pages légales** : remplacer tous les éléments entre [crochets] (raison sociale, siège, immatriculation, hébergeur, pays, ville, e-mail). Ces textes sont des modèles : faites-les relire par un juriste au regard de la loi du pays de DAVEM.
- **Textes des services** : à relire et ajuster.
