<p align="center">
  <img src="public/logo.png" alt="The Smart Boutique" width="420" />
</p>

# The Smart Boutique — site vitrine de smartphones

Site vitrine moderne pour **The Smart Boutique**, boutique de téléphones située **rue Nana Tchakounté, Yaoundé (Cameroun)**.
Toutes les grandes marques (Apple, Samsung, Xiaomi, Tecno, Infinix, itel, Google Pixel, Huawei, Oppo, Vivo, Realme, OnePlus, Honor, Motorola, Nokia, Nothing, Sony), neufs et reconditionnés, avec commande en un clic sur **WhatsApp (+237 6 98 68 67 29)**.

## ✨ Fonctionnalités

| Côté visiteur | Côté technique |
| --- | --- |
| Accueil animé (hero, marques défilantes, catégories, sélection à onglets, avis, FAQ) | Vue 3 + Vite (moteur léger, moins de 80 Ko de JavaScript compressé pour la page d’accueil) |
| Catalogue de **90 téléphones / 17 marques** avec recherche, filtres (marque, budget, état, RAM, stockage, 5G, promo, stock), tri et pagination | Architecture **MVC** (modèles, contrôleurs, vues) |
| Filtres enregistrés dans l’URL (partageables, bouton retour fonctionnel) | Pages chargées à la demande (code-splitting) |
| Fiche produit : choix couleur + stockage, prix dynamique, fiche technique, produits similaires | SEO : balises meta/Open Graph, données structurées Google (magasin + produits), sitemap.xml et robots.txt générés automatiquement |
| **Commande WhatsApp pré-remplie** (modèle, couleur, stockage, prix) | Accessibilité (WCAG) : navigation clavier, lien d’évitement, ARIA, contrastes, `prefers-reduced-motion` |
| Recherche instantanée (touche `/` ou `Ctrl + K`) | Thème clair / sombre mémorisé |
| Favoris et **comparateur** (3 téléphones) mémorisés sur l’appareil | Illustrations vectorielles des téléphones (aucune image lourde, aucun problème de droits) |
| Formulaire de contact → WhatsApp, carte, horaires, appel direct | Tests unitaires (Vitest) |
| 100 % responsive (mobile, tablette, ordinateur), bouton WhatsApp flottant | Aucune clé secrète, aucune base de données : hébergement gratuit sur Vercel |

## 🗂️ Architecture MVC

```
src/
├── config/shop.js          ⚙️  Infos boutique : nom, téléphone, adresse, horaires, réseaux sociaux
├── data/                   📦  Données éditables
│   ├── products.js             catalogue des téléphones
│   ├── brands.js               marques
│   └── content.js              services, avis, FAQ, chiffres clés
├── models/                 🧩  MODÈLES : Product, Brand, formatage des prix
├── services/               🔌  Accès aux données (ProductRepository)
├── controllers/            🎛️  CONTRÔLEURS : catalogue/filtres, favoris, comparateur, contact WhatsApp, thème, SEO
├── views/                  🎨  VUES
│   ├── pages/                  une page par écran (Accueil, Catalogue, Produit, Contact…)
│   ├── components/             éléments réutilisables (carte produit, logo, illustration téléphone…)
│   └── layout/                 en-tête, pied de page, recherche, notifications
├── router/                 🧭  routes du site
└── assets/styles/main.css  🎨  couleurs et design (variables CSS)
```

## ✏️ Modifier le site (sans être développeur)

| Je veux… | Fichier à modifier |
| --- | --- |
| Changer le téléphone, l’adresse, les horaires, ajouter Facebook/Instagram | `src/config/shop.js` |
| Ajouter / modifier / supprimer un téléphone ou un prix | `src/data/products.js` (chaque champ est expliqué en haut du fichier) |
| Ajouter une marque | `src/data/brands.js` |
| Modifier les services, avis clients, FAQ | `src/data/content.js` |
| Utiliser une **vraie photo** pour un téléphone | Placer l’image dans `public/images/` puis ajouter `image: '/images/mon-tel.webp'` au produit |
| Changer les couleurs du site | Variables en haut de `src/assets/styles/main.css` |
| Changer le logo | `public/logo-mark.svg`, `public/logo.png` et `src/views/components/BrandLogo.vue` |

Après modification sur GitHub (même directement depuis le navigateur, bouton ✏️), **Vercel redéploie le site automatiquement** en ~30 secondes.

### Exemple : ajouter un téléphone

```js
{
  id: 'galaxy-a17', brand: 'samsung', name: 'Galaxy A17 5G', year: 2025,
  condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], mockup: 'trio',
  variants: [['128 Go', 165000], ['256 Go', 185000, 199000]],   // [stockage, prix, ancien prix si promo]
  colors: [['Noir', '#1F2023'], ['Blanc', '#F2F2F0']],
  specs: { screen: '6,7" Super AMOLED 120 Hz', chip: 'Exynos 1380', ram: 8, camera: '50 + 8 + 2 Mpx', selfie: '13 Mpx', battery: '5 000 mAh', os: 'Android 15', network: '5G', sim: 'Dual SIM' },
  rating: 4.5, reviews: 12,
  description: 'Texte de présentation du téléphone.'
},
```

## 🚀 Lancer en local

```bash
npm install
npm run dev       # http://localhost:5173
npm test          # tests unitaires
npm run build     # version de production dans dist/
```

## ☁️ Déploiement sur Vercel (gratuit, 2 minutes)

1. Aller sur **https://vercel.com/new** et se connecter avec GitHub.
2. Importer le dépôt **`smartBoutique`**.
3. Laisser les réglages détectés (Framework : *Vite*, Build : `npm run build`, Output : `dist`) → **Deploy**.
4. Dans *Settings → Domains*, choisir le nom de domaine : **`the-smart-boutique.vercel.app`** (ou un domaine personnel, ex. `thesmartboutique.cm`).
5. Si le domaine final est différent, ajouter la variable d’environnement `VITE_SITE_URL` (ex. `https://thesmartboutique.cm`) dans *Settings → Environment Variables*, puis redéployer (utile pour le SEO et les aperçus de partage).

Le fichier `vercel.json` gère déjà les routes de l’application, le cache des fichiers et les en-têtes de sécurité.

## 🎨 Identité visuelle

| Fichier | Usage |
| --- | --- |
| `public/logo.png` / `public/logo.svg` | Logo complet, fond clair |
| `public/logo-white.png` / `public/logo-white.svg` | Logo complet, fond sombre |
| `public/logo-mark.svg`, `public/icon-512.png` | Icône seule (réseaux sociaux, WhatsApp Business) |
| `public/og-image.png` | Image d’aperçu lors du partage du lien (1200×630) |

Le logo associe un **smartphone** et un **sac de boutique** formant un « S », avec une étincelle dorée pour le côté *smart*. Dégradé indigo → cyan.

## 💼 Fiche portfolio

> **The Smart Boutique — Site vitrine e-commerce (2026)**
> Site vitrine responsive pour une boutique de smartphones à Yaoundé : catalogue de 90 modèles / 17 marques avec recherche instantanée, filtres combinables synchronisés à l’URL, comparateur, favoris, thème sombre et commande via WhatsApp pré-remplie.
> **Stack :** Vue 3, Vite, Vue Router, architecture MVC, CSS natif (design system à variables), Vitest, déploiement Vercel.
> **Points forts :** accessibilité WCAG, SEO (données structurées, sitemap), illustrations SVG générées dynamiquement, aucun backend nécessaire.

---
© The Smart Boutique — Rue Nana Tchakounté, Yaoundé, Cameroun — +237 6 98 68 67 29
