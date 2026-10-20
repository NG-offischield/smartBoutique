<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { SlidersHorizontal, X, Search, SearchX, RotateCcw, ChevronLeft, ChevronRight } from 'lucide-vue-next'
import ProductCard from '@/views/components/ProductCard.vue'
import WhatsAppIcon from '@/views/components/WhatsAppIcon.vue'
import { useCatalog, SORTS } from '@/controllers/catalogController'
import { contact } from '@/controllers/contactController'
import { formatPrice } from '@/models/format'

const { filters, results, paginated, page, pageCount, activeCount, update, toggleBrand, reset, facets } = useCatalog()

// Recherche avec anti-rebond pour ne pas mettre à jour l'URL à chaque frappe
const search = ref(filters.value.q)
let timer
watch(search, (v) => {
  clearTimeout(timer)
  timer = setTimeout(() => update({ q: v.trim() }), 250)
})
watch(() => filters.value.q, (v) => {
  if (v !== search.value.trim()) search.value = v
})
onBeforeUnmount(() => clearTimeout(timer))

const priceSteps = [50000, 100000, 150000, 200000, 300000, 500000, 800000, 1000000]
const formatStorage = (gb) => (gb >= 1024 ? `${gb / 1024} To` : `${gb} Go`)

const filtersOpen = ref(false)
watch(filtersOpen, (open) => document.body.style.setProperty('overflow', open ? 'hidden' : ''))
onBeforeUnmount(() => document.body.style.removeProperty('overflow'))

const title = computed(() => {
  const f = filters.value
  if (f.brands.length === 1) {
    const b = facets.brands.find((x) => x.brand.id === f.brands[0])
    if (b) return `Téléphones ${b.brand.name}`
  }
  if (f.promo) return 'Promotions'
  if (f.condition === 'reconditionne') return 'Téléphones reconditionnés'
  if (f.network === '5G') return 'Smartphones 5G'
  return 'Tous nos téléphones'
})

/** Puces des filtres actifs, chacune avec son action de suppression. */
const chips = computed(() => {
  const f = filters.value
  const list = []
  if (f.q) list.push({ key: 'q', label: `« ${f.q} »`, clear: () => { search.value = ''; update({ q: '' }) } })
  f.brands.forEach((id) => {
    const b = facets.brands.find((x) => x.brand.id === id)
    if (b) list.push({ key: `b-${id}`, label: b.brand.name, clear: () => toggleBrand(id) })
  })
  if (f.condition) list.push({ key: 'etat', label: f.condition === 'neuf' ? 'Neuf' : 'Reconditionné', clear: () => update({ condition: '' }) })
  if (f.network) list.push({ key: 'reseau', label: '5G', clear: () => update({ network: '' }) })
  if (f.ram) list.push({ key: 'ram', label: `${f.ram} Go RAM et +`, clear: () => update({ ram: '' }) })
  if (f.storage) list.push({ key: 'sto', label: `${formatStorage(f.storage)} et +`, clear: () => update({ storage: '' }) })
  if (f.min) list.push({ key: 'min', label: `Dès ${formatPrice(f.min)}`, clear: () => update({ min: '' }) })
  if (f.max) list.push({ key: 'max', label: `Jusqu’à ${formatPrice(f.max)}`, clear: () => update({ max: '' }) })
  if (f.promo) list.push({ key: 'promo', label: 'En promo', clear: () => update({ promo: false }) })
  if (f.available) list.push({ key: 'dispo', label: 'En stock', clear: () => update({ available: false }) })
  return list
})

function goToPage(n) {
  update({ page: n })
  document.getElementById('catalog-top')?.scrollIntoView({ behavior: 'smooth' })
}

function resetAll() {
  search.value = ''
  reset()
}
</script>

