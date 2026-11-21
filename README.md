# DAVEM

Identité visuelle et site vitrine de DAVEM : communication, interprétation, organisation d’événements, logistique, transport et hébergement.

- **Site en ligne (Netlify) :** https://davem-cotonou.netlify.app
- **Site en ligne (GitHub Pages) :** https://iso-doss.github.io/davem/
- **Charte graphique :** https://iso-doss.github.io/davem/charte/

## Contenu du dépôt

| Dossier / fichier | Contenu |
| --- | --- |
| `site/` | Site React (Vite) — voir `site/README.md` |
| `logo/` | Logo v2 en SVG (horizontal, signature, vertical, symbole, sombre, blanc, anthracite) |
| `davem-charte.html` | Charte graphique (source) |
| `ancien-logo.jpg` | Logo précédent, pour comparaison |

Chaque push sur `main` reconstruit et publie le site automatiquement : GitHub Pages via `.github/workflows/pages.yml`, Netlify via `netlify.toml` (projet Netlify `davem-cotonou`, relié au dépôt).
