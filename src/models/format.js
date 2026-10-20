/** Utilitaires de présentation partagés par les modèles et les vues. */
const priceFormatter = new Intl.NumberFormat('fr-FR', { maximumFractionDigits: 0 })

export function formatPrice(amount) {
  if (typeof amount !== 'number' || Number.isNaN(amount)) return '—'
  // Espace insécable fine pour éviter les retours à la ligne au milieu d'un prix
  return `${priceFormatter.format(amount).replace(/\s/g, ' ')} FCFA`
}

export function normalize(text) {
  return String(text ?? '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}
