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
    description: 'Le plus puissant des iPhone : châssis aluminium unibody, triple capteur 48 Mpx avec zoom optique 8x et une autonomie record.'
  },
  {
    id: 'iphone-17-pro', brand: 'apple', name: 'iPhone 17 Pro', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], featured: true, mockup: 'apple-pro',
    variants: [['256 Go', 925000], ['512 Go', 1100000]],
    colors: [['Orange cosmique', '#E3732D'], ['Bleu intense', '#2B3A55'], ['Argent', '#E3E4E6']],
    specs: { screen: '6,3" Super Retina XDR OLED 120 Hz', chip: 'Apple A19 Pro', ram: 12, camera: '48 + 48 + 48 Mpx', selfie: '18 Mpx', battery: '≈ 4 000 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'Toute la puissance Pro dans un format compact, avec un écran ProMotion lumineux et un système photo professionnel.'
  },
  {
    id: 'iphone-air', brand: 'apple', name: 'iPhone Air', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], mockup: 'air',
    variants: [['256 Go', 840000], ['512 Go', 990000]],
    colors: [['Bleu ciel', '#BFD5E8'], ['Or clair', '#EADCC2'], ['Blanc nuage', '#F2F2F0'], ['Noir sidéral', '#1F1F21']],
    specs: { screen: '6,5" Super Retina XDR OLED 120 Hz', chip: 'Apple A19 Pro', ram: 12, camera: '48 Mpx Fusion', selfie: '18 Mpx', battery: '≈ 3 100 mAh', os: 'iOS 26', network: '5G', sim: 'eSIM' },
    description: 'L’iPhone le plus fin jamais conçu : 5,6 mm de titane pour une prise en main incroyablement légère.'
  },
  {
    id: 'iphone-17', brand: 'apple', name: 'iPhone 17', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], mockup: 'apple',
    variants: [['256 Go', 650000], ['512 Go', 790000]],
    colors: [['Lavande', '#D9CDEB'], ['Sauge', '#B7C4A8'], ['Bleu brume', '#A9C1D9'], ['Blanc', '#F4F4F2'], ['Noir', '#232325']],
    specs: { screen: '6,3" Super Retina XDR OLED 120 Hz', chip: 'Apple A19', ram: 8, camera: '48 + 48 Mpx', selfie: '18 Mpx', battery: '≈ 3 700 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'Écran ProMotion 120 Hz, double capteur 48 Mpx et la nouvelle caméra frontale Center Stage.'
  },
  {
    id: 'iphone-16', brand: 'apple', name: 'iPhone 16', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: ['promo'], mockup: 'apple',
    variants: [['128 Go', 520000, 575000], ['256 Go', 600000, 660000]],
    colors: [['Outremer', '#7A8FD6'], ['Sarcelle', '#88B5B1'], ['Rose', '#F0BFD3'], ['Blanc', '#F4F4F2'], ['Noir', '#232325']],
    specs: { screen: '6,1" Super Retina XDR OLED', chip: 'Apple A18', ram: 8, camera: '48 + 12 Mpx', selfie: '12 Mpx', battery: '≈ 3 560 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'Bouton Action, commande de l’appareil photo et puce A18 : un excellent rapport qualité-prix chez Apple.'
  },
  {
    id: 'iphone-15', brand: 'apple', name: 'iPhone 15', year: 2023,
    condition: 'reconditionne', stock: 'en-stock', badges: ['best-seller'], mockup: 'apple',
    variants: [['128 Go', 355000], ['256 Go', 410000]],
    colors: [['Bleu', '#C9D6DF'], ['Rose', '#F2D4D7'], ['Vert', '#D0DCC7'], ['Noir', '#35393B']],
    specs: { screen: '6,1" Super Retina XDR OLED', chip: 'Apple A16 Bionic', ram: 6, camera: '48 + 12 Mpx', selfie: '12 Mpx', battery: '≈ 3 350 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'Reconditionné grade A, batterie testée > 85 %. Dynamic Island et port USB-C.'
  },
  {
    id: 'iphone-13', brand: 'apple', name: 'iPhone 13', year: 2021,
    condition: 'reconditionne', stock: 'en-stock', badges: ['promo'], mockup: 'apple',
    variants: [['128 Go', 245000, 270000], ['256 Go', 290000]],
    colors: [['Minuit', '#232A31'], ['Lumière stellaire', '#F1EDE4'], ['Bleu', '#2F4A6B'], ['Rouge', '#BF1E2E']],
    specs: { screen: '6,1" Super Retina XDR OLED', chip: 'Apple A15 Bionic', ram: 4, camera: '12 + 12 Mpx', selfie: '12 Mpx', battery: '≈ 3 240 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'L’iPhone le plus accessible, reconditionné et testé sur 40 points de contrôle.'
  },

  // ───────────── SAMSUNG ─────────────
  {
    id: 'galaxy-s25-ultra', brand: 'samsung', name: 'Galaxy S25 Ultra', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], featured: true, mockup: 'trio',
    variants: [['256 Go', 860000, 950000], ['512 Go', 990000]],
    colors: [['Titane argent', '#C9CCCE'], ['Titane noir', '#2E3033'], ['Titane gris', '#8E9196'], ['Titane bleu', '#5D7186']],
    specs: { screen: '6,9" Dynamic AMOLED 2X 120 Hz', chip: 'Snapdragon 8 Elite for Galaxy', ram: 12, camera: '200 + 50 + 50 + 10 Mpx', selfie: '12 Mpx', battery: '5 000 mAh', os: 'Android 15 · One UI 7', network: '5G', sim: 'Dual SIM + eSIM' },
    description: 'Le roi de la photo et de la productivité : capteur 200 Mpx, S Pen intégré et Galaxy AI.'
  },
  {
    id: 'galaxy-s25', brand: 'samsung', name: 'Galaxy S25', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'trio',
    variants: [['128 Go', 560000], ['256 Go', 620000]],
    colors: [['Bleu glacier', '#B9CCE0'], ['Menthe', '#C8E1D3'], ['Marine', '#2A3550'], ['Argent', '#D9DADC']],
    specs: { screen: '6,2" Dynamic AMOLED 2X 120 Hz', chip: 'Snapdragon 8 Elite for Galaxy', ram: 12, camera: '50 + 12 + 10 Mpx', selfie: '12 Mpx', battery: '4 000 mAh', os: 'Android 15 · One UI 7', network: '5G', sim: 'Dual SIM + eSIM' },
    description: 'Compact, ultra-puissant et doté de Galaxy AI, pour une prise en main parfaite à une main.'
  },
  {
    id: 'galaxy-z-fold7', brand: 'samsung', name: 'Galaxy Z Fold7', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], featured: true, mockup: 'fold',
    variants: [['256 Go', 1190000], ['512 Go', 1320000]],
    colors: [['Bleu ombre', '#2E3B55'], ['Argent ombre', '#BFC3C8'], ['Noir jet', '#1B1C1E']],
    specs: { screen: '8,0" pliable + 6,5" externe, 120 Hz', chip: 'Snapdragon 8 Elite for Galaxy', ram: 12, camera: '200 + 12 + 10 Mpx', selfie: '10 Mpx', battery: '4 400 mAh', os: 'Android 16 · One UI 8', network: '5G', sim: 'Dual SIM + eSIM' },
    description: 'Une tablette dans la poche : le pliable le plus fin et le plus léger de Samsung.'
  },
  {
    id: 'galaxy-z-flip7', brand: 'samsung', name: 'Galaxy Z Flip7', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], mockup: 'flip',
    variants: [['256 Go', 720000], ['512 Go', 820000]],
    colors: [['Bleu ombre', '#33456B'], ['Corail', '#F08C7A'], ['Noir jet', '#1B1C1E']],
    specs: { screen: '6,9" pliable + 4,1" externe', chip: 'Exynos 2500', ram: 12, camera: '50 + 12 Mpx', selfie: '10 Mpx', battery: '4 300 mAh', os: 'Android 16 · One UI 8', network: '5G', sim: 'Dual SIM + eSIM' },
    description: 'Le clapet iconique avec un grand écran externe bord à bord.'
  },
  {
    id: 'galaxy-a56', brand: 'samsung', name: 'Galaxy A56 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], mockup: 'trio',
    variants: [['128 Go', 255000], ['256 Go', 290000]],
    colors: [['Graphite', '#3A3B3E'], ['Gris clair', '#D6D7D9'], ['Olive', '#A7AE8C'], ['Rose', '#E8C9CF']],
    specs: { screen: '6,7" Super AMOLED 120 Hz', chip: 'Exynos 1580', ram: 8, camera: '50 + 12 + 5 Mpx', selfie: '12 Mpx', battery: '5 000 mAh', os: 'Android 15 · One UI 7', network: '5G', sim: 'Dual SIM' },
    description: 'Le milieu de gamme référence : 6 ans de mises à jour, recharge 45 W et IP67.'
  },
  {
    id: 'galaxy-a36', brand: 'samsung', name: 'Galaxy A36 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'trio',
    variants: [['128 Go', 205000], ['256 Go', 235000]],
    colors: [['Noir', '#2B2C2F'], ['Lavande', '#C9BEE0'], ['Blanc', '#EDEDEF']],
    specs: { screen: '6,7" Super AMOLED 120 Hz', chip: 'Snapdragon 6 Gen 3', ram: 8, camera: '50 + 8 + 5 Mpx', selfie: '12 Mpx', battery: '5 000 mAh', os: 'Android 15 · One UI 7', network: '5G', sim: 'Dual SIM' },
    description: 'Écran AMOLED superbe, 5G et résistance IP67 à prix doux.'
  },
  {
    id: 'galaxy-a16', brand: 'samsung', name: 'Galaxy A16', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: ['promo'], mockup: 'trio',
    variants: [['128 Go', 108000, 120000], ['256 Go', 128000]],
    colors: [['Noir', '#2B2C2F'], ['Gris', '#BFC1C4'], ['Vert clair', '#CFE3D1']],
    specs: { screen: '6,7" Super AMOLED 90 Hz', chip: 'MediaTek Helio G99', ram: 4, camera: '50 + 5 + 2 Mpx', selfie: '13 Mpx', battery: '5 000 mAh', os: 'Android 15 · One UI 7', network: '4G', sim: 'Dual SIM' },
    description: 'L’entrée de gamme Samsung avec 6 ans de mises à jour Android garanties.'
  },

  // ───────────── XIAOMI ─────────────
  {
    id: 'xiaomi-15', brand: 'xiaomi', name: 'Xiaomi 15', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['256 Go', 545000], ['512 Go', 610000]],
    colors: [['Noir', '#1E1F21'], ['Blanc', '#F2F2F0'], ['Vert', '#8FAE98']],
    specs: { screen: '6,36" AMOLED 120 Hz', chip: 'Snapdragon 8 Elite', ram: 12, camera: '50 + 50 + 60 Mpx Leica', selfie: '32 Mpx', battery: '5 240 mAh', os: 'Android 15 · HyperOS 2', network: '5G', sim: 'Dual SIM' },
    description: 'Optiques Leica, Snapdragon 8 Elite et format compact premium.'
  },
  {
    id: 'redmi-note-14-pro-plus', brand: 'xiaomi', name: 'Redmi Note 14 Pro+ 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], featured: true, mockup: 'square',
    variants: [['256 Go', 245000], ['512 Go', 285000]],
    colors: [['Noir minuit', '#1F2024'], ['Violet lavande', '#B9A6D9'], ['Bleu glacier', '#B8D3E6']],
    specs: { screen: '6,67" AMOLED incurvé 120 Hz', chip: 'Snapdragon 7s Gen 3', ram: 12, camera: '200 + 8 + 2 Mpx', selfie: '20 Mpx', battery: '5 110 mAh · 120 W', os: 'Android 14 · HyperOS', network: '5G', sim: 'Dual SIM' },
    description: 'Capteur 200 Mpx, charge 120 W en 19 min et protection IP68 : le meilleur Redmi.'
  },
  {
    id: 'redmi-note-14', brand: 'xiaomi', name: 'Redmi Note 14', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['promo'], mockup: 'square',
    variants: [['128 Go', 112000, 125000], ['256 Go', 132000]],
    colors: [['Noir', '#202124'], ['Bleu océan', '#3D6C9E'], ['Vert', '#86A890']],
    specs: { screen: '6,67" AMOLED 120 Hz', chip: 'MediaTek Helio G99-Ultra', ram: 8, camera: '108 + 2 + 2 Mpx', selfie: '20 Mpx', battery: '5 500 mAh', os: 'Android 14 · HyperOS', network: '4G', sim: 'Dual SIM' },
    description: 'Écran AMOLED, appareil photo 108 Mpx et grosse batterie pour moins de 130 000 FCFA.'
  },
  {
    id: 'redmi-14c', brand: 'xiaomi', name: 'Redmi 14C', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['128 Go', 72000], ['256 Go', 85000]],
    colors: [['Noir', '#202124'], ['Bleu', '#5779B3'], ['Vert sauge', '#A8BFA6']],
    specs: { screen: '6,88" LCD 120 Hz', chip: 'MediaTek Helio G81-Ultra', ram: 4, camera: '50 Mpx', selfie: '13 Mpx', battery: '5 160 mAh', os: 'Android 14 · HyperOS', network: '4G', sim: 'Dual SIM' },
    description: 'Grand écran 120 Hz et autonomie solide pour un petit budget.'
  },

  // ───────────── TECNO ─────────────
  {
    id: 'tecno-camon-40-pro', brand: 'tecno', name: 'Camon 40 Pro 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], featured: true, mockup: 'square',
    variants: [['256 Go', 195000], ['512 Go', 225000]],
    colors: [['Noir galaxie', '#1E2026'], ['Vert émeraude', '#2F6B57'], ['Blanc glacier', '#EEF1F3']],
    specs: { screen: '6,78" AMOLED 144 Hz', chip: 'MediaTek Dimensity 7300', ram: 8, camera: '50 + 50 + 8 Mpx', selfie: '50 Mpx', battery: '5 200 mAh · 45 W', os: 'Android 15 · HiOS 15', network: '5G', sim: 'Dual SIM' },
    description: 'Selfie 50 Mpx, écran 144 Hz et IP68/IP69 : le photophone star au Cameroun.'
  },
  {
    id: 'tecno-spark-40-pro', brand: 'tecno', name: 'Spark 40 Pro', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], mockup: 'circle',
    variants: [['128 Go', 98000], ['256 Go', 112000]],
    colors: [['Noir encre', '#1D1E22'], ['Bleu lagon', '#3D8BB5'], ['Titane', '#B8B3AA']],
    specs: { screen: '6,78" AMOLED 144 Hz', chip: 'MediaTek Helio G100', ram: 8, camera: '50 Mpx', selfie: '13 Mpx', battery: '5 200 mAh · 45 W', os: 'Android 15 · HiOS 15', network: '4G', sim: 'Dual SIM' },
    description: 'Ultra-fin, écran AMOLED 144 Hz et charge rapide 45 W.'
  },
  {
    id: 'tecno-spark-40', brand: 'tecno', name: 'Spark 40', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['128 Go', 72000], ['256 Go', 82000]],
    colors: [['Noir', '#1D1E22'], ['Bleu ciel', '#9CC4E4'], ['Blanc', '#F1F1EF']],
    specs: { screen: '6,67" LCD 120 Hz', chip: 'MediaTek Helio G81', ram: 4, camera: '50 Mpx', selfie: '8 Mpx', battery: '5 200 mAh', os: 'Android 15 · HiOS 15', network: '4G', sim: 'Dual SIM' },
    description: 'Fluide, résistant (IP64) et économique.'
  },
  {
    id: 'tecno-pova-7-5g', brand: 'tecno', name: 'Pova 7 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['128 Go', 125000], ['256 Go', 142000]],
    colors: [['Noir geek', '#17181C'], ['Argent magique', '#C4C7CC'], ['Vert oasis', '#4C8C6F']],
    specs: { screen: '6,78" LCD 120 Hz', chip: 'MediaTek Dimensity 7300 Ultimate', ram: 8, camera: '50 Mpx', selfie: '8 Mpx', battery: '6 000 mAh · 45 W', os: 'Android 15 · HiOS 15', network: '5G', sim: 'Dual SIM' },
    description: 'Le gaming endurant : batterie 6 000 mAh, 5G et éclairage LED Delta.'
  },

  // ───────────── INFINIX ─────────────
  {
    id: 'infinix-note-50-pro', brand: 'infinix', name: 'Note 50 Pro', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], featured: true, mockup: 'circle',
    variants: [['256 Go', 155000, 172000]],
    colors: [['Gris titane', '#5B5E63'], ['Violet enchanté', '#8E7BBE'], ['Argent', '#D3D5D8']],
    specs: { screen: '6,78" AMOLED 144 Hz', chip: 'MediaTek Helio G100 Ultimate', ram: 8, camera: '50 + 8 + 2 Mpx', selfie: '32 Mpx', battery: '5 200 mAh · 90 W', os: 'Android 15 · XOS 15', network: '4G', sim: 'Dual SIM' },
    description: 'Charge 90 W, recharge sans fil et finitions métal premium.'
  },
  {
    id: 'infinix-hot-60-pro-plus', brand: 'infinix', name: 'Hot 60 Pro+', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], mockup: 'square',
    variants: [['256 Go', 135000]],
    colors: [['Noir', '#1E1F22'], ['Bleu Tahiti', '#3FA0C4'], ['Or titane', '#C9B48A']],
    specs: { screen: '6,78" AMOLED incurvé 144 Hz', chip: 'MediaTek Helio G200', ram: 8, camera: '50 Mpx', selfie: '13 Mpx', battery: '5 160 mAh · 45 W', os: 'Android 15 · XOS 15', network: '4G', sim: 'Dual SIM' },
    description: 'Parmi les smartphones les plus fins du monde (5,95 mm) avec écran incurvé.'
  },
  {
    id: 'infinix-hot-60', brand: 'infinix', name: 'Hot 60', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['128 Go', 82000], ['256 Go', 95000]],
    colors: [['Noir', '#1E1F22'], ['Bleu', '#4B7FC1'], ['Vert', '#79A88A']],
    specs: { screen: '6,78" LCD 120 Hz', chip: 'MediaTek Helio G88', ram: 8, camera: '50 Mpx', selfie: '8 Mpx', battery: '5 200 mAh', os: 'Android 15 · XOS 15', network: '4G', sim: 'Dual SIM' },
    description: 'Grand écran, 8 Go de RAM et autonomie pour toute la journée.'
  },
  {
    id: 'infinix-zero-40', brand: 'infinix', name: 'Zero 40 5G', year: 2024,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'square',
    variants: [['512 Go', 245000]],
    colors: [['Noir roche', '#1C1D20'], ['Vert violette', '#5C6B5A'], ['Or', '#C8B07E']],
    specs: { screen: '6,78" AMOLED incurvé 144 Hz', chip: 'MediaTek Dimensity 8200 Ultimate', ram: 12, camera: '108 + 50 + 2 Mpx', selfie: '50 Mpx', battery: '5 000 mAh · 45 W', os: 'Android 14 · XOS 14.5', network: '5G', sim: 'Dual SIM' },
    description: 'Le vlog en 4K 60 fps à l’avant comme à l’arrière.'
  },

  // ───────────── ITEL ─────────────
  {
    id: 'itel-s25-ultra', brand: 'itel', name: 'S25 Ultra', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], mockup: 'square',
    variants: [['256 Go', 98000]],
    colors: [['Noir', '#1D1E21'], ['Bleu', '#3E6FB0'], ['Titane', '#BDB7AC']],
    specs: { screen: '6,78" AMOLED incurvé 144 Hz', chip: 'Unisoc T620', ram: 8, camera: '50 Mpx', selfie: '32 Mpx', battery: '5 000 mAh', os: 'Android 14', network: '4G', sim: 'Dual SIM' },
    description: 'Design ultra-fin et écran AMOLED incurvé à prix itel.'
  },
  {
    id: 'itel-a80', brand: 'itel', name: 'A80', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], mockup: 'circle',
    variants: [['128 Go', 52000]],
    colors: [['Noir', '#1D1E21'], ['Vert', '#7FA58A'], ['Or', '#D2BD8E']],
    specs: { screen: '6,7" LCD 120 Hz', chip: 'Unisoc T603', ram: 4, camera: '50 Mpx', selfie: '8 Mpx', battery: '5 000 mAh', os: 'Android 14 Go', network: '4G', sim: 'Dual SIM' },
    description: 'Le smartphone essentiel : grand écran, 50 Mpx et bonne autonomie.'
  },

  // ───────────── GOOGLE ─────────────
  {
    id: 'pixel-10-pro', brand: 'google', name: 'Pixel 10 Pro', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], featured: true, mockup: 'visor',
    variants: [['128 Go', 780000], ['256 Go', 850000]],
    colors: [['Obsidienne', '#1F2022'], ['Porcelaine', '#ECE7DF'], ['Vert sauge', '#A8B5A2'], ['Gris lune', '#9C9FA3']],
    specs: { screen: '6,3" Super Actua LTPO 120 Hz', chip: 'Google Tensor G5', ram: 16, camera: '50 + 48 + 48 Mpx', selfie: '42 Mpx', battery: '≈ 4 870 mAh', os: 'Android 16', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'Photo computationnelle de référence, zoom 100x Pro Res et 7 ans de mises à jour.'
  },
  {
    id: 'pixel-10', brand: 'google', name: 'Pixel 10', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], mockup: 'visor',
    variants: [['128 Go', 590000], ['256 Go', 650000]],
    colors: [['Obsidienne', '#1F2022'], ['Indigo', '#4D5A9C'], ['Givre', '#DDE5EC'], ['Citron', '#E7E3A0']],
    specs: { screen: '6,3" Actua OLED 120 Hz', chip: 'Google Tensor G5', ram: 12, camera: '48 + 13 + 10,8 Mpx', selfie: '10,5 Mpx', battery: '≈ 4 970 mAh', os: 'Android 16', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'Le premier Pixel standard avec téléobjectif 5x et Gemini intégré.'
  },
  {
    id: 'pixel-9a', brand: 'google', name: 'Pixel 9a', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['promo'], mockup: 'bar',
    variants: [['128 Go', 330000, 365000], ['256 Go', 380000]],
    colors: [['Obsidienne', '#1F2022'], ['Porcelaine', '#ECE7DF'], ['Iris', '#A8A3D8'], ['Pivoine', '#E5A3B5']],
    specs: { screen: '6,3" Actua pOLED 120 Hz', chip: 'Google Tensor G4', ram: 8, camera: '48 + 13 Mpx', selfie: '13 Mpx', battery: '5 100 mAh', os: 'Android 16', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'L’expérience Pixel la plus accessible, avec 7 ans de mises à jour.'
  },

  // ───────────── HUAWEI ─────────────
  {
    id: 'huawei-pura-80-pro', brand: 'huawei', name: 'Pura 80 Pro', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], mockup: 'circle',
    variants: [['512 Go', 890000]],
    colors: [['Noir', '#1C1C1E'], ['Blanc', '#F1F0EC'], ['Or', '#CDB98F']],
    specs: { screen: '6,8" OLED LTPO 120 Hz', chip: 'Kirin 9020', ram: 12, camera: '50 + 40 + 48 Mpx', selfie: '13 Mpx', battery: '5 170 mAh · 100 W', os: 'HarmonyOS / EMUI', network: '5G', sim: 'Dual SIM' },
    description: 'Ouverture variable et téléobjectif double : la photographie mobile selon Huawei.'
  },
  {
    id: 'huawei-nova-13', brand: 'huawei', name: 'nova 13', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['256 Go', 285000]],
    colors: [['Noir', '#1C1C1E'], ['Blanc', '#F1F0EC'], ['Violet', '#9C86C2']],
    specs: { screen: '6,7" OLED 120 Hz', chip: 'Kirin 8000', ram: 12, camera: '50 + 8 Mpx', selfie: '60 Mpx', battery: '5 000 mAh · 100 W', os: 'EMUI 15', network: '4G', sim: 'Dual SIM' },
    description: 'Selfie 60 Mpx et charge ultra-rapide 100 W dans un design élégant.'
  },

  // ───────────── OPPO ─────────────
  {
    id: 'oppo-reno-14', brand: 'oppo', name: 'Reno14 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], mockup: 'square',
    variants: [['256 Go', 345000], ['512 Go', 385000]],
    colors: [['Vert forêt', '#2F5A47'], ['Blanc perle', '#F0EEEA'], ['Lilas', '#C7B7DE']],
    specs: { screen: '6,59" AMOLED 120 Hz', chip: 'MediaTek Dimensity 8350', ram: 12, camera: '50 + 50 + 8 Mpx', selfie: '50 Mpx', battery: '6 000 mAh · 80 W', os: 'Android 15 · ColorOS 15', network: '5G', sim: 'Dual SIM' },
    description: 'Portraits IA, téléobjectif 3,5x et grosse batterie dans un châssis IP69.'
  },
  {
    id: 'oppo-a5-pro', brand: 'oppo', name: 'A5 Pro', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['256 Go', 158000]],
    colors: [['Brun moka', '#5B4537'], ['Bleu', '#3F69A6']],
    specs: { screen: '6,67" LCD 120 Hz', chip: 'MediaTek Dimensity 6300', ram: 8, camera: '50 + 2 Mpx', selfie: '8 Mpx', battery: '5 800 mAh · 45 W', os: 'Android 15 · ColorOS 15', network: '5G', sim: 'Dual SIM' },
    description: 'Robustesse militaire, étanchéité IP69 et 5G accessible.'
  },

  // ───────────── VIVO ─────────────
  {
    id: 'vivo-v50', brand: 'vivo', name: 'V50 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'apple',
    variants: [['256 Go', 315000], ['512 Go', 355000]],
    colors: [['Bleu étoilé', '#3D4F7D'], ['Rose', '#E8C2CB'], ['Gris titane', '#7F8288']],
    specs: { screen: '6,77" AMOLED incurvé 120 Hz', chip: 'Snapdragon 7 Gen 3', ram: 12, camera: '50 + 50 Mpx Zeiss', selfie: '50 Mpx', battery: '6 000 mAh · 90 W', os: 'Android 15 · Funtouch OS 15', network: '5G', sim: 'Dual SIM' },
    description: 'Optiques Zeiss, portrait Aura Light et 6 000 mAh dans un corps fin.'
  },
  {
    id: 'vivo-y29', brand: 'vivo', name: 'Y29', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['128 Go', 98000], ['256 Go', 112000]],
    colors: [['Noir', '#1F2023'], ['Vert', '#6E9F86'], ['Blanc', '#EEF0F1']],
    specs: { screen: '6,68" LCD 120 Hz', chip: 'MediaTek Helio G85', ram: 6, camera: '50 Mpx', selfie: '8 Mpx', battery: '6 500 mAh · 44 W', os: 'Android 14 · Funtouch OS 14', network: '4G', sim: 'Dual SIM' },
    description: 'Batterie géante de 6 500 mAh et certification de résistance militaire.'
  },

  // ───────────── REALME ─────────────
  {
    id: 'realme-14-pro-plus', brand: 'realme', name: '14 Pro+ 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['256 Go', 285000], ['512 Go', 325000]],
    colors: [['Blanc perle', '#F3F1EC'], ['Gris titane', '#6E7177']],
    specs: { screen: '6,83" OLED quad-incurvé 120 Hz', chip: 'Snapdragon 7s Gen 3', ram: 12, camera: '50 + 50 + 8 Mpx', selfie: '32 Mpx', battery: '6 000 mAh · 80 W', os: 'Android 15 · realme UI 6', network: '5G', sim: 'Dual SIM' },
    description: 'Dos qui change de couleur au froid, périscope 3x et grosse batterie.'
  },
  {
    id: 'realme-c75', brand: 'realme', name: 'C75', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: ['promo'], mockup: 'square',
    variants: [['256 Go', 105000, 118000]],
    colors: [['Or éclair', '#D8BF7A'], ['Noir tempête', '#202226']],
    specs: { screen: '6,72" LCD 90 Hz', chip: 'MediaTek Helio G92 Max', ram: 8, camera: '50 Mpx', selfie: '8 Mpx', battery: '6 000 mAh · 45 W', os: 'Android 14 · realme UI 5', network: '4G', sim: 'Dual SIM' },
    description: 'Étanche IP69, résistant aux chocs et autonomie XXL.'
  },

  // ───────────── ONEPLUS ─────────────
  {
    id: 'oneplus-13', brand: 'oneplus', name: 'OnePlus 13', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'circle',
    variants: [['256 Go', 610000], ['512 Go', 690000]],
    colors: [['Noir éclipse', '#1A1B1F'], ['Bleu minuit', '#26324D'], ['Blanc arctique', '#EEF0F2']],
    specs: { screen: '6,82" AMOLED LTPO 120 Hz', chip: 'Snapdragon 8 Elite', ram: 12, camera: '50 + 50 + 50 Mpx Hasselblad', selfie: '32 Mpx', battery: '6 000 mAh · 100 W', os: 'Android 15 · OxygenOS 15', network: '5G', sim: 'Dual SIM' },
    description: 'Hasselblad, Snapdragon 8 Elite et charge 100 W : le flagship sans compromis.'
  },

  // ───────────── HONOR ─────────────
  {
    id: 'honor-400', brand: 'honor', name: 'Honor 400 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], mockup: 'square',
    variants: [['256 Go', 330000], ['512 Go', 370000]],
    colors: [['Noir', '#1D1E21'], ['Or désert', '#D4C19C'], ['Gris lune', '#B4B7BC']],
    specs: { screen: '6,55" AMOLED 120 Hz', chip: 'Snapdragon 7 Gen 4', ram: 12, camera: '200 + 12 Mpx', selfie: '50 Mpx', battery: '5 300 mAh · 66 W', os: 'Android 15 · MagicOS 9', network: '5G', sim: 'Dual SIM' },
    description: 'Capteur 200 Mpx stabilisé et écran 5 000 nits lisible en plein soleil.'
  },
  {
    id: 'honor-x9c', brand: 'honor', name: 'X9c 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['256 Go', 215000]],
    colors: [['Noir titane', '#2A2B2F'], ['Violet', '#A390C9'], ['Cyan', '#6EBFC9']],
    specs: { screen: '6,78" AMOLED incurvé 120 Hz', chip: 'Snapdragon 6 Gen 1', ram: 12, camera: '108 + 5 Mpx', selfie: '16 Mpx', battery: '6 600 mAh · 66 W', os: 'Android 15 · MagicOS 9', network: '5G', sim: 'Dual SIM' },
    description: 'Ultra-résistant aux chutes, batterie 6 600 mAh et 5G.'
  },

  // ───────────── MOTOROLA ─────────────
  {
    id: 'motorola-edge-60', brand: 'motorola', name: 'Edge 60', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['256 Go', 265000]],
    colors: [['Pantone Gibraltar', '#2E5D6B'], ['Pantone Shamrock', '#3D7A55']],
    specs: { screen: '6,67" pOLED quad-incurvé 120 Hz', chip: 'MediaTek Dimensity 7400', ram: 12, camera: '50 + 50 + 10 Mpx', selfie: '50 Mpx', battery: '5 200 mAh · 68 W', os: 'Android 15', network: '5G', sim: 'Dual SIM' },
    description: 'Finition cuir végan Pantone, écran incurvé et Android pur.'
  },
  {
    id: 'moto-g85', brand: 'motorola', name: 'Moto G85 5G', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['256 Go', 165000]],
    colors: [['Bleu cobalt', '#2C4E8C'], ['Vert olive', '#6F7A4F'], ['Gris', '#5E6166']],
    specs: { screen: '6,67" pOLED incurvé 120 Hz', chip: 'Snapdragon 6s Gen 3', ram: 12, camera: '50 + 8 Mpx', selfie: '32 Mpx', battery: '5 000 mAh · 30 W', os: 'Android 14', network: '5G', sim: 'Dual SIM' },
    description: 'Écran pOLED incurvé et son Dolby Atmos à prix maîtrisé.'
  },

  // ───────────── NOKIA ─────────────
  {
    id: 'nokia-g42', brand: 'nokia', name: 'Nokia G42 5G', year: 2023,
    condition: 'neuf', stock: 'en-stock', badges: ['promo'], mockup: 'bar',
    variants: [['128 Go', 115000, 130000]],
    colors: [['Violet', '#9C88C4'], ['Gris', '#6E7177']],
    specs: { screen: '6,56" LCD 90 Hz', chip: 'Snapdragon 480+', ram: 6, camera: '50 + 2 + 2 Mpx', selfie: '8 Mpx', battery: '5 000 mAh', os: 'Android 14', network: '5G', sim: 'Dual SIM' },
    description: 'Réparable soi-même (écran, batterie) et robuste, la promesse Nokia.'
  },

  // ───────────── NOTHING ─────────────
  {
    id: 'nothing-phone-3a', brand: 'nothing', name: 'Phone (3a)', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'bar',
    variants: [['256 Go', 245000]],
    colors: [['Noir', '#1A1A1A'], ['Blanc', '#EDEDED'], ['Bleu', '#5C7FB5']],
    specs: { screen: '6,77" AMOLED 120 Hz', chip: 'Snapdragon 7s Gen 3', ram: 12, camera: '50 + 50 + 8 Mpx', selfie: '32 Mpx', battery: '5 000 mAh · 50 W', os: 'Android 15 · Nothing OS 3', network: '5G', sim: 'Dual SIM' },
    description: 'Dos transparent, interface Glyph et téléobjectif 2x : le plus original du marché.'
  },

  // ───────────── SONY ─────────────
  {
    id: 'sony-xperia-1-vii', brand: 'sony', name: 'Xperia 1 VII', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'trio',
    variants: [['256 Go', 890000]],
    colors: [['Noir ardoise', '#26282B'], ['Vert mousse', '#4E5E4B'], ['Violet orchidée', '#8F7BA6']],
    specs: { screen: '6,5" OLED 120 Hz 19,5:9', chip: 'Snapdragon 8 Elite', ram: 12, camera: '48 + 48 + 12 Mpx Zeiss', selfie: '12 Mpx', battery: '5 000 mAh', os: 'Android 15', network: '5G', sim: 'Dual SIM' },
    description: 'Prise jack, lecteur microSD et zoom optique continu : pour les créateurs exigeants.'
  },
  // ═════════════ ARRIVAGES SUPPLÉMENTAIRES ═════════════
  // ───── Apple ─────
  {
    id: 'iphone-16-pro-max', brand: 'apple', name: 'iPhone 16 Pro Max', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: ['promo'], mockup: 'apple-pro',
    variants: [['256 Go', 840000, 920000], ['512 Go', 990000]],
    colors: [['Titane désert', '#BFA48F'], ['Titane naturel', '#C2BCB2'], ['Titane noir', '#3C3C3D'], ['Titane blanc', '#F2F1ED']],
    specs: { screen: '6,9" Super Retina XDR OLED 120 Hz', chip: 'Apple A18 Pro', ram: 8, camera: '48 + 48 + 12 Mpx', selfie: '12 Mpx', battery: '≈ 4 685 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'Le grand écran 6,9" en titane, zoom optique 5x et vidéo 4K 120 fps.'
  },
  {
    id: 'iphone-16-pro', brand: 'apple', name: 'iPhone 16 Pro', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'apple-pro',
    variants: [['128 Go', 690000], ['256 Go', 760000]],
    colors: [['Titane désert', '#BFA48F'], ['Titane naturel', '#C2BCB2'], ['Titane noir', '#3C3C3D']],
    specs: { screen: '6,3" Super Retina XDR OLED 120 Hz', chip: 'Apple A18 Pro', ram: 8, camera: '48 + 48 + 12 Mpx', selfie: '12 Mpx', battery: '≈ 3 580 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'Titane léger, puce A18 Pro et téléobjectif 5x dans un format compact.'
  },
  {
    id: 'iphone-16-plus', brand: 'apple', name: 'iPhone 16 Plus', year: 2024,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'apple',
    variants: [['128 Go', 600000], ['256 Go', 680000]],
    colors: [['Outremer', '#7A8FD6'], ['Sarcelle', '#88B5B1'], ['Noir', '#232325']],
    specs: { screen: '6,7" Super Retina XDR OLED', chip: 'Apple A18', ram: 8, camera: '48 + 12 Mpx', selfie: '12 Mpx', battery: '≈ 4 670 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'Le grand écran d’Apple avec une autonomie exceptionnelle.'
  },
  {
    id: 'iphone-16e', brand: 'apple', name: 'iPhone 16e', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], mockup: 'apple',
    variants: [['128 Go', 430000], ['256 Go', 500000]],
    colors: [['Noir', '#232325'], ['Blanc', '#F4F4F2']],
    specs: { screen: '6,1" Super Retina XDR OLED', chip: 'Apple A18', ram: 8, camera: '48 Mpx Fusion', selfie: '12 Mpx', battery: '≈ 4 000 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'L’iPhone récent le plus abordable : puce A18, Apple Intelligence et grosse autonomie.'
  },
  {
    id: 'iphone-14', brand: 'apple', name: 'iPhone 14', year: 2022,
    condition: 'reconditionne', stock: 'en-stock', badges: ['best-seller'], mockup: 'apple',
    variants: [['128 Go', 300000], ['256 Go', 345000]],
    colors: [['Minuit', '#232A31'], ['Bleu', '#A3B6CB'], ['Violet', '#D7CCE2'], ['Lumière stellaire', '#F1EDE4']],
    specs: { screen: '6,1" Super Retina XDR OLED', chip: 'Apple A15 Bionic', ram: 6, camera: '12 + 12 Mpx', selfie: '12 Mpx', battery: '≈ 3 280 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'Reconditionné grade A, batterie testée > 85 %, garanti 6 mois.'
  },
  {
    id: 'iphone-12', brand: 'apple', name: 'iPhone 12', year: 2020,
    condition: 'reconditionne', stock: 'en-stock', badges: ['promo'], mockup: 'apple',
    variants: [['64 Go', 175000, 195000], ['128 Go', 205000]],
    colors: [['Noir', '#25272A'], ['Blanc', '#F3F2EF'], ['Bleu', '#2C4A6E'], ['Vert', '#D5E3D2']],
    specs: { screen: '6,1" Super Retina XDR OLED', chip: 'Apple A14 Bionic', ram: 4, camera: '12 + 12 Mpx', selfie: '12 Mpx', battery: '≈ 2 815 mAh', os: 'iOS 26', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'Écran OLED, 5G et design plat : un iPhone fiable à petit prix.'
  },
  {
    id: 'iphone-11', brand: 'apple', name: 'iPhone 11', year: 2019,
    condition: 'reconditionne', stock: 'en-stock', badges: [], mockup: 'apple',
    variants: [['64 Go', 135000], ['128 Go', 155000]],
    colors: [['Noir', '#25272A'], ['Blanc', '#F3F2EF'], ['Violet', '#D1C7E0'], ['Rouge', '#BF1E2E']],
    specs: { screen: '6,1" Liquid Retina LCD', chip: 'Apple A13 Bionic', ram: 4, camera: '12 + 12 Mpx', selfie: '12 Mpx', battery: '≈ 3 110 mAh', os: 'iOS 26', network: '4G', sim: 'Nano-SIM + eSIM' },
    description: 'Le premier iPhone idéal : reconditionné, testé et garanti.'
  },

  // ───── Samsung ─────
  {
    id: 'galaxy-s25-edge', brand: 'samsung', name: 'Galaxy S25 Edge', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], mockup: 'apple',
    variants: [['256 Go', 780000], ['512 Go', 870000]],
    colors: [['Titane argent', '#C9CCCE'], ['Titane noir', '#2E3033'], ['Titane bleu glacé', '#B8C9D9']],
    specs: { screen: '6,7" Dynamic AMOLED 2X 120 Hz', chip: 'Snapdragon 8 Elite for Galaxy', ram: 12, camera: '200 + 12 Mpx', selfie: '12 Mpx', battery: '3 900 mAh', os: 'Android 15 · One UI 7', network: '5G', sim: 'Dual SIM + eSIM' },
    description: 'Le Galaxy le plus fin : 5,8 mm, 163 g et capteur 200 Mpx.'
  },
  {
    id: 'galaxy-s25-plus', brand: 'samsung', name: 'Galaxy S25+', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'trio',
    variants: [['256 Go', 690000], ['512 Go', 780000]],
    colors: [['Marine', '#2A3550'], ['Bleu glacier', '#B9CCE0'], ['Argent', '#D9DADC']],
    specs: { screen: '6,7" Dynamic AMOLED 2X 120 Hz', chip: 'Snapdragon 8 Elite for Galaxy', ram: 12, camera: '50 + 12 + 10 Mpx', selfie: '12 Mpx', battery: '4 900 mAh · 45 W', os: 'Android 15 · One UI 7', network: '5G', sim: 'Dual SIM + eSIM' },
    description: 'Grand écran QHD+, charge 45 W et Galaxy AI.'
  },
  {
    id: 'galaxy-s24-fe', brand: 'samsung', name: 'Galaxy S24 FE', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: ['promo'], mockup: 'trio',
    variants: [['128 Go', 365000, 399000], ['256 Go', 405000]],
    colors: [['Bleu', '#7C9CC4'], ['Graphite', '#3A3B3E'], ['Menthe', '#C8E1D3'], ['Jaune', '#F0E2A0']],
    specs: { screen: '6,7" Dynamic AMOLED 2X 120 Hz', chip: 'Exynos 2400e', ram: 8, camera: '50 + 12 + 8 Mpx', selfie: '10 Mpx', battery: '4 700 mAh', os: 'Android 15 · One UI 7', network: '5G', sim: 'Dual SIM + eSIM' },
    description: 'L’expérience Galaxy S à prix accessible, avec 7 ans de mises à jour.'
  },
  {
    id: 'galaxy-s23-ultra', brand: 'samsung', name: 'Galaxy S23 Ultra', year: 2023,
    condition: 'reconditionne', stock: 'en-stock', badges: ['best-seller'], mockup: 'trio',
    variants: [['256 Go', 455000], ['512 Go', 520000]],
    colors: [['Noir fantôme', '#2B2C2F'], ['Crème', '#EDE6D6'], ['Vert', '#B9C6B0'], ['Lavande', '#D3C7E3']],
    specs: { screen: '6,8" Dynamic AMOLED 2X 120 Hz', chip: 'Snapdragon 8 Gen 2 for Galaxy', ram: 12, camera: '200 + 12 + 10 + 10 Mpx', selfie: '12 Mpx', battery: '5 000 mAh', os: 'Android 15 · One UI 7', network: '5G', sim: 'Dual SIM + eSIM' },
    description: 'Le photophone star avec S Pen, reconditionné grade A.'
  },
  {
    id: 'galaxy-a26', brand: 'samsung', name: 'Galaxy A26 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], mockup: 'trio',
    variants: [['128 Go', 165000], ['256 Go', 185000]],
    colors: [['Noir', '#2B2C2F'], ['Blanc', '#EDEDEF'], ['Rose', '#E8C9CF'], ['Menthe', '#C8E1D3']],
    specs: { screen: '6,7" Super AMOLED 120 Hz', chip: 'Exynos 1380', ram: 8, camera: '50 + 8 + 2 Mpx', selfie: '13 Mpx', battery: '5 000 mAh', os: 'Android 15 · One UI 7', network: '5G', sim: 'Dual SIM' },
    description: '5G, écran AMOLED et étanchéité IP67 pour un budget maîtrisé.'
  },
  {
    id: 'galaxy-a06', brand: 'samsung', name: 'Galaxy A06', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'trio',
    variants: [['64 Go', 68000], ['128 Go', 78000]],
    colors: [['Noir', '#2B2C2F'], ['Bleu clair', '#B8CDE3'], ['Or', '#E3D3AE']],
    specs: { screen: '6,7" PLS LCD', chip: 'MediaTek Helio G85', ram: 4, camera: '50 + 2 Mpx', selfie: '8 Mpx', battery: '5 000 mAh · 25 W', os: 'Android 15 · One UI 7', network: '4G', sim: 'Dual SIM' },
    description: 'Le Samsung le plus accessible, avec grand écran et bonne autonomie.'
  },

  // ───── Xiaomi ─────
  {
    id: 'xiaomi-15t-pro', brand: 'xiaomi', name: 'Xiaomi 15T Pro', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], mockup: 'square',
    variants: [['256 Go', 520000], ['512 Go', 580000]],
    colors: [['Noir', '#1E1F21'], ['Gris', '#8E9196'], ['Or moka', '#BFA88A']],
    specs: { screen: '6,83" AMOLED 144 Hz', chip: 'MediaTek Dimensity 9400+', ram: 12, camera: '50 + 50 + 12 Mpx Leica', selfie: '32 Mpx', battery: '5 500 mAh · 90 W', os: 'Android 15 · HyperOS 3', network: '5G', sim: 'Dual SIM + eSIM' },
    description: 'Optiques Leica avec téléobjectif 5x et charge 90 W.'
  },
  {
    id: 'redmi-note-14-pro-5g', brand: 'xiaomi', name: 'Redmi Note 14 Pro 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['256 Go', 195000], ['512 Go', 225000]],
    colors: [['Noir minuit', '#1F2024'], ['Violet lavande', '#B9A6D9'], ['Vert océan', '#4F8C82']],
    specs: { screen: '6,67" AMOLED incurvé 120 Hz', chip: 'MediaTek Dimensity 7300-Ultra', ram: 8, camera: '200 + 8 + 2 Mpx', selfie: '20 Mpx', battery: '5 110 mAh · 45 W', os: 'Android 14 · HyperOS', network: '5G', sim: 'Dual SIM' },
    description: '200 Mpx, écran incurvé et IP68 en version 5G.'
  },
  {
    id: 'poco-x7-pro', brand: 'xiaomi', name: 'POCO X7 Pro', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], mockup: 'bar',
    variants: [['256 Go', 215000], ['512 Go', 245000]],
    colors: [['Jaune POCO', '#F2C200'], ['Noir', '#1E1F21'], ['Vert', '#4D6B55']],
    specs: { screen: '6,67" AMOLED 120 Hz', chip: 'MediaTek Dimensity 8400-Ultra', ram: 12, camera: '50 + 8 Mpx', selfie: '20 Mpx', battery: '6 000 mAh · 90 W', os: 'Android 15 · HyperOS 2', network: '5G', sim: 'Dual SIM' },
    description: 'Le roi du gaming à prix serré : puce surpuissante et 6 000 mAh.'
  },
  {
    id: 'redmi-a5', brand: 'xiaomi', name: 'Redmi A5', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['64 Go', 55000], ['128 Go', 62000]],
    colors: [['Noir', '#202124'], ['Bleu lac', '#6E95B8'], ['Sable', '#D9C9A8']],
    specs: { screen: '6,88" LCD 120 Hz', chip: 'Unisoc T7250', ram: 4, camera: '32 Mpx', selfie: '8 Mpx', battery: '5 200 mAh', os: 'Android 15 (Go)', network: '4G', sim: 'Dual SIM' },
    description: 'Grand écran et batterie solide à tout petit prix.'
  },

  // ───── Tecno ─────
  {
    id: 'tecno-camon-40', brand: 'tecno', name: 'Camon 40', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['256 Go', 145000]],
    colors: [['Noir galaxie', '#1E2026'], ['Vert émeraude', '#2F6B57'], ['Blanc glacier', '#EEF1F3']],
    specs: { screen: '6,78" AMOLED 120 Hz', chip: 'MediaTek Helio G100 Ultimate', ram: 8, camera: '50 + 2 Mpx', selfie: '32 Mpx', battery: '5 200 mAh · 45 W', os: 'Android 15 · HiOS 15', network: '4G', sim: 'Dual SIM' },
    description: 'Le style Camon et ses portraits IA à prix accessible.'
  },
  {
    id: 'tecno-phantom-v-fold2', brand: 'tecno', name: 'Phantom V Fold2 5G', year: 2024,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'fold',
    variants: [['512 Go', 690000]],
    colors: [['Noir karst', '#1C1D20'], ['Vert rippling', '#3E5F55']],
    specs: { screen: '7,85" pliable + 6,42" externe, 120 Hz', chip: 'MediaTek Dimensity 9000+', ram: 12, camera: '50 + 50 + 50 Mpx', selfie: '32 + 32 Mpx', battery: '5 750 mAh · 70 W', os: 'Android 14 · HiOS', network: '5G', sim: 'Dual SIM' },
    description: 'Le pliable grand format le plus accessible, avec une énorme batterie.'
  },
  {
    id: 'tecno-spark-go-2', brand: 'tecno', name: 'Spark Go 2', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['best-seller'], mockup: 'circle',
    variants: [['64 Go', 52000], ['128 Go', 60000]],
    colors: [['Noir encre', '#1D1E22'], ['Vert', '#6EA58A'], ['Blanc', '#F1F1EF']],
    specs: { screen: '6,67" LCD 120 Hz', chip: 'Unisoc T7250', ram: 4, camera: '13 Mpx', selfie: '8 Mpx', battery: '5 000 mAh', os: 'Android 15 (Go)', network: '4G', sim: 'Dual SIM' },
    description: 'Le premier smartphone idéal : fluide, résistant (IP64) et économique.'
  },

  // ───── Infinix ─────
  {
    id: 'infinix-gt-30-pro', brand: 'infinix', name: 'GT 30 Pro 5G', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], mockup: 'square',
    variants: [['256 Go', 185000], ['512 Go', 210000]],
    colors: [['Noir cyber', '#16171B'], ['Argent blade', '#C9CCD1']],
    specs: { screen: '6,78" AMOLED 144 Hz', chip: 'MediaTek Dimensity 8350 Ultimate', ram: 12, camera: '108 + 2 Mpx', selfie: '13 Mpx', battery: '5 500 mAh · 45 W', os: 'Android 15 · XOS 15', network: '5G', sim: 'Dual SIM' },
    description: 'Gâchettes gaming intégrées, LED Mecha et 144 Hz pour les joueurs.'
  },
  {
    id: 'infinix-note-50', brand: 'infinix', name: 'Note 50', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['256 Go', 128000]],
    colors: [['Noir', '#1E1F22'], ['Vert', '#5E8C74'], ['Violet', '#8E7BBE']],
    specs: { screen: '6,78" AMOLED 144 Hz', chip: 'MediaTek Helio G100 Ultimate', ram: 8, camera: '50 + 2 Mpx', selfie: '13 Mpx', battery: '5 200 mAh · 45 W', os: 'Android 15 · XOS 15', network: '4G', sim: 'Dual SIM' },
    description: 'Écran AMOLED 144 Hz et design métal à prix doux.'
  },
  {
    id: 'infinix-smart-10', brand: 'infinix', name: 'Smart 10', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['64 Go', 50000], ['128 Go', 58000]],
    colors: [['Noir', '#1E1F22'], ['Bleu', '#4B7FC1'], ['Argent', '#C9CCD1']],
    specs: { screen: '6,67" LCD 120 Hz', chip: 'Unisoc T7250', ram: 4, camera: '8 Mpx', selfie: '8 Mpx', battery: '5 000 mAh', os: 'Android 15 (Go)', network: '4G', sim: 'Dual SIM' },
    description: 'Simple, solide et abordable, idéal comme premier smartphone.'
  },

  // ───── itel ─────
  {
    id: 'itel-a90', brand: 'itel', name: 'A90', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['64 Go', 45000], ['128 Go', 52000]],
    colors: [['Noir', '#1D1E21'], ['Bleu', '#3E6FB0'], ['Or', '#D2BD8E']],
    specs: { screen: '6,6" LCD 90 Hz', chip: 'Unisoc T7100', ram: 4, camera: '13 Mpx', selfie: '5 Mpx', battery: '5 000 mAh', os: 'Android 14 (Go)', network: '4G', sim: 'Dual SIM' },
    description: 'Résistant (IP54), grand écran et prix mini.'
  },
  {
    id: 'itel-p65', brand: 'itel', name: 'P65', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['128 Go', 68000], ['256 Go', 78000]],
    colors: [['Noir', '#1D1E21'], ['Vert', '#7FA58A']],
    specs: { screen: '6,67" LCD 120 Hz', chip: 'Unisoc T606', ram: 4, camera: '50 Mpx', selfie: '8 Mpx', battery: '6 000 mAh', os: 'Android 14', network: '4G', sim: 'Dual SIM' },
    description: 'Batterie de 6 000 mAh pour tenir deux jours.'
  },

  // ───── Google ─────
  {
    id: 'pixel-9-pro', brand: 'google', name: 'Pixel 9 Pro', year: 2024,
    condition: 'reconditionne', stock: 'en-stock', badges: [], mockup: 'visor',
    variants: [['128 Go', 470000], ['256 Go', 520000]],
    colors: [['Obsidienne', '#1F2022'], ['Porcelaine', '#ECE7DF'], ['Quartz rose', '#E8C9C6']],
    specs: { screen: '6,3" Super Actua LTPO 120 Hz', chip: 'Google Tensor G4', ram: 16, camera: '50 + 48 + 48 Mpx', selfie: '42 Mpx', battery: '4 700 mAh', os: 'Android 16', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'Reconditionné grade A : photo Pixel de référence et 16 Go de RAM.'
  },
  {
    id: 'pixel-8', brand: 'google', name: 'Pixel 8', year: 2023,
    condition: 'reconditionne', stock: 'en-stock', badges: ['promo'], mockup: 'visor',
    variants: [['128 Go', 255000, 285000]],
    colors: [['Obsidienne', '#1F2022'], ['Menthe', '#C9E3D3'], ['Rose', '#EDC9C3']],
    specs: { screen: '6,2" Actua OLED 120 Hz', chip: 'Google Tensor G3', ram: 8, camera: '50 + 12 Mpx', selfie: '10,5 Mpx', battery: '4 575 mAh', os: 'Android 16', network: '5G', sim: 'Nano-SIM + eSIM' },
    description: 'Compact, mises à jour jusqu’en 2030 et photo nocturne bluffante.'
  },

  // ───── Huawei ─────
  {
    id: 'huawei-nova-13-pro', brand: 'huawei', name: 'nova 13 Pro', year: 2024,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'circle',
    variants: [['512 Go', 395000]],
    colors: [['Noir', '#1C1C1E'], ['Violet', '#9C86C2'], ['Vert', '#8DAE9A']],
    specs: { screen: '6,76" OLED quad-incurvé 120 Hz', chip: 'Kirin 8000', ram: 12, camera: '50 + 12 + 8 Mpx', selfie: '60 + 8 Mpx', battery: '5 000 mAh · 100 W', os: 'EMUI 15', network: '4G', sim: 'Dual SIM' },
    description: 'Double caméra selfie 60 Mpx et téléobjectif portrait.'
  },

  // ───── Oppo ─────
  {
    id: 'oppo-find-x8-pro', brand: 'oppo', name: 'Find X8 Pro', year: 2024,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'circle',
    variants: [['512 Go', 790000]],
    colors: [['Noir spatial', '#1E1F23'], ['Blanc perle', '#F0EEEA']],
    specs: { screen: '6,78" AMOLED LTPO 120 Hz', chip: 'MediaTek Dimensity 9400', ram: 16, camera: '50 + 50 + 50 + 50 Mpx Hasselblad', selfie: '32 Mpx', battery: '5 910 mAh · 80 W', os: 'Android 15 · ColorOS 15', network: '5G', sim: 'Dual SIM' },
    description: 'Quatre capteurs 50 Mpx Hasselblad dont deux périscopes.'
  },
  {
    id: 'oppo-reno-13-f', brand: 'oppo', name: 'Reno13 F', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['256 Go', 205000]],
    colors: [['Violet lumineux', '#A893C9'], ['Gris graphite', '#4A4C52']],
    specs: { screen: '6,67" AMOLED 120 Hz', chip: 'MediaTek Helio G100', ram: 8, camera: '50 + 8 + 2 Mpx', selfie: '32 Mpx', battery: '5 800 mAh · 45 W', os: 'Android 15 · ColorOS 15', network: '4G', sim: 'Dual SIM' },
    description: 'Étanche IP69, portraits IA et grosse batterie.'
  },

  // ───── Vivo ─────
  {
    id: 'vivo-x200-pro', brand: 'vivo', name: 'X200 Pro', year: 2024,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'circle',
    variants: [['512 Go', 780000]],
    colors: [['Noir cosmos', '#1D1E22'], ['Titane', '#B7B2A9']],
    specs: { screen: '6,78" AMOLED LTPO 120 Hz', chip: 'MediaTek Dimensity 9400', ram: 16, camera: '50 + 50 + 200 Mpx Zeiss', selfie: '32 Mpx', battery: '6 000 mAh · 90 W', os: 'Android 15 · Funtouch OS 15', network: '5G', sim: 'Dual SIM' },
    description: 'Téléobjectif 200 Mpx Zeiss : un monstre de la photo.'
  },
  {
    id: 'vivo-y19s', brand: 'vivo', name: 'Y19s', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['128 Go', 82000]],
    colors: [['Noir brillant', '#1F2023'], ['Argent', '#C9CCD1']],
    specs: { screen: '6,68" LCD 90 Hz', chip: 'Unisoc T612', ram: 4, camera: '50 Mpx', selfie: '5 Mpx', battery: '5 500 mAh', os: 'Android 14 · Funtouch OS 14', network: '4G', sim: 'Dual SIM' },
    description: 'Robuste (IP64), grande batterie et son puissant.'
  },

  // ───── Realme ─────
  {
    id: 'realme-gt-7-pro', brand: 'realme', name: 'GT 7 Pro', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'square',
    variants: [['512 Go', 520000]],
    colors: [['Titane lunaire', '#B8B4AC'], ['Orange Mars', '#D9662B']],
    specs: { screen: '6,78" AMOLED 120 Hz', chip: 'Snapdragon 8 Elite', ram: 12, camera: '50 + 50 + 8 Mpx', selfie: '16 Mpx', battery: '5 800 mAh · 120 W', os: 'Android 15 · realme UI 6', network: '5G', sim: 'Dual SIM' },
    description: 'Snapdragon 8 Elite et charge 120 W à prix agressif.'
  },
  {
    id: 'realme-note-60', brand: 'realme', name: 'Note 60', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['128 Go', 62000]],
    colors: [['Noir marbre', '#202226'], ['Bleu voyage', '#4E7DB5']],
    specs: { screen: '6,74" LCD 90 Hz', chip: 'Unisoc T612', ram: 4, camera: '32 Mpx', selfie: '5 Mpx', battery: '5 000 mAh', os: 'Android 14 · realme UI', network: '4G', sim: 'Dual SIM' },
    description: 'Châssis métal, IP64 et petit prix.'
  },

  // ───── OnePlus ─────
  {
    id: 'oneplus-nord-5', brand: 'oneplus', name: 'Nord 5', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: ['nouveau'], mockup: 'bar',
    variants: [['256 Go', 315000], ['512 Go', 355000]],
    colors: [['Noir fantôme', '#1E1F22'], ['Gris sec', '#9EA0A3'], ['Bleu marbre', '#8EA7C9']],
    specs: { screen: '6,83" AMOLED 144 Hz', chip: 'Snapdragon 8s Gen 3', ram: 12, camera: '50 + 8 Mpx', selfie: '50 Mpx', battery: '6 800 mAh · 80 W', os: 'Android 15 · OxygenOS 15', network: '5G', sim: 'Dual SIM' },
    description: 'Batterie géante de 6 800 mAh et performances de flagship.'
  },
  {
    id: 'oneplus-13r', brand: 'oneplus', name: 'OnePlus 13R', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'circle',
    variants: [['256 Go', 410000]],
    colors: [['Nebula Noir', '#1D1E22'], ['Astral Trail', '#C9C6BF']],
    specs: { screen: '6,78" AMOLED LTPO 120 Hz', chip: 'Snapdragon 8 Gen 3', ram: 12, camera: '50 + 50 + 8 Mpx', selfie: '16 Mpx', battery: '6 000 mAh · 80 W', os: 'Android 15 · OxygenOS 15', network: '5G', sim: 'Dual SIM' },
    description: 'Le flagship killer : puissance haut de gamme à prix contenu.'
  },

  // ───── Honor ─────
  {
    id: 'honor-magic7-pro', brand: 'honor', name: 'Magic7 Pro', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'circle',
    variants: [['512 Go', 760000]],
    colors: [['Noir', '#1D1E21'], ['Gris lunaire', '#B4B7BC'], ['Bleu', '#3B5B8A']],
    specs: { screen: '6,8" OLED LTPO 120 Hz', chip: 'Snapdragon 8 Elite', ram: 12, camera: '50 + 50 + 200 Mpx', selfie: '50 Mpx', battery: '5 270 mAh · 100 W', os: 'Android 15 · MagicOS 9', network: '5G', sim: 'Dual SIM' },
    description: 'Périscope 200 Mpx, écran ultra-lumineux et IA photo.'
  },
  {
    id: 'honor-x7c', brand: 'honor', name: 'X7c', year: 2024,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'circle',
    variants: [['128 Go', 98000], ['256 Go', 112000]],
    colors: [['Noir minuit', '#1D1E21'], ['Vert forêt', '#3E6B55'], ['Blanc', '#EDEDEF']],
    specs: { screen: '6,77" LCD 120 Hz', chip: 'Snapdragon 685', ram: 8, camera: '108 + 2 Mpx', selfie: '8 Mpx', battery: '6 000 mAh · 35 W', os: 'Android 14 · MagicOS 8', network: '4G', sim: 'Dual SIM' },
    description: 'Résistant aux chutes, 108 Mpx et batterie 6 000 mAh.'
  },

  // ───── Motorola ─────
  {
    id: 'motorola-razr-60-ultra', brand: 'motorola', name: 'Razr 60 Ultra', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], mockup: 'flip',
    variants: [['512 Go', 690000]],
    colors: [['Pantone Rio Red', '#A3262A'], ['Pantone Mountain Trail', '#4A5A3E'], ['Pantone Scarab', '#2C4A4C']],
    specs: { screen: '7" pliable + 4" externe, 165 Hz', chip: 'Snapdragon 8 Elite', ram: 16, camera: '50 + 50 Mpx', selfie: '50 Mpx', battery: '4 700 mAh · 68 W', os: 'Android 15', network: '5G', sim: 'Dual SIM + eSIM' },
    description: 'Le clapet le plus puissant du marché, finitions bois ou cuir.'
  },
  {
    id: 'moto-g05', brand: 'motorola', name: 'Moto G05', year: 2025,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'square',
    variants: [['128 Go', 72000]],
    colors: [['Pantone Forest Green', '#2F5A45'], ['Pantone Plum Red', '#7E2E46']],
    specs: { screen: '6,67" LCD 90 Hz', chip: 'MediaTek Helio G81 Extreme', ram: 4, camera: '50 Mpx', selfie: '8 Mpx', battery: '5 200 mAh', os: 'Android 15', network: '4G', sim: 'Dual SIM' },
    description: 'Android 15 pur, son Dolby Atmos et finition cuir végan.'
  },

  // ───── Nokia ─────
  {
    id: 'nokia-c32', brand: 'nokia', name: 'Nokia C32', year: 2023,
    condition: 'neuf', stock: 'en-stock', badges: [], mockup: 'bar',
    variants: [['64 Go', 62000], ['128 Go', 70000]],
    colors: [['Charbon', '#2E3033'], ['Vert automne', '#7A8A6A'], ['Rose plage', '#E5C3BF']],
    specs: { screen: '6,5" LCD', chip: 'Unisoc SC9863A1', ram: 4, camera: '50 + 2 Mpx', selfie: '8 Mpx', battery: '5 000 mAh', os: 'Android 13', network: '4G', sim: 'Dual SIM' },
    description: 'Dos en verre trempé, IP52 et autonomie de 3 jours.'
  },

  // ───── Nothing ─────
  {
    id: 'nothing-phone-3', brand: 'nothing', name: 'Phone (3)', year: 2025,
    condition: 'neuf', stock: 'sur-commande', badges: ['nouveau'], mockup: 'square',
    variants: [['256 Go', 560000], ['512 Go', 620000]],
    colors: [['Noir', '#1A1A1A'], ['Blanc', '#EDEDED']],
    specs: { screen: '6,67" AMOLED 120 Hz', chip: 'Snapdragon 8s Gen 4', ram: 12, camera: '50 + 50 + 50 Mpx', selfie: '50 Mpx', battery: '5 150 mAh · 65 W', os: 'Android 15 · Nothing OS 3.5', network: '5G', sim: 'Dual SIM' },
    description: 'Le premier flagship Nothing avec la Glyph Matrix au dos.'
  },

  // ───── Sony ─────
  {
    id: 'sony-xperia-10-vi', brand: 'sony', name: 'Xperia 10 VI', year: 2024,
    condition: 'neuf', stock: 'sur-commande', badges: [], mockup: 'bar',
    variants: [['128 Go', 285000]],
    colors: [['Noir', '#26282B'], ['Blanc', '#EDEDEF'], ['Bleu', '#6F8FB5']],
    specs: { screen: '6,1" OLED 21:9', chip: 'Snapdragon 6 Gen 1', ram: 8, camera: '48 + 8 Mpx', selfie: '8 Mpx', battery: '5 000 mAh', os: 'Android 15', network: '5G', sim: 'Dual SIM' },
    description: 'Léger, prise jack et autonomie record de 2 jours.'
  }

]
