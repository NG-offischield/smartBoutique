import { formatPrice, normalize } from './format'

export const CONDITIONS = {
  neuf: 'Neuf',
  reconditionne: 'Reconditionné'
}

export const STOCK_STATUS = {
  'en-stock': { label: 'En stock', tone: 'success' },
  'sur-commande': { label: 'Sur commande (48–72 h)', tone: 'warning' },
  epuise: { label: 'Épuisé', tone: 'danger' }
}

export const BADGES = {
  nouveau: 'Nouveau',
  'best-seller': 'Best-seller',
  promo: 'Promo'
}

/** Modèle : un téléphone du catalogue et ses déclinaisons (stockage / couleur). */
export class Product {
  /**
   * @param {object} raw  données brutes (src/data/products.js)
   * @param {import('./Brand').Brand} brand
   */
  constructor(raw, brand) {
    if (!raw?.id) throw new Error('Product: "id" est obligatoire')
    if (!brand) throw new Error(`Product "${raw.id}": marque "${raw.brand}" introuvable`)
    if (!Array.isArray(raw.variants) || raw.variants.length === 0) {
      throw new Error(`Product "${raw.id}": au moins une variante est requise`)
    }

    this.id = raw.id
    this.brand = brand
    this.name = raw.name
    this.year = raw.year ?? null
    this.condition = CONDITIONS[raw.condition] ? raw.condition : 'neuf'
    this.stock = STOCK_STATUS[raw.stock] ? raw.stock : 'en-stock'
    this.featured = Boolean(raw.featured)
    this.mockup = raw.mockup || 'square'
    this.image = raw.image || null
    this.description = raw.description || ''
    this.rating = Number(raw.rating) || 0
    this.reviews = Number(raw.reviews) || 0
    this.specs = { ...raw.specs }

    this.variants = raw.variants.map(([storage, price, oldPrice]) => ({
      storage,
      price,
      oldPrice: oldPrice && oldPrice > price ? oldPrice : null
    }))
    this.colors = (raw.colors?.length ? raw.colors : [['Noir', '#1F2023']]).map(([name, hex]) => ({ name, hex }))

    const badges = new Set((raw.badges || []).filter((b) => BADGES[b]))
    if (this.variants.some((v) => v.oldPrice)) badges.add('promo')
    this.badges = [...badges]
  }

  get fullName() {
    // Évite les doublons du type « Nokia Nokia G42 » ou « Google Pixel Pixel 10 »
    const name = normalize(this.name)
    if (name.startsWith(normalize(this.brand.name))) return this.name
    const words = this.brand.name.split(' ')
    if (words.length > 1 && name.startsWith(normalize(words.at(-1)))) {
      return `${words.slice(0, -1).join(' ')} ${this.name}`
    }
    return `${this.brand.name} ${this.name}`
  }

  get basePrice() {
    return Math.min(...this.variants.map((v) => v.price))
  }

  get baseVariant() {
    return this.variants.find((v) => v.price === this.basePrice)
  }

  get discountPercent() {
    const { price, oldPrice } = this.baseVariant
    return oldPrice ? Math.round((1 - price / oldPrice) * 100) : 0
  }

  get isPromo() {
    return this.badges.includes('promo')
  }

  get is5G() {
    return this.specs.network === '5G'
  }

  get ram() {
    return Number(this.specs.ram) || 0
  }

  /** Capacités de stockage en Go (1 To = 1024 Go) pour le filtrage. */
  get storageOptions() {
    return this.variants.map((v) => toGigabytes(v.storage))
  }

  get conditionLabel() {
    return CONDITIONS[this.condition]
  }

  get stockInfo() {
    return STOCK_STATUS[this.stock]
  }

  get isAvailable() {
    return this.stock !== 'epuise'
  }

  get formattedPrice() {
    return formatPrice(this.basePrice)
  }

  get searchText() {
    return normalize([this.brand.name, this.name, this.specs.chip, this.specs.os, this.conditionLabel].join(' '))
  }

  matches(query) {
    const terms = normalize(query).split(/\s+/).filter(Boolean)
    return terms.every((t) => this.searchText.includes(t))
  }

  get url() {
    return `/telephones/${this.id}`
  }
}

export function toGigabytes(label) {
  const m = String(label).match(/([\d.,]+)\s*(To|Go)/i)
  if (!m) return 0
  const n = parseFloat(m[1].replace(',', '.'))
  return /to/i.test(m[2]) ? n * 1024 : n
}
