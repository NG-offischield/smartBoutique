/**
 * ⚙️ CONFIGURATION DE LA BOUTIQUE
 * Modifiez ce fichier pour changer les informations affichées partout sur le site
 * (nom, téléphone, WhatsApp, adresse, horaires, réseaux sociaux…).
 */
export const shop = {
  name: 'The Smart Boutique',
  shortName: 'Smart Boutique',
  slogan: 'Le smartphone qu’il vous faut, au juste prix.',
  description:
    'The Smart Boutique : smartphones neufs et reconditionnés de toutes les grandes marques à Yaoundé. Apple, Samsung, Xiaomi, Tecno, Infinix, Google Pixel… Conseil, garantie et livraison.',

  // Numéro local (affichage) et format international (liens tel: et WhatsApp)
  phoneDisplay: '+237 6 98 68 67 29',
  phoneInternational: '237698686729',

  email: '',

  address: {
    street: 'Rue Nana Tchakounté',
    city: 'Yaoundé',
    country: 'Cameroun',
    countryCode: 'CM'
  },

  // Coordonnées approximatives (Yaoundé) pour la carte — ajustez si besoin.
  geo: { lat: 3.8667, lng: 11.5167 },

  openingHours: [
    { days: 'Lundi – Vendredi', hours: '08h00 – 19h30', schema: 'Mo-Fr 08:00-19:30' },
    { days: 'Samedi', hours: '09h00 – 19h30', schema: 'Sa 09:00-19:30' },
    { days: 'Dimanche', hours: '11h00 – 17h00', schema: 'Su 11:00-17:00' }
  ],

  currency: 'XAF',

  // Laissez une valeur vide ('') pour masquer un réseau social.
  socials: {
    facebook: '',
    instagram: '',
    tiktok: ''
  },

  siteUrl: import.meta.env.VITE_SITE_URL || 'https://the-smart-boutique.vercel.app'
}

export const fullAddress = `${shop.address.street}, ${shop.address.city}, ${shop.address.country}`