<template>
  <div class="catalog">
    <header class="page-hero">
      <div class="container">
        <nav class="crumbs" aria-label="Fil d’Ariane">
          <RouterLink to="/">Accueil</RouterLink><span aria-hidden="true">/</span><span aria-current="page">Téléphones</span>
        </nav>
        <h1>{{ title }}</h1>
        <p class="muted">Filtrez par marque, budget ou caractéristiques et commandez en un clic sur WhatsApp.</p>
      </div>
    </header>

    <div id="catalog-top" class="container catalog__layout">
      <!-- ========== FILTRES ========== -->
      <div v-if="filtersOpen" class="filters__overlay" aria-hidden="true" @click="filtersOpen = false"></div>
      <aside id="filters" class="filters" :class="{ 'is-open': filtersOpen }" aria-label="Filtres">
        <div class="filters__head">
          <h2>Filtres</h2>
          <button v-if="activeCount" type="button" class="link-btn" @click="resetAll"><RotateCcw aria-hidden="true" /> Tout effacer</button>
          <button type="button" class="icon-btn filters__close" aria-label="Fermer les filtres" @click="filtersOpen = false"><X /></button>
        </div>

        <div class="filters__body">
          <fieldset class="fgroup">
            <legend>Marques</legend>
            <div class="fbrands">
              <label v-for="{ brand, count } in facets.brands" :key="brand.id" class="check">
                <input type="checkbox" :checked="filters.brands.includes(brand.id)" @change="toggleBrand(brand.id)" />
                <span class="check__box" aria-hidden="true"></span>
                <span class="check__label">{{ brand.name }}</span>
                <small>{{ count }}</small>
              </label>
            </div>
          </fieldset>

          <fieldset class="fgroup">
            <legend>Budget</legend>
            <div class="fprice">
              <div class="field">
                <label for="f-min">Minimum</label>
                <select id="f-min" class="select" :value="filters.min || ''" @change="update({ min: $event.target.value })">
                  <option value="">Indifférent</option>
                  <option v-for="p in priceSteps" :key="p" :value="p" :disabled="filters.max && p > filters.max">{{ formatPrice(p) }}</option>
                </select>
              </div>
              <div class="field">
                <label for="f-max">Maximum</label>
                <select id="f-max" class="select" :value="filters.max || ''" @change="update({ max: $event.target.value })">
                  <option value="">Indifférent</option>
                  <option v-for="p in priceSteps" :key="p" :value="p" :disabled="filters.min && p < filters.min">{{ formatPrice(p) }}</option>
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset class="fgroup">
            <legend>État</legend>
            <div class="chips">
              <button type="button" class="chip" :aria-pressed="!filters.condition" @click="update({ condition: '' })">Tous</button>
              <button type="button" class="chip" :aria-pressed="filters.condition === 'neuf'" @click="update({ condition: 'neuf' })">Neuf</button>
              <button type="button" class="chip" :aria-pressed="filters.condition === 'reconditionne'" @click="update({ condition: 'reconditionne' })">Reconditionné</button>
            </div>
          </fieldset>

          <fieldset class="fgroup">
            <legend>Mémoire vive (RAM)</legend>
            <div class="chips">
              <button type="button" class="chip" :aria-pressed="!filters.ram" @click="update({ ram: '' })">Toutes</button>
              <button v-for="r in facets.ram" :key="r" type="button" class="chip" :aria-pressed="filters.ram === r" @click="update({ ram: r })">{{ r }} Go+</button>
            </div>
          </fieldset>

          <fieldset class="fgroup">
            <legend>Stockage</legend>
            <div class="chips">
              <button type="button" class="chip" :aria-pressed="!filters.storage" @click="update({ storage: '' })">Tous</button>
              <button v-for="s in facets.storage" :key="s" type="button" class="chip" :aria-pressed="filters.storage === s" @click="update({ storage: s })">{{ formatStorage(s) }}+</button>
            </div>
          </fieldset>

          <fieldset class="fgroup">
            <legend>Options</legend>
            <label class="switch">
              <input type="checkbox" :checked="filters.network === '5G'" @change="update({ network: $event.target.checked ? '5G' : '' })" />
              <span class="switch__track" aria-hidden="true"></span> Compatible 5G
            </label>
            <label class="switch">
              <input type="checkbox" :checked="filters.promo" @change="update({ promo: $event.target.checked })" />
              <span class="switch__track" aria-hidden="true"></span> En promotion
            </label>
            <label class="switch">
              <input type="checkbox" :checked="filters.available" @change="update({ available: $event.target.checked })" />
              <span class="switch__track" aria-hidden="true"></span> En stock immédiatement
            </label>
          </fieldset>
        </div>

        <div class="filters__foot">
          <button type="button" class="btn btn--primary btn--block" @click="filtersOpen = false">
            Voir {{ results.length }} résultat{{ results.length > 1 ? 's' : '' }}
          </button>
        </div>
      </aside>

      <!-- ========== RÉSULTATS ========== -->
      <section class="results" aria-labelledby="results-count">
        <div class="toolbar">
          <div class="toolbar__search">
            <Search aria-hidden="true" />
            <input v-model="search" type="search" class="input" placeholder="Rechercher un modèle…" aria-label="Rechercher dans le catalogue" />
          </div>
          <button type="button" class="btn btn--outline toolbar__filters" aria-controls="filters" :aria-expanded="filtersOpen" @click="filtersOpen = true">
            <SlidersHorizontal /> Filtres <span v-if="activeCount" class="badge badge--nouveau">{{ activeCount }}</span>
          </button>
          <div class="toolbar__sort">
            <label for="sort" class="sr-only">Trier par</label>
            <select id="sort" class="select" :value="filters.sort" @change="update({ sort: $event.target.value })">
              <option v-for="s in SORTS" :key="s.value" :value="s.value">{{ s.label }}</option>
            </select>
          </div>
        </div>

        <div class="results__meta">
          <p id="results-count" aria-live="polite"><strong>{{ results.length }}</strong> téléphone{{ results.length > 1 ? 's' : '' }} trouvé{{ results.length > 1 ? 's' : '' }}</p>
          <ul v-if="chips.length" class="active-chips" aria-label="Filtres actifs">
            <li v-for="c in chips" :key="c.key">
              <button type="button" class="chip chip--removable" :aria-label="`Retirer le filtre ${c.label}`" @click="c.clear()">{{ c.label }} <X aria-hidden="true" /></button>
            </li>
          </ul>
        </div>

        <TransitionGroup v-if="paginated.length" tag="div" name="list" class="grid grid--products">
          <ProductCard v-for="p in paginated" :key="p.id" :product="p" />
        </TransitionGroup>

        <div v-else class="empty">
          <SearchX class="empty__icon" aria-hidden="true" />
          <h2>Aucun téléphone ne correspond</h2>
          <p class="muted">Essayez d’élargir vos critères… ou demandez-nous : nous trouvons aussi les modèles sur commande.</p>
          <div class="empty__actions">
            <button type="button" class="btn btn--primary" @click="resetAll"><RotateCcw /> Réinitialiser les filtres</button>
            <a :href="contact.whatsappLink(contact.greeting() + '\nJe cherche un téléphone que je ne trouve pas sur le site : ' + (filters.q || ''))" target="_blank" rel="noopener" class="btn btn--whatsapp"><WhatsAppIcon /> Demander sur WhatsApp</a>
          </div>
        </div>

        <nav v-if="pageCount > 1" class="pager" aria-label="Pagination">
          <button type="button" class="icon-btn" :disabled="page === 1" aria-label="Page précédente" @click="goToPage(page - 1)"><ChevronLeft /></button>
          <button
            v-for="n in pageCount"
            :key="n"
            type="button"
            class="icon-btn"
            :class="{ 'is-active': n === page }"
            :aria-current="n === page ? 'page' : undefined"
            :aria-label="`Page ${n}`"
            @click="goToPage(n)"
          >{{ n }}</button>
          <button type="button" class="icon-btn" :disabled="page === pageCount" aria-label="Page suivante" @click="goToPage(page + 1)"><ChevronRight /></button>
        </nav>
      </section>
    </div>
  </div>
