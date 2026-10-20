<script setup>
import { computed, ref } from 'vue'
import { ArrowLeftRight, X, Plus, Trash2 } from 'lucide-vue-next'
import PageHero from '@/views/components/PageHero.vue'
import ProductVisual from '@/views/components/ProductVisual.vue'
import WhatsAppIcon from '@/views/components/WhatsAppIcon.vue'
import { useCompare, MAX_COMPARE } from '@/controllers/compareController'
import { contact } from '@/controllers/contactController'
import { productRepository } from '@/services/ProductRepository'
import { formatPrice } from '@/models/format'

const { items, count, remove, clear, toggle, isCompared } = useCompare()
const slots = computed(() => MAX_COMPARE - count.value)
const picker = ref('')
const options = computed(() => productRepository.all().filter((p) => !isCompared(p.id)))
function add() {
  const p = productRepository.findById(picker.value)
  if (p) toggle(p)
  picker.value = ''
}

const rows = [
  { label: 'Prix', get: (p) => `dès ${formatPrice(p.basePrice)}` },
  { label: 'État', get: (p) => p.conditionLabel },
  { label: 'Écran', get: (p) => p.specs.screen },
  { label: 'Processeur', get: (p) => p.specs.chip },
  { label: 'RAM', get: (p) => (p.ram ? `${p.ram} Go` : '—') },
  { label: 'Stockage', get: (p) => p.variants.map((v) => v.storage).join(' / ') },
  { label: 'Appareil photo', get: (p) => p.specs.camera },
  { label: 'Selfie', get: (p) => p.specs.selfie },
  { label: 'Batterie', get: (p) => p.specs.battery },
  { label: 'Système', get: (p) => p.specs.os },
  { label: 'Réseau', get: (p) => p.specs.network },
  { label: 'Disponibilité', get: (p) => p.stockInfo.label }
]
</script>

<template>
  <div>
    <PageHero title="Comparateur" :subtitle="`Comparez jusqu’à ${MAX_COMPARE} téléphones côte à côte pour faire le bon choix.`" />
    <section class="section">
      <div class="container">
        <div class="cmp-tools">
          <div v-if="slots > 0" class="cmp-add">
            <label for="cmp-pick" class="sr-only">Ajouter un téléphone à comparer</label>
            <select id="cmp-pick" v-model="picker" class="select" @change="add">
              <option value="">+ Ajouter un téléphone ({{ slots }} place{{ slots > 1 ? 's' : '' }} libre{{ slots > 1 ? 's' : '' }})</option>
              <option v-for="p in options" :key="p.id" :value="p.id">{{ p.fullName }} — {{ formatPrice(p.basePrice) }}</option>
            </select>
          </div>
          <div v-if="count" class="cmp-actions">
            <button type="button" class="btn btn--ghost" @click="clear"><Trash2 /> Vider</button>
            <a :href="contact.whatsappLink(contact.listMessage(items, 'les téléphones que j’hésite à acheter'))" target="_blank" rel="noopener" class="btn btn--whatsapp"><WhatsAppIcon /> Demander conseil</a>
          </div>
        </div>

        <div v-if="count" class="cmp-scroll" tabindex="0" aria-label="Tableau comparatif (défilement horizontal possible)">
          <table class="cmp">
            <caption class="sr-only">Comparaison de {{ count }} téléphones</caption>
            <thead>
              <tr>
                <td></td>
                <th v-for="p in items" :key="p.id" scope="col">
                  <div class="cmp__head">
                    <button type="button" class="cmp__remove" :aria-label="`Retirer ${p.fullName}`" @click="remove(p.id)"><X /></button>
                    <RouterLink :to="p.url" class="cmp__visual" tabindex="-1" aria-hidden="true"><ProductVisual :product="p" /></RouterLink>
                    <RouterLink :to="p.url" class="cmp__name">{{ p.fullName }}</RouterLink>
                  </div>
                </th>
                <td v-for="n in slots" :key="`empty-${n}`" class="cmp__empty-col" aria-hidden="true">
                  <div class="cmp__placeholder"><Plus /></div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr v-for="r in rows" :key="r.label">
                <th scope="row">{{ r.label }}</th>
                <td v-for="p in items" :key="p.id">{{ r.get(p) || '—' }}</td>
                <td v-for="n in slots" :key="`e-${n}`" class="cmp__empty-col"></td>
              </tr>
              <tr>
                <th scope="row"><span class="sr-only">Commander</span></th>
                <td v-for="p in items" :key="p.id">
                  <a :href="contact.whatsappLink(contact.orderMessage(p))" target="_blank" rel="noopener" class="btn btn--whatsapp btn--sm"><WhatsAppIcon /> Commander</a>
                </td>
                <td v-for="n in slots" :key="`c-${n}`" class="cmp__empty-col"></td>
              </tr>
            </tbody>
          </table>
        </div>

        <div v-else class="empty">
          <ArrowLeftRight class="empty__icon" aria-hidden="true" />
          <h2>Votre comparateur est vide</h2>
          <p class="muted">Ajoutez des téléphones avec la liste ci-dessus ou le bouton ⇄ sur chaque fiche.</p>
          <RouterLink to="/telephones" class="btn btn--primary">Parcourir le catalogue</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.cmp-tools { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; margin-bottom: 24px; }
.cmp-add { flex: 1; max-width: 480px; min-width: 260px; }

.cmp-actions { display: flex; gap: 8px; flex-wrap: wrap; }
.cmp-scroll { overflow-x: auto; border: 1px solid var(--border); border-radius: var(--radius-lg); background: var(--surface); }
.cmp { width: 100%; min-width: 720px; border-collapse: collapse; table-layout: fixed; }
.cmp th, .cmp td { padding: 14px 16px; text-align: left; vertical-align: top; font-size: 0.92rem; }
.cmp tbody tr:nth-child(odd) { background: var(--bg-soft); }
.cmp tbody th { width: 160px; color: var(--text-muted); font-weight: 600; }
.cmp thead th, .cmp thead td { border-bottom: 1px solid var(--border); }
.cmp__head { position: relative; display: grid; justify-items: center; gap: 10px; text-align: center; }
.cmp__visual { width: 70px; height: 140px; display: block; }
.cmp__name { font-family: var(--font-display); font-weight: 700; }
.cmp__name:hover { color: var(--brand-ink); }
.cmp__remove { position: absolute; top: -4px; right: -4px; width: 32px; height: 32px; border-radius: 50%; border: 1px solid var(--border); background: var(--surface); display: grid; place-items: center; }
.cmp__remove:hover { color: var(--danger); border-color: var(--danger); }
.cmp__remove svg { width: 16px; height: 16px; }
.cmp__placeholder { height: 140px; border: 2px dashed var(--border); border-radius: var(--radius); display: grid; place-items: center; color: var(--text-soft); }
.empty { text-align: center; padding: 64px 20px; border: 2px dashed var(--border); border-radius: var(--radius-lg); }
.empty__icon { width: 56px; height: 56px; margin: 0 auto 16px; color: var(--text-soft); }
</style>
