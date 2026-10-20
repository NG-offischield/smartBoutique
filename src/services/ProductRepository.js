import rawBrands from '@/data/brands'
import rawProducts from '@/data/products'
import { Brand } from '@/models/Brand'
import { Product } from '@/models/Product'

/**
 * Couche d'accès aux données : transforme les données brutes en modèles
 * et expose des requêtes de lecture. Pour brancher une API plus tard,
 * il suffit de modifier cette classe sans toucher aux vues.
 */
export class ProductRepository {
  constructor(brandsData = rawBrands, productsData = rawProducts) {
    this._brands = brandsData.map((b) => new Brand(b))
    const byId = new Map(this._brands.map((b) => [b.id, b]))

    const seen = new Set()
    this._products = productsData.map((p) => {
      if (seen.has(p.id)) throw new Error(`Produit en double : "${p.id}"`)
      seen.add(p.id)
      return new Product(p, byId.get(p.brand))
    })
    this._brandById = byId
  }

  all() {
    return [...this._products]
  }

  findById(id) {
    return this._products.find((p) => p.id === id) || null
  }

  featured(limit = 8) {
    return this._products.filter((p) => p.featured).slice(0, limit)
  }

  promotions(limit = 8) {
    return this._products.filter((p) => p.isPromo).slice(0, limit)
  }

  newest(limit = 8) {
    return [...this._products].sort((a, b) => (b.year ?? 0) - (a.year ?? 0)).slice(0, limit)
  }

  byBrand(brandId) {
    return this._products.filter((p) => p.brand.id === brandId)
  }

  /** Produits similaires : même marque d'abord, puis gamme de prix proche. */
  related(product, limit = 4) {
    return this._products
      .filter((p) => p.id !== product.id)
      .map((p) => ({
        p,
        score: (p.brand.id === product.brand.id ? 0 : 1) + Math.abs(p.basePrice - product.basePrice) / product.basePrice
      }))
      .sort((a, b) => a.score - b.score)
      .slice(0, limit)
      .map(({ p }) => p)
  }

  brands() {
    return [...this._brands]
  }

  /** Marques ayant au moins un produit, avec leur nombre de produits. */
  brandsWithCount() {
    return this._brands
      .map((brand) => ({ brand, count: this.byBrand(brand.id).length }))
      .filter((b) => b.count > 0)
  }

  brandById(id) {
    return this._brandById.get(id) || null
  }

  priceBounds() {
    const prices = this._products.flatMap((p) => p.variants.map((v) => v.price))
    return { min: Math.min(...prices), max: Math.max(...prices) }
  }

  ramOptions() {
    return [...new Set(this._products.map((p) => p.ram).filter(Boolean))].sort((a, b) => a - b)
  }

  storageOptions() {
    return [...new Set(this._products.flatMap((p) => p.storageOptions))].sort((a, b) => a - b)
  }
}

export const productRepository = new ProductRepository()
