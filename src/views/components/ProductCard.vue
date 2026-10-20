<script setup>
import { computed } from 'vue'
import { Heart, ArrowLeftRight, Wifi } from 'lucide-vue-next'
import ProductVisual from './ProductVisual.vue'
import StarRating from './StarRating.vue'
import WhatsAppIcon from './WhatsAppIcon.vue'
import { BADGES } from '@/models/Product'
import { formatPrice } from '@/models/format'
import { useFavorites } from '@/controllers/favoritesController'
import { useCompare } from '@/controllers/compareController'
import { contact } from '@/controllers/contactController'

const props = defineProps({ product: { type: Object, required: true } })

const { isFavorite, toggle: toggleFavorite } = useFavorites()
const { isCompared, toggle: toggleCompare } = useCompare()
const fav = computed(() => isFavorite(props.product.id))
const cmp = computed(() => isCompared(props.product.id))
const variant = computed(() => props.product.baseVariant)
const waLink = computed(() => contact.whatsappLink(contact.orderMessage(props.product)))
</script>

<template>
  <article class="pcard">
    <div class="pcard__media">
      <ul class="pcard__badges" aria-label="Étiquettes">
        <li v-for="b in product.badges" :key="b">
          <span class="badge" :class="`badge--${b}`">
            {{ b === 'promo' && product.discountPercent ? `-${product.discountPercent} %` : BADGES[b] }}
          </span>
        </li>
        <li v-if="product.condition === 'reconditionne'"><span class="badge badge--neutral">Reconditionné</span></li>
      </ul>
      <div class="pcard__actions">
        <button
          type="button"
          class="icon-btn icon-btn--sm"
          :class="{ 'is-active': fav }"
          :aria-pressed="fav"
          :aria-label="fav ? `Retirer ${product.fullName} des favoris` : `Ajouter ${product.fullName} aux favoris`"
          :title="fav ? 'Retirer des favoris' : 'Ajouter aux favoris'"
          @click="toggleFavorite(product)"
        >
          <Heart :fill="fav ? 'currentColor' : 'none'" />
        </button>
        <button
          type="button"
          class="icon-btn icon-btn--sm"
          :class="{ 'is-active': cmp }"
          :aria-pressed="cmp"
          :aria-label="cmp ? `Retirer ${product.fullName} du comparateur` : `Comparer ${product.fullName}`"
          :title="cmp ? 'Retirer du comparateur' : 'Comparer'"
          @click="toggleCompare(product)"
        >
          <ArrowLeftRight />
        </button>
        <a :href="waLink" target="_blank" rel="noopener" class="icon-btn icon-btn--sm pcard__wa-mini" :aria-label="`Commander ${product.fullName} sur WhatsApp`">
          <WhatsAppIcon />
        </a>
      </div>
      <RouterLink :to="product.url" class="pcard__visual" tabindex="-1" aria-hidden="true">
        <ProductVisual :product="product" />
      </RouterLink>
    </div>

    <div class="pcard__body">
      <div class="pcard__meta">
        <span class="pcard__brand">{{ product.brand.name }}</span>
        <StarRating :value="product.rating" :reviews="product.reviews" />
      </div>
      <h3 class="pcard__title">
        <RouterLink :to="product.url" class="pcard__link">{{ product.name }}</RouterLink>
      </h3>
      <ul class="pcard__specs">
        <li>{{ product.ram }} Go RAM</li>
        <li>{{ product.variants.map((v) => v.storage).join(' / ') }}</li>
        <li v-if="product.is5G" class="is-5g"><Wifi aria-hidden="true" />5G</li>
      </ul>
      <ul class="pcard__colors" :aria-label="`${product.colors.length} coloris disponibles`">
        <li v-for="c in product.colors" :key="c.hex" :style="{ background: c.hex }" :title="c.name"></li>
      </ul>
      <div class="pcard__footer">
        <div class="pcard__price">
          <span class="pcard__from">{{ product.variants.length > 1 ? 'À partir de' : 'Prix' }}</span>
          <strong>{{ formatPrice(variant.price) }}</strong>
          <s v-if="variant.oldPrice" :aria-label="`Ancien prix ${formatPrice(variant.oldPrice)}`">{{ formatPrice(variant.oldPrice) }}</s>
        </div>
        <a
          :href="waLink"
          target="_blank"
          rel="noopener"
          class="pcard__wa"
          :aria-label="`Commander ${product.fullName} sur WhatsApp`"
          title="Commander sur WhatsApp"
        >
          <WhatsAppIcon />
        </a>
      </div>
      <p class="pcard__stock" :class="`is-${product.stockInfo.tone}`">
        <span class="dot" aria-hidden="true"></span>{{ product.stockInfo.label }}
      </p>
    </div>
  </article>
</template>

