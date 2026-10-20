<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Search, X, ArrowRight } from 'lucide-vue-next'
import ProductVisual from '@/views/components/ProductVisual.vue'
import { productRepository } from '@/services/ProductRepository'
import { formatPrice } from '@/models/format'

const props = defineProps({ open: { type: Boolean, default: false } })
const emit = defineEmits(['close'])
const router = useRouter()

const dialog = ref(null)
const input = ref(null)
const query = ref('')
const active = ref(0)

const suggestions = ['iPhone 17', 'Galaxy S25', 'Redmi', 'Tecno Camon', 'Infinix', '5G', 'Pixel']
const results = computed(() => {
  const q = query.value.trim()
  if (!q) return productRepository.featured(5)
  return productRepository.all().filter((p) => p.matches(q)).slice(0, 6)
})
const total = computed(() => (query.value.trim() ? productRepository.all().filter((p) => p.matches(query.value)).length : 0))

watch(() => props.open, async (open) => {
  if (!dialog.value) return
  if (open && !dialog.value.open) {
    dialog.value.showModal()
    query.value = ''
    active.value = 0
    await nextTick()
    input.value?.focus()
  } else if (!open && dialog.value.open) {
    dialog.value.close()
  }
})
watch(query, () => (active.value = 0))

function go(product) {
  emit('close')
  router.push(product.url)
}
function seeAll() {
  emit('close')
  router.push({ path: '/telephones', query: query.value.trim() ? { q: query.value.trim() } : {} })
}
function onKey(e) {
  const max = results.value.length
  if (e.key === 'ArrowDown') { e.preventDefault(); active.value = (active.value + 1) % Math.max(max, 1) }
  else if (e.key === 'ArrowUp') { e.preventDefault(); active.value = (active.value - 1 + max) % Math.max(max, 1) }
  else if (e.key === 'Enter') {
    e.preventDefault()
    if (query.value.trim() && results.value[active.value]) go(results.value[active.value])
    else seeAll()
  }
}
function onBackdrop(e) {
  if (e.target === dialog.value) emit('close')
}
</script>

<template>
  <dialog ref="dialog" class="search" aria-labelledby="search-title" @close="emit('close')" @click="onBackdrop">
    <div class="search__panel">
      <h2 id="search-title" class="sr-only">Rechercher un téléphone</h2>
      <div class="search__bar">
        <Search aria-hidden="true" />
        <input
          ref="input"
          v-model="query"
          type="search"
          placeholder="Marque, modèle, processeur…"
          aria-label="Rechercher un téléphone"
          role="combobox"
          aria-expanded="true"
          aria-controls="search-results"
          :aria-activedescendant="results.length ? `sr-${active}` : undefined"
          autocomplete="off"
          @keydown="onKey"
        />
        <button type="button" class="icon-btn" aria-label="Fermer la recherche" @click="emit('close')"><X /></button>
      </div>

      <div v-if="!query.trim()" class="search__suggest">
        <span class="muted">Recherches populaires :</span>
        <button v-for="s in suggestions" :key="s" type="button" class="chip" @click="query = s">{{ s }}</button>
      </div>

      <p class="search__label">{{ query.trim() ? `${total} résultat${total > 1 ? 's' : ''}` : 'Coups de cœur' }}</p>
      <ul v-if="results.length" id="search-results" class="search__results" role="listbox" aria-label="Résultats">
        <li
          v-for="(p, i) in results"
          :id="`sr-${i}`"
          :key="p.id"
          role="option"
          :aria-selected="i === active"
          class="search__item"
          :class="{ 'is-active': i === active }"
          @click="go(p)"
          @mouseenter="active = i"
        >
          <span class="search__thumb"><ProductVisual :product="p" /></span>
          <span class="search__info">
            <strong>{{ p.fullName }}</strong>
            <small>{{ p.specs.chip }} · {{ p.ram }} Go RAM · {{ p.conditionLabel }}</small>
          </span>
          <span class="search__price">{{ formatPrice(p.basePrice) }}</span>
        </li>
      </ul>
      <div v-else class="search__empty">
        <p>Aucun téléphone ne correspond à « {{ query }} ».</p>
        <p class="muted">Essayez une autre marque ou demandez-nous directement sur WhatsApp : nous trouvons aussi les modèles sur commande.</p>
      </div>

      <button v-if="query.trim() && total" type="button" class="btn btn--primary btn--block" @click="seeAll">
        Voir les {{ total }} résultats <ArrowRight />
      </button>
    </div>
  </dialog>
</template>

<style scoped>
.search { width: min(680px, calc(100vw - 24px)); max-height: min(720px, calc(100vh - 48px)); margin: 8vh auto auto; padding: 0; border: none; border-radius: var(--radius-lg); background: var(--surface); color: var(--text); box-shadow: 0 40px 80px -20px rgb(0 0 0 / 0.5); }
.search::backdrop { background: rgb(8 20 15 / 0.55); backdrop-filter: blur(4px); }
.search[open] { animation: pop 0.25s var(--ease); }
@keyframes pop { from { opacity: 0; transform: translateY(-10px) scale(0.98); } }
.search__panel { padding: 16px; display: grid; gap: 14px; }
.search__bar { display: flex; align-items: center; gap: 10px; padding: 0 6px 0 14px; border: 2px solid var(--brand-400); border-radius: var(--radius); }
.search__bar > svg { width: 20px; height: 20px; color: var(--text-soft); flex-shrink: 0; }
.search__bar input { flex: 1; min-width: 0; height: 54px; border: none; background: none; font-size: 1.05rem; outline: none; }
.search__bar .icon-btn { border: none; width: 40px; height: 40px; }
.search__suggest { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 0.85rem; }
.search__suggest .chip { min-height: 32px; }
.search__label { margin: 4px 0 0; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: var(--text-soft); }
.search__results { display: grid; gap: 4px; }
.search__item { display: flex; align-items: center; gap: 14px; padding: 8px 12px; border-radius: 12px; cursor: pointer; }
.search__item.is-active { background: var(--brand-50); }
.search__thumb { width: 34px; height: 56px; flex-shrink: 0; }
.search__info { flex: 1; display: grid; min-width: 0; }
.search__info strong { font-size: 0.95rem; }
.search__info small { color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.search__price { font-weight: 700; font-size: 0.9rem; white-space: nowrap; }
.search__empty { text-align: center; padding: 16px; }
@media (max-width: 560px) { .search { margin-top: 12px; } .search__price { display: none; } }
</style>
