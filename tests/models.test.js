import { describe, expect, it } from 'vitest'
import { Product, toGigabytes } from '@/models/Product'
import { Brand } from '@/models/Brand'
import { formatPrice, normalize } from '@/models/format'
import { ProductRepository } from '@/services/ProductRepository'
import { applyFilters } from '@/controllers/catalogController'
import { contact } from '@/controllers/contactController'
import rawBrands from '@/data/brands'
import rawProducts from '@/data/products'

const repo = new ProductRepository()
const baseFilters = { q: '', brands: [], condition: '', network: '', ram: null, storage: null, min: null, max: null, promo: false, available: false, sort: 'pertinence' }

describe('Données du catalogue', () => {
  it('se chargent sans erreur et sans doublon', () => {
    expect(repo.all()).toHaveLength(rawProducts.length)
    expect(new Set(rawProducts.map((p) => p.id)).size).toBe(rawProducts.length)
  })

  it('chaque produit référence une marque existante et a des données cohérentes', () => {
    const ids = new Set(rawBrands.map((b) => b.id))
    for (const p of rawProducts) {
      expect(ids.has(p.brand), p.id).toBe(true)
      expect(p.id).toMatch(/^[a-z0-9-]+$/)
      for (const [storage, price, old] of p.variants) {
        expect(toGigabytes(storage), `${p.id} ${storage}`).toBeGreaterThan(0)
        expect(price, p.id).toBeGreaterThan(0)
        if (old) expect(old, p.id).toBeGreaterThan(price)
      }
      for (const [, hex] of p.colors) expect(hex, p.id).toMatch(/^#[0-9A-Fa-f]{6}$/)
    }
  })

  it('chaque marque affichée possède au moins un produit', () => {
    expect(repo.brandsWithCount().length).toBe(rawBrands.length)
  })
})

describe('Modèle Product', () => {
  const brand = new Brand({ id: 'google', name: 'Google Pixel' })
  const p = new Product({ id: 'x', brand: 'google', name: 'Pixel 9a', variants: [['256 Go', 380000], ['128 Go', 330000, 365000]], specs: { network: '5G', ram: 8 } }, brand)

  it('calcule le prix de base, la promo et le nom complet', () => {
    expect(p.basePrice).toBe(330000)
    expect(p.discountPercent).toBe(10)
    expect(p.isPromo).toBe(true)
    expect(p.fullName).toBe('Google Pixel 9a')
    expect(p.is5G).toBe(true)
  })

  it('évite les doublons de marque dans le nom', () => {
    expect(repo.findById('nokia-g42').fullName).toBe('Nokia G42 5G')
    expect(repo.findById('galaxy-a56').fullName).toBe('Samsung Galaxy A56 5G')
  })

  it('recherche sans tenir compte des accents ni de la casse', () => {
    expect(repo.findById('iphone-15').matches('RECONDITIONNE iphone')).toBe(true)
    expect(repo.findById('iphone-15').matches('samsung')).toBe(false)
  })

  it('refuse un produit sans marque ou sans variante', () => {
    expect(() => new Product({ id: 'a', variants: [['1 Go', 1]] }, null)).toThrow()
    expect(() => new Product({ id: 'a', variants: [] }, brand)).toThrow()
  })
})

describe('Formatage', () => {
  it('formate les prix en FCFA', () => {
    expect(formatPrice(1250000).replace(/\s/g, ' ')).toBe('1 250 000 FCFA')
    expect(formatPrice(undefined)).toBe('—')
  })
  it('normalise le texte', () => expect(normalize('  Téléphone ÉTÉ ')).toBe('telephone ete'))
  it('convertit les capacités', () => {
    expect(toGigabytes('1 To')).toBe(1024)
    expect(toGigabytes('256 Go')).toBe(256)
  })
})

describe('Filtres du catalogue', () => {
  const all = repo.all()
  it('filtre par marque, 5G, état, budget et RAM', () => {
    expect(applyFilters(all, { ...baseFilters, brands: ['apple'] }).every((p) => p.brand.id === 'apple')).toBe(true)
    expect(applyFilters(all, { ...baseFilters, network: '5G' }).every((p) => p.is5G)).toBe(true)
    expect(applyFilters(all, { ...baseFilters, condition: 'reconditionne' }).every((p) => p.condition === 'reconditionne')).toBe(true)
    expect(applyFilters(all, { ...baseFilters, max: 100000 }).every((p) => p.basePrice <= 100000)).toBe(true)
    expect(applyFilters(all, { ...baseFilters, ram: 12 }).every((p) => p.ram >= 12)).toBe(true)
  })
  it('trie par prix', () => {
    const asc = applyFilters(all, { ...baseFilters, sort: 'prix-asc' }).map((p) => p.basePrice)
    expect(asc).toEqual([...asc].sort((a, b) => a - b))
  })
  it('renvoie une liste vide si rien ne correspond', () => {
    expect(applyFilters(all, { ...baseFilters, q: 'zzzzzz' })).toHaveLength(0)
  })
})

describe('Liens de contact', () => {
  it('génère un lien WhatsApp valide avec message encodé', () => {
    const p = repo.findById('iphone-17')
    const link = contact.whatsappLink(contact.orderMessage(p, { variant: p.variants[1], color: p.colors[0] }))
    expect(link.startsWith('https://wa.me/237698686729?text=')).toBe(true)
    const text = decodeURIComponent(link.split('text=')[1])
    expect(text).toContain('iPhone 17')
    expect(text).toContain('512 Go')
    expect(text).toContain('Lavande')
  })
  it('génère le lien d’appel', () => expect(contact.telLink).toBe('tel:+237698686729'))
})