</template>

<style scoped>
.page-hero { background: var(--gradient-soft); padding: 32px 0 36px; border-bottom: 1px solid var(--border); }
.page-hero h1 { font-size: clamp(1.8rem, 3.5vw, 2.6rem); margin-top: 12px; }
.page-hero p { margin: 0; }
.crumbs { display: flex; gap: 8px; font-size: 0.85rem; color: var(--text-muted); flex-wrap: wrap; }
.crumbs a:hover { color: var(--brand-500); text-decoration: underline; }
.catalog__layout { display: grid; grid-template-columns: 280px 1fr; gap: 32px; padding-top: 32px; padding-bottom: 80px; align-items: start; }

.filters { position: sticky; top: calc(var(--header-h) + 50px); max-height: calc(100vh - var(--header-h) - 70px); overflow-y: auto; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); scrollbar-width: thin; }
.filters__head { display: flex; align-items: center; justify-content: space-between; gap: 8px; padding: 18px 20px 6px; }
.filters__head h2 { font-size: 1.1rem; margin: 0; }
.filters__close, .filters__foot, .toolbar__filters { display: none; }
.filters__body { padding: 0 20px 12px; }
.link-btn { background: none; border: none; display: inline-flex; align-items: center; gap: 6px; color: var(--brand-500); font-weight: 600; font-size: 0.85rem; padding: 6px; border-radius: 8px; }
.link-btn svg { width: 15px; height: 15px; }
.link-btn:hover { text-decoration: underline; }
.fgroup { border: none; padding: 16px 0; margin: 0; border-bottom: 1px solid var(--border); display: grid; gap: 10px; }
.fgroup:last-child { border-bottom: none; }
.fgroup legend { font-weight: 700; font-size: 0.9rem; padding: 0; margin-bottom: 10px; float: left; width: 100%; }
.fbrands { display: grid; gap: 2px; clear: both; }
.check { display: flex; align-items: center; gap: 10px; padding: 7px 6px; border-radius: 8px; cursor: pointer; font-size: 0.92rem; }
.check:hover { background: var(--surface-2); }
.check input { position: absolute; opacity: 0; pointer-events: none; }
.check__box { width: 20px; height: 20px; border-radius: 6px; border: 2px solid var(--border); flex-shrink: 0; display: grid; place-items: center; transition: all 0.15s; }
.check input:checked + .check__box { background: var(--brand-500); border-color: var(--brand-500); }
.check input:checked + .check__box::after { content: ''; width: 5px; height: 10px; border: solid #fff; border-width: 0 2px 2px 0; transform: rotate(45deg) translate(-1px, -1px); }
.check input:focus-visible + .check__box { outline: 3px solid var(--brand-400); outline-offset: 2px; }
.check__label { flex: 1; }
.check small { color: var(--text-soft); font-size: 0.78rem; }
.fprice { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; clear: both; }
.fprice .select { min-height: 42px; font-size: 0.85rem; padding-left: 10px; padding-right: 30px; background-position: right 6px center; }
.fprice label { font-size: 0.78rem; color: var(--text-muted); font-weight: 500; }
.chips { display: flex; flex-wrap: wrap; gap: 6px; clear: both; }
.chips .chip { min-height: 34px; padding: 0 12px; font-size: 0.82rem; }
.switch { display: flex; align-items: center; gap: 12px; cursor: pointer; font-size: 0.92rem; padding: 4px 0; clear: both; }
.switch input { position: absolute; opacity: 0; pointer-events: none; }
.switch__track { position: relative; width: 42px; height: 24px; border-radius: 999px; background: var(--border); flex-shrink: 0; transition: background 0.2s; }
.switch__track::after { content: ''; position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; border-radius: 50%; background: #fff; box-shadow: 0 1px 3px rgb(0 0 0 / 0.3); transition: transform 0.2s var(--ease); }
.switch input:checked + .switch__track { background: var(--brand-500); }
.switch input:checked + .switch__track::after { transform: translateX(18px); }
.switch input:focus-visible + .switch__track { outline: 3px solid var(--brand-400); outline-offset: 2px; }

.toolbar { display: flex; gap: 12px; align-items: center; }
.toolbar__search { position: relative; flex: 1; }
.toolbar__search svg { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); width: 18px; height: 18px; color: var(--text-soft); pointer-events: none; }
.toolbar__search .input { padding-left: 42px; border-radius: 999px; }
.toolbar__sort .select { border-radius: 999px; min-width: 220px; }
.results__meta { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin: 18px 0; }
.results__meta p { margin: 0; color: var(--text-muted); }
.results__meta strong { color: var(--text); }
.active-chips { display: flex; flex-wrap: wrap; gap: 6px; }
.chip--removable { min-height: 32px; padding: 0 10px 0 12px; font-size: 0.8rem; background: var(--brand-50); border-color: var(--brand-100); }
.chip--removable svg { width: 14px; height: 14px; }
.chip--removable:hover { border-color: var(--danger); color: var(--danger); }

.empty { text-align: center; padding: 64px 20px; border: 2px dashed var(--border); border-radius: var(--radius-lg); }
.empty__icon { width: 56px; height: 56px; margin: 0 auto 16px; color: var(--text-soft); }
.empty__actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 20px; }
.pager { display: flex; justify-content: center; gap: 8px; margin-top: 40px; flex-wrap: wrap; }
.pager .icon-btn { font-weight: 600; }
.pager .icon-btn:disabled { opacity: 0.4; cursor: not-allowed; }

