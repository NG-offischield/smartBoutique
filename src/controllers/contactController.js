import { shop, fullAddress } from '@/config/shop'
import { formatPrice } from '@/models/format'

/** Construit les liens de contact (WhatsApp, appel, carte) et les messages pré-remplis. */
export const contact = {
  telLink: `tel:+${shop.phoneInternational}`,

  whatsappLink(message = '') {
    const base = `https://wa.me/${shop.phoneInternational}`
    return message ? `${base}?text=${encodeURIComponent(message)}` : base
  },

  mapsLink: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`,

  mapEmbed: (() => {
    const { lat, lng } = shop.geo
    const d = 0.012
    const bbox = [lng - d, lat - d, lng + d, lat + d].join('%2C')
    return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat}%2C${lng}`
  })(),

  greeting() {
    return `Bonjour ${shop.name} 👋`
  },

  /** Message de commande pour un téléphone précis. */
  orderMessage(product, { variant = product.baseVariant, color } = {}) {
    const lines = [
      contact.greeting(),
      `Je suis intéressé(e) par le *${product.fullName}*.`,
      `• Stockage : ${variant.storage}`,
      color ? `• Couleur : ${color.name}` : null,
      `• État : ${product.conditionLabel}`,
      `• Prix affiché : ${formatPrice(variant.price)}`,
      '',
      'Est-il disponible ? Merci !'
    ]
    return lines.filter((l) => l !== null).join('\n')
  },

  /** Message pour une liste de téléphones (favoris / comparateur). */
  listMessage(products, title = 'ma sélection') {
    const lines = [
      contact.greeting(),
      `Voici ${title} :`,
      ...products.map((p) => `• ${p.fullName} — à partir de ${formatPrice(p.basePrice)}`),
      '',
      'Pouvez-vous me confirmer la disponibilité ? Merci !'
    ]
    return lines.join('\n')
  },

  /** Message issu du formulaire de contact. */
  formMessage({ name, subject, message }) {
    return [contact.greeting(), `Je suis ${name.trim()}.`, subject ? `Objet : ${subject}` : null, '', message.trim()]
      .filter((l) => l !== null)
      .join('\n')
  }
}
