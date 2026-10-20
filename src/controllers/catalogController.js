import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { productRepository } from '@/services/ProductRepository'

export const SORTS = [
  { value: 'pertinence', label: 'Pertinence' },
  { value: 'prix-asc', label: 'Prix croissant' },
  { value: 'prix-desc', label: 'Prix décroissant' },
  { value: 'recent', label: 'Plus récents' },
  { value: 'note', label: 'Mieux notés' }
]

export const PAGE_SIZE = 12

const toList = (v) => (Array.isArray(v) ? v : v ? String(v).split(',') : []).filter(Boolean)
const toNumber = (v) => {
  const n = Number(v)
  return Number.isFinite(n) && n > 0 ? n : null
}

/** Applique filtres + tri à une liste de produits (fonction pure, testable). */
export function applyFilters(products, f) {
  let list = products.filter((p) => {
    if (f.q && !p.matches(f.q)) return false
    if (f.brands.length && !f.brands.includes(p.brand.id)) return false
    if (f.condition && p.condition !== f.condition) return false
    if (f.network === '5G' && !p.is5G) return false
    if (f.ram && p.ram < f.ram) return false
    if (f.storage && !p.storageOptions.some((s) => s >= f.storage)) return false
    if (f.min && !p.variants.some((v) => v.price >= f.min)) return false
    if (f.max && p.basePrice > f.max) return false
    if (f.promo && !p.isPromo) return false
    if (f.available && p.stock !== 'en-stock') return false
    return true
  })

  const sorters = {
    'prix-asc': (a, b) => a.basePrice - b.basePrice,
    'prix-desc': (a, b) => b.basePrice - a.basePrice,
    recent: (a, b) => (b.year ?? 0) - (a.year ?? 0) || b.basePrice - a.basePrice,
    note: (a, b) => b.rating - a.rating || b.reviews - a.reviews,
    pertinence: (a, b) => Number(b.featured) - Number(a.featured) || b.reviews - a.reviews
  }
  list = [...list].sort(sorters[f.sort] || sorters.pertinence)
  return list
}

/**
 * Contrôleur du catalogue : l'état des filtres vit dans l'URL
 * (partageable, bouton « retour » fonctionnel, rechargement sans perte).
 */
export function useCatalog() {
  const route = useRoute()
  const router = useRouter()

  const filters = computed(() => {
    const q = route.query
    return {
      q: typeof q.q === 'string' ? q.q : '',
      brands: toList(q.marques),
      condition: ['neuf', 'reconditionne'].includes(q.etat) ? q.etat : '',
      network: q.reseau === '5G' ? '5G' : '',
      ram: toNumber(q.ram),
      storage: toNumber(q.stockage),
      min: toNumber(q.min),
      max: toNumber(q.max),
      promo: q.promo === '1',
      available: q.dispo === '1',
      sort: SORTS.some((s) => s.value === q.tri) ? q.tri : 'pertinence',
      page: toNumber(q.page) || 1
    }
  })

  const results = computed(() => applyFilters(productRepository.all(), filters.value))
  const pageCount = computed(() => Math.max(1, Math.ceil(results.value.length / PAGE_SIZE)))
  const page = computed(() => Math.min(filters.value.page, pageCount.value))
  const paginated = computed(() => results.value.slice((page.value - 1) * PAGE_SIZE, page.value * PAGE_SIZE))

  const activeCount = computed(() => {
    const f = filters.value
    return [f.q, f.condition, f.network, f.ram, f.storage, f.min, f.max, f.promo, f.available].filter(Boolean).length + f.brands.length
  })

  const KEYS = { q: 'q', brands: 'marques', condition: 'etat', network: 'reseau', ram: 'ram', storage: 'stockage', min: 'min', max: 'max', promo: 'promo', available: 'dispo', sort: 'tri', page: 'page' }

  /** Met à jour un ou plusieurs filtres (et revient à la page 1 sauf changement de page). */
  function update(patch) {
    const next = { ...route.query }
    for (const [key, value] of Object.entries(patch)) {
      const param = KEYS[key]
      let v = value
      if (Array.isArray(v)) v = v.join(',')
      if (typeof v === 'boolean') v = v ? '1' : ''
      if (v === '' || v === null || v === undefined || (key === 'sort' && v === 'pertinence') || (key === 'page' && v === 1)) {
        delete next[param]
      } else {
        next[param] = String(v)
      }
    }
    if (!('page' in patch)) delete next.page
    router.replace({ query: next })
  }

  function toggleBrand(id) {
    const set = new Set(filters.value.brands)
    set.has(id) ? set.delete(id) : set.add(id)
    update({ brands: [...set] })
  }

  function reset() {
    router.replace({ query: {} })
  }

  return {
    filters,
    results,
    paginated,
    page,
    pageCount,
    activeCount,
    update,
    toggleBrand,
    reset,
    facets: {
      brands: productRepository.brandsWithCount(),
      ram: productRepository.ramOptions(),
      storage: productRepository.storageOptions(),
      price: productRepository.priceBounds()
    }
  }
}