<style scoped>
.pcard {
  position: relative; display: flex; flex-direction: column; height: 100%;
  background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg);
  overflow: hidden; transition: transform 0.35s var(--ease), box-shadow 0.35s var(--ease), border-color 0.3s;
}
.pcard:hover { transform: translateY(-4px); box-shadow: var(--shadow); border-color: transparent; }
.pcard:focus-within { border-color: var(--brand-400); }
.pcard__media { position: relative; background: var(--gradient-soft); aspect-ratio: 1 / 1; display: grid; place-items: center; }
.pcard__visual { position: absolute; top: 11%; bottom: 11%; left: 50%; translate: -50% 0; aspect-ratio: 1 / 2; transition: transform 0.5s var(--ease); }
.pcard:hover .pcard__visual { transform: scale(1.05) rotate(-2deg); }
.pcard__badges { position: absolute; top: 12px; left: 12px; display: flex; flex-direction: column; gap: 6px; z-index: 1; align-items: flex-start; }
.pcard__actions { position: absolute; top: 10px; right: 10px; display: flex; flex-direction: column; gap: 8px; z-index: 1; }
.icon-btn--sm { width: 38px; height: 38px; box-shadow: var(--shadow-sm); }
.icon-btn--sm svg { width: 17px; height: 17px; }
.pcard__body { display: flex; flex-direction: column; gap: 8px; padding: 16px 18px 18px; flex: 1; }
.pcard__meta { display: flex; justify-content: space-between; align-items: center; gap: 8px; }
.pcard__brand { font-size: 0.75rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; color: var(--brand-500); }
:root[data-theme='dark'] .pcard__brand { color: #a5b4fc; }
.pcard__title { font-size: 1.05rem; margin: 0; }
.pcard__link::after { content: ''; position: absolute; inset: 0; z-index: 0; }
.pcard__link:focus-visible { outline: none; }
.pcard__link:focus-visible::after { outline: 3px solid var(--brand-400); outline-offset: -3px; border-radius: var(--radius-lg); }
.pcard__wa { position: relative; z-index: 2; }
.pcard__actions { z-index: 2; }
.pcard__specs { display: flex; flex-wrap: wrap; gap: 6px; font-size: 0.75rem; color: var(--text-muted); }
.pcard__specs li { padding: 2px 8px; border-radius: 6px; background: var(--surface-2); display: inline-flex; align-items: center; gap: 4px; }
.pcard__specs svg { width: 12px; height: 12px; }
.pcard__specs .is-5g { color: var(--brand-500); font-weight: 600; }
:root[data-theme='dark'] .pcard__specs .is-5g { color: #a5b4fc; }
.pcard__colors { display: flex; gap: 6px; }
.pcard__colors li { width: 14px; height: 14px; border-radius: 50%; border: 1px solid rgb(0 0 0 / 0.15); box-shadow: inset 0 0 0 1px rgb(255 255 255 / 0.3); }
.pcard__footer { display: flex; justify-content: space-between; align-items: flex-end; gap: 8px; margin-top: auto; padding-top: 6px; }
.pcard__price { display: grid; line-height: 1.25; min-width: 0; }
.pcard__from { font-size: 0.72rem; color: var(--text-soft); }
.pcard__price strong { font-family: var(--font-display); font-size: 1.15rem; font-weight: 800; }
.pcard__price s { font-size: 0.8rem; color: var(--text-soft); }
.pcard__wa {
  flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%; display: grid; place-items: center;
  background: var(--whatsapp); color: #fff; transition: transform 0.2s, background-color 0.2s;
}
.pcard__wa:hover { transform: scale(1.08); background: var(--whatsapp-dark); }
.pcard__wa svg { width: 22px; height: 22px; }
.pcard__wa-mini { display: none; background: var(--whatsapp); border-color: var(--whatsapp); color: #fff; }
.pcard__stock { margin: 0; font-size: 0.75rem; font-weight: 600; display: flex; align-items: center; gap: 6px; }
.pcard__stock .dot { width: 7px; height: 7px; border-radius: 50%; background: currentColor; }
.is-success { color: var(--success); }
.is-warning { color: var(--warning); }
.is-danger { color: var(--danger); }

@media (max-width: 640px) {
  .pcard__body { padding: 12px; gap: 6px; }
  .pcard__title { font-size: 0.95rem; }
  .pcard__price strong { font-size: 1rem; }
  .pcard__specs li:nth-child(2) { display: none; }
  .pcard__footer .pcard__wa { display: none; }
  .pcard__wa-mini { display: inline-grid; }
  .icon-btn--sm { width: 34px; height: 34px; }
  .pcard__badges { top: 8px; left: 8px; }
  .pcard__actions { top: 8px; right: 8px; gap: 6px; }
}
</style>
