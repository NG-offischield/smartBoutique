/**
 * 📱 CATALOGUE — ajoutez, modifiez ou supprimez vos téléphones ici.
 *
 * Champs :
 *  - id        identifiant unique utilisé dans l'URL (minuscules, tirets)
 *  - brand     id d'une marque définie dans src/data/brands.js
 *  - variants  [stockage, prix FCFA, ancien prix FCFA (optionnel = promo)]
 *  - colors    [nom, code couleur hexadécimal]
 *  - condition 'neuf' | 'reconditionne'
 *  - stock     'en-stock' | 'sur-commande' | 'epuise'
 *  - badges    'nouveau' | 'best-seller' | 'promo'
 *  - mockup    style de l'illustration : apple-pro | apple | air | trio | square | circle | visor | fold | flip | bar
 *  - image     (optionnel) chemin d'une vraie photo, ex. '/images/iphone-17.webp' placée dans /public/images
 *
 * Les prix sont indicatifs : mettez-les à jour selon vos arrivages.
 */
export default [
  // ───────────── APPLE ─────────────
  {
    id: 'iphone-17-pro-max', brand: 'apple', name: 'iPhone 17 Pro Max', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau', 'best-seller'], featured: true, mockup: 'apple-pro',
    variants: [['256 Go', 1050000], ['512 Go', 1250000], ['1 To', 1450000]],
    colors: [['Orange cosmique', '#E3732D'], ['Bleu intense', '#2B3A55'], ['Argent', '#E3E4E6']],
    specs: { screen: '6,9" Super Retina XDR OLED 120 Hz', chip: 'Apple A19 Pro', ram: 12, camera: '48 + 48 + 48 Mpx', selfie: '18 Mpx', battery: '≈ 5 000 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    rating: 4.9, reviews: 214,
    description: 'Le plus puissant des iPhone : châssis aluminium unibody, triple capteur 48 Mpx avec zoom optique 8x et une autonomie record.'
  },
  {
    id: 'iphone-17-pro', brand: 'apple', name: 'iPhone 17 Pro', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], featured: true, mockup: 'apple-pro',
    variants: [['256 Go', 925000], ['512 Go', 1100000]],
    colors: [['Orange cosmique', '#E3732D'], ['Bleu intense', '#2B3A55'], ['Argent', '#E3E4E6']],
    specs: { screen: '6,3" Super Retina XDR OLED 120 Hz', chip: 'Apple A19 Pro', ram: 12, camera: '48 + 48 + 48 Mpx', selfie: '18 Mpx', battery: '≈ 4 000 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    rating: 4.8, reviews: 163,
    description: 'Toute la puissance Pro dans un format compact, avec un écran ProMotion lumineux et un système photo professionnel.'
  },
  {
    id: 'iphone-air', brand: 'apple', name: 'iPhone Air', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], mockup: 'air',
    variants: [['256 Go', 840000], ['512 Go', 990000]],
    colors: [['Bleu ciel', '#BFD5E8'], ['Or clair', '#EADCC2'], ['Blanc nuage', '#F2F2F0'], ['Noir sidéral', '#1F1F21']],
    specs: { screen: '6,5" Super Retina XDR OLED 120 Hz', chip: 'Apple A19 Pro', ram: 12, camera: '48 Mpx Fusion', selfie: '18 Mpx', battery: '≈ 3 100 mAh', os: 'iOS 26', network: '5G', sim: 'eSIM' },
    rating: 4.6, reviews: 58,
    description: 'L’iPhone le plus fin jamais conçu : 5,6 mm de titane pour une prise en main incroyablement légère.'
  },
  {
    id: 'iphone-17', brand: 'apple', name: 'iPhone 17', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], mockup: 'apple',
    variants: [['256 Go', 650000], ['512 Go', 790000]],
    colors: [['Lavande', '#D9CDEB'], ['Sauge', '#B7C4A8'], ['Bleu brume', '#A9C1D9'], ['Blanc', '#F4F4F2'], ['Noir', '#232325']],
    specs: { screen: '6,3" Super Retina XDR OLED 120 Hz', chip: 'Apple A19', ram: 8, camera: '48 + 48 Mpx', selfie: '18 Mpx', battery: '≈ 3 700 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    rating: 4.8, reviews: 121,
    description: 'Écran ProMotion 120 Hz, double capteur 48 Mpx et la nouvelle caméra frontale Center Stage.'
  },
  {
    id: 'iphone-16', brand: 'apple', name: 'iPhone 16', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: ['promo'], mockup: 'apple',
    variants: [['128 Go', 520000, 575000], ['256 Go', 600000, 660000]],
    colors: [['Outremer', '#7A8FD6'], ['Sarcelle', '#88B5B1'], ['Rose', '#F0BFD3'], ['Blanc', '#F4F4F2'], ['Noir', '#232325']],
    specs: { screen: '6,1" Super Retina XDR OLED', chip: 'Apple A18', ram: 8, camera: '48 + 12 Mpx', selfie: '12 Mpx', battery: '≈ 3 560 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    rating: 4.7, reviews: 302,
    description: 'Bouton Action, commande de l’appareil photo et puce A18 : un excellent rapport qualité-prix chez Apple.'
  },
  {
    id: 'iphone-15', brand: 'apple', name: 'iPhone 15', year: 2023,
    condition: 'reconditionne', stock: 'en-stock', badges: ['best-seller'], mockup: 'apple',
    variants: [['128 Go', 355000], ['256 Go', 410000]],
    colors: [['Bleu', '#C9D6DF'], ['Rose', '#F2D4D7'], ['Vert', '#D0DCC7'], ['Noir', '#35393B']],
    specs: { screen: '6,1" Super Retina XDR OLED', chip: 'Apple A16 Bionic', ram: 6, camera: '48 + 12 Mpx', selfie: '12 Mpx', battery: '≈ 3 350 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    rating: 4.6, reviews: 187,
    description: 'Reconditionné grade A, batterie testée > 85 %. Dynamic Island et port USB-C.'
  },
  {
    id: 'iphone-13', brand: 'apple', name: 'iPhone 13', year: 2021,
    condition: 'reconditionne', stock: 'en-stock', badges: ['promo'], mockup: 'apple',
    variants: [['128 Go', 245000, 270000], ['256 Go', 290000]],
    colors: [['Minuit', '#232A31'], ['Lumière stellaire', '#F1EDE4'], ['Bleu', '#2F4A6B'], ['Rouge', '#BF1E2E']],
    specs: { screen: '6,1" Super Retina XDR OLED', chip: 'Apple A15 Bionic', ram: 4, camera: '12 + 12 Mpx', selfie: '12 Mpx', battery: '≈ 3 240 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    rating: 4.5, reviews: 412,
    description: 'L’iPhone le plus accessible, reconditionné et testé sur 40 points de contrôle.'
  },

  // ───────────── SAMSUNG ─────────────
  {
    id: 'galaxy-s25-ultra', brand: 'samsung', name: 'Galaxy S25 Ultra', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], featured: true, mockup: 'trio',
    variants: [['256 Go', 860000, 950000], ['512 Go', 990000]],
    colors: [['Titane argent', '#C9CCCE'], ['Titane noir', '#2E3033'], ['Titane gris', '#8E9196'], ['Titane bleu', '#5D7186']],
    specs: { screen: '6,9" Dynamic AMOLED 2X 120 Hz', chip: 'Snapdragon 8 Elite for Galaxy', ram: 12, camera: '200 + 50 + 50 + 10 Mpx', selfie: '12 Mpx', battery: '5 000 mAh', os: 'Android 15 · One UI 7', network: '5G', sim: 'Dual SIM + eSIM' },
    rating: 4.9, reviews: 176,
    description: 'Le roi de la photo et de la productivité : capteur 200 Mpx, S Pen intégré et Galaxy AI.'
  },
  {
    id: 'galaxy-s25', brand: 'samsung', name: 'Galaxy S25', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'trio',
    variants: [['128 Go', 560000], ['256 Go', 620000]],
    colors: [['Bleu glacier', '#B9CCE0'], ['Menthe', '#C8E1D3'], ['Marine', '#2A3550'], ['Argent', '#D9DADC']],
    specs: { screen: '6,2" Dynamic AMOLED 2X 120 Hz', chip: 'Snapdragon 8 Elite for Galaxy', ram: 12, camera: '50 + 12 + 10 Mpx', selfie: '12 Mpx', battery: '4 000 mAh', os: 'Android 15 · One UI 7', network: '5G', sim: 'Dual SIM + eSIM' },
    rating: 4.7, reviews: 98,
    description: 'Compact, ultra-puissant et doté de Galaxy AI, pour une prise en main parfaite à une main.'
  },
  {
    id: 'galaxy-z-fold7', brand: 'samsung', name: 'Galaxy Z Fold7', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], featured: true, mockup: 'fold',
    variants: [['256 Go', 1190000], ['512 Go', 1320000]],
    colors: [['Bleu ombre', '#2E3B55'], ['Argent ombre', '#BFC3C8'], ['Noir jet', '#1B1C1E']],
    specs: { screen: '8,0" pliable + 6,5" externe, 120 Hz', chip: 'Snapdragon 8 Elite for Galaxy', ram: 12, camera: '200 + 12 + 10 Mpx', selfie: '10 Mpx', battery: '4 400 mAh', os: 'Android 16 · One UI 8', network: '5G', sim: 'Dual SIM + eSIM' },
    rating: 4.8, reviews: 41,
    description: 'Une tablette dans la poche : le pliable le plus fin et le plus léger de Samsung.'
  },
  {
    id: 'galaxy-z-flip7', brand: 'samsung', name: 'Galaxy Z Flip7', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], mockup: 'flip',
    variants: [['256 Go', 720000], ['512 Go', 820000]],
    colors: [['Bleu ombre', '#33456B'], ['Corail', '#F08C7A'], ['Noir jet', '#1B1C1E']],
    specs: { screen: '6,9" pliable + 4,1" externe', chip: 'Exynos 2500', ram: 12, camera: '50 + 12 Mpx', selfie: '10 Mpx', battery: '4 300 mAh', os: 'Android 16 · One UI 8', network: '5G', sim: 'Dual SIM + eSIM' },
    rating: 4.6, reviews: 37,
    description: 'Le clapet iconique avec un grand écran externe bord à bord.'
  },
  {
    id: 'galaxy-a56', brand: 'samsung', name: 'Galaxy A56 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], mockup: 'trio',
    variants: [['128 Go', 255000], ['256 Go', 290000]],
    colors: [['Graphite', '#3A3B3E'], ['Gris clair', '#D6D7D9'], ['Olive', '#A7AE8C'], ['Rose', '#E8C9CF']],
    specs: { screen: '6,7" Super AMOLED 120 Hz', chip: 'Exynos 1580', ram: 8, camera: '50 + 12 + 5 Mpx', selfie: '12 Mpx', battery: '5 000 mAh', os: 'Android 15 · One UI 7', network: '5G', sim: 'Dual SIM' },
    rating: 4.6, reviews: 154,
    description: 'Le milieu de gamme référence : 6 ans de mises à jour, recharge 45 W et IP67.'
  },
  {
    id: 'galaxy-a36', brand: 'samsung', name: 'Galaxy A36 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'trio',
    variants: [['128 Go', 205000], ['256 Go', 235000]],
    colors: [['Noir', '#2B2C2F'], ['Lavande', '#C9BEE0'], ['Blanc', '#EDEDEF']],
    specs: { screen: '6,7" Super AMOLED 120 Hz', chip: 'Snapdragon 6 Gen 3', ram: 8, camera: '50 + 8 + 5 Mpx', selfie: '12 Mpx', battery: '5 000 mAh', os: 'Android 15 · One UI 7', network: '5G', sim: 'Dual SIM' },
    rating: 4.5, reviews: 89,
    description: 'Écran AMOLED superbe, 5G et résistance IP67 à prix doux.'
  },
  {
    id: 'galaxy-a16', brand: 'samsung', name: 'Galaxy A16', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: ['promo'], mockup: 'trio',
    variants: [['128 Go', 108000, 120000], ['256 Go', 128000]],
    colors: [['Noir', '#2B2C2F'], ['Gris', '#BFC1C4'], ['Vert clair', '#CFE3D1']],
    specs: { screen: '6,7" Super AMOLED 90 Hz', chip: 'MediaTek Helio G99', ram: 4, camera: '50 + 5 + 2 Mpx', selfie: '13 Mpx', battery: '5 000 mAh', os: 'Android 15 · One UI 7', network: '4G', sim: 'Dual SIM' },
    rating: 4.3, reviews: 233,
    description: 'L’entrée de gamme Samsung avec 6 ans de mises à jour Android garanties.'
  },

  // ───────────── XIAOMI ─────────────
  {
    id: 'xiaomi-15', brand: 'xiaomi', name: 'Xiaomi 15', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['256 Go', 545000], ['512 Go', 610000]],
    colors: [['Noir', '#1E1F21'], ['Blanc', '#F2F2F0'], ['Vert', '#8FAE98']],
    specs: { screen: '6,36" AMOLED 120 Hz', chip: 'Snapdragon 8 Elite', ram: 12, camera: '50 + 50 + 60 Mpx Leica', selfie: '32 Mpx', battery: '5 240 mAh', os: 'Android 15 · HyperOS 2', network: '5G', sim: 'Dual SIM' },
    rating: 4.7, reviews: 67,
    description: 'Optiques Leica, Snapdragon 8 Elite et format compact premium.'
  },
  {
    id: 'redmi-note-14-pro-plus', brand: 'xiaomi', name: 'Redmi Note 14 Pro+ 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], featured: true, mockup: 'square',
    variants: [['256 Go', 245000], ['512 Go', 285000]],
    colors: [['Noir minuit', '#1F2024'], ['Violet lavande', '#B9A6D9'], ['Bleu glacier', '#B8D3E6']],
    specs: { screen: '6,67" AMOLED incurvé 120 Hz', chip: 'Snapdragon 7s Gen 3', ram: 12, camera: '200 + 8 + 2 Mpx', selfie: '20 Mpx', battery: '5 110 mAh · 120 W', os: 'Android 14 · HyperOS', network: '5G', sim: 'Dual SIM' },
    rating: 4.6, reviews: 211,
    description: 'Capteur 200 Mpx, charge 120 W en 19 min et protection IP68 : le meilleur Redmi.'
  },
  {
    id: 'redmi-note-14', brand: 'xiaomi', name: 'Redmi Note 14', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['promo'], mockup: 'square',
    variants: [['128 Go', 112000, 125000], ['256 Go', 132000]],
    colors: [['Noir', '#202124'], ['Bleu océan', '#3D6C9E'], ['Vert', '#86A890']],
    specs: { screen: '6,67" AMOLED 120 Hz', chip: 'MediaTek Helio G99-Ultra', ram: 8, camera: '108 + 2 + 2 Mpx', selfie: '20 Mpx', battery: '5 500 mAh', os: 'Android 14 · HyperOS', network: '4G', sim: 'Dual SIM' },
    rating: 4.4, reviews: 276,
    description: 'Écran AMOLED, appareil photo 108 Mpx et grosse batterie pour moins de 130 000 FCFA.'
  },
  {
    id: 'redmi-14c', brand: 'xiaomi', name: 'Redmi 14C', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['128 Go', 72000], ['256 Go', 85000]],
    colors: [['Noir', '#202124'], ['Bleu', '#5779B3'], ['Vert sauge', '#A8BFA6']],
    specs: { screen: '6,88" LCD 120 Hz', chip: 'MediaTek Helio G81-Ultra', ram: 4, camera: '50 Mpx', selfie: '13 Mpx', battery: '5 160 mAh', os: 'Android 14 · HyperOS', network: '4G', sim: 'Dual SIM' },
    rating: 4.2, reviews: 198,
    description: 'Grand écran 120 Hz et autonomie solide pour un petit budget.'
  },

  // ───────────── TECNO ─────────────
  {
    id: 'tecno-camon-40-pro', brand: 'tecno', name: 'Camon 40 Pro 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], featured: true, mockup: 'square',
    variants: [['256 Go', 195000], ['512 Go', 225000]],
    colors: [['Noir galaxie', '#1E2026'], ['Vert émeraude', '#2F6B57'], ['Blanc glacier', '#EEF1F3']],
    specs: { screen: '6,78" AMOLED 144 Hz', chip: 'MediaTek Dimensity 7300', ram: 8, camera: '50 + 50 + 8 Mpx', selfie: '50 Mpx', battery: '5 200 mAh · 45 W', os: 'Android 15 · HiOS 15', network: '5G', sim: 'Dual SIM' },
    rating: 4.5, reviews: 132,
    description: 'Selfie 50 Mpx, écran 144 Hz et IP68/IP69 : le photophone star au Cameroun.'
  },
  {
    id: 'tecno-spark-40-pro', brand: 'tecno', name: 'Spark 40 Pro', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], mockup: 'circle',
    variants: [['128 Go', 98000], ['256 Go', 112000]],
    colors: [['Noir encre', '#1D1E22'], ['Bleu lagon', '#3D8BB5'], ['Titane', '#B8B3AA']],
    specs: { screen: '6,78" AMOLED 144 Hz', chip: 'MediaTek Helio G100', ram: 8, camera: '50 Mpx', selfie: '13 Mpx', battery: '5 200 mAh · 45 W', os: 'Android 15 · HiOS 15', network: '4G', sim: 'Dual SIM' },
    rating: 4.4, reviews: 185,
    description: 'Ultra-fin, écran AMOLED 144 Hz et charge rapide 45 W.'
  },
  {
    id: 'tecno-spark-40', brand: 'tecno', name: 'Spark 40', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['128 Go', 72000], ['256 Go', 82000]],
    colors: [['Noir', '#1D1E22'], ['Bleu ciel', '#9CC4E4'], ['Blanc', '#F1F1EF']],
    specs: { screen: '6,67" LCD 120 Hz', chip: 'MediaTek Helio G81', ram: 4, camera: '50 Mpx', selfie: '8 Mpx', battery: '5 200 mAh', os: 'Android 15 · HiOS 15', network: '4G', sim: 'Dual SIM' },
    rating: 4.2, reviews: 141,
    description: 'Fluide, résistant (IP64) et économique.'
  },
  {
    id: 'tecno-pova-7-5g', brand: 'tecno', name: 'Pova 7 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['128 Go', 125000], ['256 Go', 142000]],
    colors: [['Noir geek', '#17181C'], ['Argent magique', '#C4C7CC'], ['Vert oasis', '#4C8C6F']],
    specs: { screen: '6,78" LCD 120 Hz', chip: 'MediaTek Dimensity 7300 Ultimate', ram: 8, camera: '50 Mpx', selfie: '8 Mpx', battery: '6 000 mAh · 45 W', os: 'Android 15 · HiOS 15', network: '5G', sim: 'Dual SIM' },
    rating: 4.3, reviews: 77,
    description: 'Le gaming endurant : batterie 6 000 mAh, 5G et éclairage LED Delta.'
  },

  // ───────────── INFINIX ─────────────
  {
    id: 'infinix-note-50-pro', brand: 'infinix', name: 'Note 50 Pro', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], featured: true, mockup: 'circle',
    variants: [['256 Go', 155000, 172000]],
    colors: [['Gris titane', '#5B5E63'], ['Violet enchanté', '#8E7BBE'], ['Argent', '#D3D5D8']],
    specs: { screen: '6,78" AMOLED 144 Hz', chip: 'MediaTek Helio G100 Ultimate', ram: 8, camera: '50 + 8 + 2 Mpx', selfie: '32 Mpx', battery: '5 200 mAh · 90 W', os: 'Android 15 · XOS 15', network: '4G', sim: 'Dual SIM' },
    rating: 4.5, reviews: 164,
    description: 'Charge 90 W, recharge sans fil et finitions métal premium.'
  },
  {
    id: 'infinix-hot-60-pro-plus', brand: 'infinix', name: 'Hot 60 Pro+', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], mockup: 'square',
    variants: [['256 Go', 135000]],
    colors: [['Noir', '#1E1F22'], ['Bleu Tahiti', '#3FA0C4'], ['Or titane', '#C9B48A']],
    specs: { screen: '6,78" AMOLED incurvé 144 Hz', chip: 'MediaTek Helio G200', ram: 8, camera: '50 Mpx', selfie: '13 Mpx', battery: '5 160 mAh · 45 W', os: 'Android 15 · XOS 15', network: '4G', sim: 'Dual SIM' },
    rating: 4.4, reviews: 92,
    description: 'Parmi les smartphones les plus fins du monde (5,95 mm) avec écran incurvé.'
  },
  {
    id: 'infinix-hot-60', brand: 'infinix', name: 'Hot 60', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['128 Go', 82000], ['256 Go', 95000]],
    colors: [['Noir', '#1E1F22'], ['Bleu', '#4B7FC1'], ['Vert', '#79A88A']],
    specs: { screen: '6,78" LCD 120 Hz', chip: 'MediaTek Helio G88', ram: 8, camera: '50 Mpx', selfie: '8 Mpx', battery: '5 200 mAh', os: 'Android 15 · XOS 15', network: '4G', sim: 'Dual SIM' },
    rating: 4.2, reviews: 118,
    description: 'Grand écran, 8 Go de RAM et autonomie pour toute la journée.'
  },
  {
    id: 'infinix-zero-40', brand: 'infinix', name: 'Zero 40 5G', year: 2024,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'square',
    variants: [['512 Go', 245000]],
    colors: [['Noir roche', '#1C1D20'], ['Vert violette', '#5C6B5A'], ['Or', '#C8B07E']],
    specs: { screen: '6,78" AMOLED incurvé 144 Hz', chip: 'MediaTek Dimensity 8200 Ultimate', ram: 12, camera: '108 + 50 + 2 Mpx', selfie: '50 Mpx', battery: '5 000 mAh · 45 W', os: 'Android 14 · XOS 14.5', network: '5G', sim: 'Dual SIM' },
    rating: 4.4, reviews: 46,
    description: 'Le vlog en 4K 60 fps à l’avant comme à l’arrière.'
  },

  // ───────────── ITEL ─────────────
  {
    id: 'itel-s25-ultra', brand: 'itel', name: 'S25 Ultra', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], mockup: 'square',
    variants: [['256 Go', 98000]],
    colors: [['Noir', '#1D1E21'], ['Bleu', '#3E6FB0'], ['Titane', '#BDB7AC']],
    specs: { screen: '6,78" AMOLED incurvé 144 Hz', chip: 'Unisoc T620', ram: 8, camera: '50 Mpx', selfie: '32 Mpx', battery: '5 000 mAh', os: 'Android 14', network: '4G', sim: 'Dual SIM' },
    rating: 4.2, reviews: 64,
    description: 'Design ultra-fin et écran AMOLED incurvé à prix itel.'
  },
  {
    id: 'itel-a80', brand: 'itel', name: 'A80', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], mockup: 'circle',
    variants: [['128 Go', 52000]],
    colors: [['Noir', '#1D1E21'], ['Vert', '#7FA58A'], ['Or', '#D2BD8E']],
    specs: { screen: '6,7" LCD 120 Hz', chip: 'Unisoc T603', ram: 4, camera: '50 Mpx', selfie: '8 Mpx', battery: '5 000 mAh', os: 'Android 14 Go', network: '4G', sim: 'Dual SIM' },
    rating: 4.1, reviews: 209,
    description: 'Le smartphone essentiel : grand écran, 50 Mpx et bonne autonomie.'
  },

  // ───────────── GOOGLE ─────────────
  {
    id: 'pixel-10-pro', brand: 'google', name: 'Pixel 10 Pro', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], featured: true, mockup: 'visor',
    variants: [['128 Go', 780000], ['256 Go', 850000]],
    colors: [['Obsidienne', '#1F2022'], ['Porcelaine', '#ECE7DF'], ['Vert sauge', '#A8B5A2'], ['Gris lune', '#9C9FA3']],
    specs: { screen: '6,3" Super Actua LTPO 120 Hz', chip: 'Google Tensor G5', ram: 16, camera: '50 + 48 + 48 Mpx', selfie: '42 Mpx', battery: '≈ 4 870 mAh', os: 'Android 16', network: '5G', sim: 'Nano-SIM + eSIM' },
    rating: 4.7, reviews: 39,
    description: 'Photo computationnelle de référence, zoom 100x Pro Res et 7 ans de mises à jour.'
  },
  {
    id: 'pixel-10', brand: 'google', name: 'Pixel 10', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], mockup: 'visor',
    variants: [['128 Go', 590000], ['256 Go', 650000]],
    colors: [['Obsidienne', '#1F2022'], ['Indigo', '#4D5A9C'], ['Givre', '#DDE5EC'], ['Citron', '#E7E3A0']],
    specs: { screen: '6,3" Actua OLED 120 Hz', chip: 'Google Tensor G5', ram: 12, camera: '48 + 13 + 10,8 Mpx', selfie: '10,5 Mpx', battery: '≈ 4 970 mAh', os: 'Android 16', network: '5G', sim: 'Nano-SIM + eSIM' },
    rating: 4.6, reviews: 33,
    description: 'Le premier Pixel standard avec téléobjectif 5x et Gemini intégré.'
  },
  {
    id: 'pixel-9a', brand: 'google', name: 'Pixel 9a', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['promo'], mockup: 'bar',
    variants: [['128 Go', 330000, 365000], ['256 Go', 380000]],
    colors: [['Obsidienne', '#1F2022'], ['Porcelaine', '#ECE7DF'], ['Iris', '#A8A3D8'], ['Pivoine', '#E5A3B5']],
    specs: { screen: '6,3" Actua pOLED 120 Hz', chip: 'Google Tensor G4', ram: 8, camera: '48 + 13 Mpx', selfie: '13 Mpx', battery: '5 100 mAh', os: 'Android 16', network: '5G', sim: 'Nano-SIM + eSIM' },
    rating: 4.6, reviews: 71,
    description: 'L’expérience Pixel la plus accessible, avec 7 ans de mises à jour.'
  },

  // ───────────── HUAWEI ─────────────
  {
    id: 'huawei-pura-80-pro', brand: 'huawei', name: 'Pura 80 Pro', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], mockup: 'circle',
    variants: [['512 Go', 890000]],
    colors: [['Noir', '#1C1C1E'], ['Blanc', '#F1F0EC'], ['Or', '#CDB98F']],
    specs: { screen: '6,8" OLED LTPO 120 Hz', chip: 'Kirin 9020', ram: 12, camera: '50 + 40 + 48 Mpx', selfie: '13 Mpx', battery: '5 170 mAh · 100 W', os: 'HarmonyOS / EMUI', network: '5G', sim: 'Dual SIM' },
    rating: 4.6, reviews: 24,
    description: 'Ouverture variable et téléobjectif double : la photographie mobile selon Huawei.'
  },
  {
    id: 'huawei-nova-13', brand: 'huawei', name: 'nova 13', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['256 Go', 285000]],
    colors: [['Noir', '#1C1C1E'], ['Blanc', '#F1F0EC'], ['Violet', '#9C86C2']],
    specs: { screen: '6,7" OLED 120 Hz', chip: 'Kirin 8000', ram: 12, camera: '50 + 8 Mpx', selfie: '60 Mpx', battery: '5 000 mAh · 100 W', os: 'EMUI 15', network: '4G', sim: 'Dual SIM' },
    rating: 4.4, reviews: 31,
    description: 'Selfie 60 Mpx et charge ultra-rapide 100 W dans un design élégant.'
  },

  // ───────────── OPPO ─────────────
  {
    id: 'oppo-reno-14', brand: 'oppo', name: 'Reno14 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], mockup: 'square',
    variants: [['256 Go', 345000], ['512 Go', 385000]],
    colors: [['Vert forêt', '#2F5A47'], ['Blanc perle', '#F0EEEA'], ['Lilas', '#C7B7DE']],
    specs: { screen: '6,59" AMOLED 120 Hz', chip: 'MediaTek Dimensity 8350', ram: 12, camera: '50 + 50 + 8 Mpx', selfie: '50 Mpx', battery: '6 000 mAh · 80 W', os: 'Android 15 · ColorOS 15', network: '5G', sim: 'Dual SIM' },
    rating: 4.5, reviews: 52,
    description: 'Portraits IA, téléobjectif 3,5x et grosse batterie dans un châssis IP69.'
  },
  {
    id: 'oppo-a5-pro', brand: 'oppo', name: 'A5 Pro', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['256 Go', 158000]],
    colors: [['Brun moka', '#5B4537'], ['Bleu', '#3F69A6']],
    specs: { screen: '6,67" LCD 120 Hz', chip: 'MediaTek Dimensity 6300', ram: 8, camera: '50 + 2 Mpx', selfie: '8 Mpx', battery: '5 800 mAh · 45 W', os: 'Android 15 · ColorOS 15', network: '5G', sim: 'Dual SIM' },
    rating: 4.3, reviews: 40,
    description: 'Robustesse militaire, étanchéité IP69 et 5G accessible.'
  },

  // ───────────── VIVO ─────────────
  {
    id: 'vivo-v50', brand: 'vivo', name: 'V50 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'apple',
    variants: [['256 Go', 315000], ['512 Go', 355000]],
    colors: [['Bleu étoilé', '#3D4F7D'], ['Rose', '#E8C2CB'], ['Gris titane', '#7F8288']],
    specs: { screen: '6,77" AMOLED incurvé 120 Hz', chip: 'Snapdragon 7 Gen 3', ram: 12, camera: '50 + 50 Mpx Zeiss', selfie: '50 Mpx', battery: '6 000 mAh · 90 W', os: 'Android 15 · Funtouch OS 15', network: '5G', sim: 'Dual SIM' },
    rating: 4.5, reviews: 36,
    description: 'Optiques Zeiss, portrait Aura Light et 6 000 mAh dans un corps fin.'
  },
  {
    id: 'vivo-y29', brand: 'vivo', name: 'Y29', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['128 Go', 98000], ['256 Go', 112000]],
    colors: [['Noir', '#1F2023'], ['Vert', '#6E9F86'], ['Blanc', '#EEF0F1']],
    specs: { screen: '6,68" LCD 120 Hz', chip: 'MediaTek Helio G85', ram: 6, camera: '50 Mpx', selfie: '8 Mpx', battery: '6 500 mAh · 44 W', os: 'Android 14 · Funtouch OS 14', network: '4G', sim: 'Dual SIM' },
    rating: 4.2, reviews: 58,
    description: 'Batterie géante de 6 500 mAh et certification de résistance militaire.'
  },

  // ───────────── REALME ─────────────
  {
    id: 'realme-14-pro-plus', brand: 'realme', name: '14 Pro+ 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['256 Go', 285000], ['512 Go', 325000]],
    colors: [['Blanc perle', '#F3F1EC'], ['Gris titane', '#6E7177']],
    specs: { screen: '6,83" OLED quad-incurvé 120 Hz', chip: 'Snapdragon 7s Gen 3', ram: 12, camera: '50 + 50 + 8 Mpx', selfie: '32 Mpx', battery: '6 000 mAh · 80 W', os: 'Android 15 · realme UI 6', network: '5G', sim: 'Dual SIM' },
    rating: 4.4, reviews: 29,
    description: 'Dos qui change de couleur au froid, périscope 3x et grosse batterie.'
  },
  {
    id: 'realme-c75', brand: 'realme', name: 'C75', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: ['promo'], mockup: 'square',
    variants: [['256 Go', 105000, 118000]],
    colors: [['Or éclair', '#D8BF7A'], ['Noir tempête', '#202226']],
    specs: { screen: '6,72" LCD 90 Hz', chip: 'MediaTek Helio G92 Max', ram: 8, camera: '50 Mpx', selfie: '8 Mpx', battery: '6 000 mAh · 45 W', os: 'Android 14 · realme UI 5', network: '4G', sim: 'Dual SIM' },
    rating: 4.3, reviews: 73,
    description: 'Étanche IP69, résistant aux chocs et autonomie XXL.'
  },

  // ───────────── ONEPLUS ─────────────
  {
    id: 'oneplus-13', brand: 'oneplus', name: 'OnePlus 13', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'circle',
    variants: [['256 Go', 610000], ['512 Go', 690000]],
    colors: [['Noir éclipse', '#1A1B1F'], ['Bleu minuit', '#26324D'], ['Blanc arctique', '#EEF0F2']],
    specs: { screen: '6,82" AMOLED LTPO 120 Hz', chip: 'Snapdragon 8 Elite', ram: 12, camera: '50 + 50 + 50 Mpx Hasselblad', selfie: '32 Mpx', battery: '6 000 mAh · 100 W', os: 'Android 15 · OxygenOS 15', network: '5G', sim: 'Dual SIM' },
    rating: 4.7, reviews: 44,
    description: 'Hasselblad, Snapdragon 8 Elite et charge 100 W : le flagship sans compromis.'
  },

  // ───────────── HONOR ─────────────
  {
    id: 'honor-400', brand: 'honor', name: 'Honor 400 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], mockup: 'square',
    variants: [['256 Go', 330000], ['512 Go', 370000]],
    colors: [['Noir', '#1D1E21'], ['Or désert', '#D4C19C'], ['Gris lune', '#B4B7BC']],
    specs: { screen: '6,55" AMOLED 120 Hz', chip: 'Snapdragon 7 Gen 4', ram: 12, camera: '200 + 12 Mpx', selfie: '50 Mpx', battery: '5 300 mAh · 66 W', os: 'Android 15 · MagicOS 9', network: '5G', sim: 'Dual SIM' },
    rating: 4.5, reviews: 27,
    description: 'Capteur 200 Mpx stabilisé et écran 5 000 nits lisible en plein soleil.'
  },
  {
    id: 'honor-x9c', brand: 'honor', name: 'X9c 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['256 Go', 215000]],
    colors: [['Noir titane', '#2A2B2F'], ['Violet', '#A390C9'], ['Cyan', '#6EBFC9']],
    specs: { screen: '6,78" AMOLED incurvé 120 Hz', chip: 'Snapdragon 6 Gen 1', ram: 12, camera: '108 + 5 Mpx', selfie: '16 Mpx', battery: '6 600 mAh · 66 W', os: 'Android 15 · MagicOS 9', network: '5G', sim: 'Dual SIM' },
    rating: 4.4, reviews: 34,
    description: 'Ultra-résistant aux chutes, batterie 6 600 mAh et 5G.'
  },

  // ───────────── MOTOROLA ─────────────
  {
    id: 'motorola-edge-60', brand: 'motorola', name: 'Edge 60', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['256 Go', 265000]],
    colors: [['Pantone Gibraltar', '#2E5D6B'], ['Pantone Shamrock', '#3D7A55']],
    specs: { screen: '6,67" pOLED quad-incurvé 120 Hz', chip: 'MediaTek Dimensity 7400', ram: 12, camera: '50 + 50 + 10 Mpx', selfie: '50 Mpx', battery: '5 200 mAh · 68 W', os: 'Android 15', network: '5G', sim: 'Dual SIM' },
    rating: 4.4, reviews: 22,
    description: 'Finition cuir végan Pantone, écran incurvé et Android pur.'
  },
  {
    id: 'moto-g85', brand: 'motorola', name: 'Moto G85 5G', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['256 Go', 165000]],
    colors: [['Bleu cobalt', '#2C4E8C'], ['Vert olive', '#6F7A4F'], ['Gris', '#5E6166']],
    specs: { screen: '6,67" pOLED incurvé 120 Hz', chip: 'Snapdragon 6s Gen 3', ram: 12, camera: '50 + 8 Mpx', selfie: '32 Mpx', battery: '5 000 mAh · 30 W', os: 'Android 14', network: '5G', sim: 'Dual SIM' },
    rating: 4.3, reviews: 48,
    description: 'Écran pOLED incurvé et son Dolby Atmos à prix maîtrisé.'
  },

  // ───────────── NOKIA ─────────────
  {
    id: 'nokia-g42', brand: 'nokia', name: 'Nokia G42 5G', year: 2023,
    condition: 'neuf', stock: 'en-stock', badges: ['promo'], mockup: 'bar',
    variants: [['128 Go', 115000, 130000]],
    colors: [['Violet', '#9C88C4'], ['Gris', '#6E7177']],
    specs: { screen: '6,56" LCD 90 Hz', chip: 'Snapdragon 480+', ram: 6, camera: '50 + 2 + 2 Mpx', selfie: '8 Mpx', battery: '5 000 mAh', os: 'Android 14', network: '5G', sim: 'Dual SIM' },
    rating: 4.1, reviews: 36,
    description: 'Réparable soi-même (écran, batterie) et robuste, la promesse Nokia.'
  },

  // ───────────── NOTHING ─────────────
  {
    id: 'nothing-phone-3a', brand: 'nothing', name: 'Phone (3a)', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'bar',
    variants: [['256 Go', 245000]],
    colors: [['Noir', '#1A1A1A'], ['Blanc', '#EDEDED'], ['Bleu', '#5C7FB5']],
    specs: { screen: '6,77" AMOLED 120 Hz', chip: 'Snapdragon 7s Gen 3', ram: 12, camera: '50 + 50 + 8 Mpx', selfie: '32 Mpx', battery: '5 000 mAh · 50 W', os: 'Android 15 · Nothing OS 3', network: '5G', sim: 'Dual SIM' },
    rating: 4.5, reviews: 30,
    description: 'Dos transparent, interface Glyph et téléobjectif 2x : le plus original du marché.'
  },

  // ───────────── SONY ─────────────
  {
    id: 'sony-xperia-1-vii', brand: 'sony', name: 'Xperia 1 VII', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'trio',
    variants: [['256 Go', 890000]],
    colors: [['Noir ardoise', '#26282B'], ['Vert mousse', '#4E5E4B'], ['Violet orchidée', '#8F7BA6']],
    specs: { screen: '6,5" OLED 120 Hz 19,5:9', chip: 'Snapdragon 8 Elite', ram: 12, camera: '48 + 48 + 12 Mpx Zeiss', selfie: '12 Mpx', battery: '5 000 mAh', os: 'Android 15', network: '5G', sim: 'Dual SIM' },
    rating: 4.5, reviews: 15,
    description: 'Prise jack, lecteur microSD et zoom optique continu : pour les créateurs exigeants.'
  }
]