@media (max-width: 960px) {
  .catalog__layout { grid-template-columns: 1fr; padding-top: 20px; }
  .toolbar__filters { display: inline-flex; }
  .filters { position: fixed; inset: 0 0 0 auto; top: 0; width: min(380px, 100%); max-height: none; height: 100dvh; z-index: 70; border-radius: 0; border: none; display: flex; flex-direction: column; transform: translateX(100%); transition: transform 0.35s var(--ease); visibility: hidden; }
  .filters.is-open { transform: none; visibility: visible; box-shadow: -20px 0 60px rgb(0 0 0 / 0.3); }
  .filters__body { flex: 1; overflow-y: auto; }
  .filters__close { display: inline-grid; }
  .filters__head { padding: 16px 20px; border-bottom: 1px solid var(--border); }
  .filters__foot { display: block; padding: 16px 20px; border-top: 1px solid var(--border); }
  .filters__overlay { position: fixed; inset: 0; background: rgb(10 15 31 / 0.5); z-index: 69; }
}
@media (max-width: 640px) {
  .toolbar { flex-wrap: wrap; }
  .toolbar__search { flex-basis: 100%; }
  .toolbar__filters, .toolbar__sort { flex: 1; }
  .toolbar__sort .select { min-width: 0; }
}
</style>
