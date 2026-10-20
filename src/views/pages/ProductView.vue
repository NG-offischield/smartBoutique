<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { Heart, ArrowLeftRight, Share2, Phone, Truck, ShieldCheck, Banknote, RefreshCw, Check, Cpu, Smartphone, Camera, Battery, MemoryStick, Wifi } from 'lucide-vue-next'
import ProductVisual from '@/views/components/ProductVisual.vue'
import ProductCard from '@/views/components/ProductCard.vue'
import WhatsAppIcon from '@/views/components/WhatsAppIcon.vue'
import { BADGES } from '@/models/Product'
import { formatPrice } from '@/models/format'
import { productRepository } from '@/services/ProductRepository'
import { useFavorites } from '@/controllers/favoritesController'
import { useCompare } from '@/controllers/compareController'
import { useToasts } from '@/controllers/toastController'
import { contact } from '@/controllers/contactController'
import { setPageMeta } from '@/controllers/seoController'
import { shop } from '@/config/shop'
import NotFoundView from './NotFoundView.vue'

const props = defineProps({ id: { type: String, required: true } })

const product = computed(() => productRepository.findById(props.id))
const related = computed(() => (product.value ? productRepository.related(product.value, 4) : []))

const colorIndex = ref(0)
const variantIndex = ref(0)
const view = ref('back')
const tab = ref('specs')

const color = computed(() => product.value?.colors[colorIndex.value])
const variant = computed(() => product.value?.variants[variantIndex.value])
const waLink = computed(() => contact.whatsappLink(contact.orderMessage(product.value, { variant: variant.value, color: color.value })))

const { isFavorite, toggle: toggleFavorite } = useFavorites()
const { isCompared, toggle: toggleCompare } = useCompare()
const { notify } = useToasts()

const specRows = computed(() => {
  const s = product.value?.specs || {}
  return [
    { icon: Smartphone, label: 'Écran', value: s.screen },
    { icon: Cpu, label: 'Processeur', value: s.chip },
    { icon: MemoryStick, label: 'Mémoire vive', value: s.ram ? `${s.ram} Go` : null },
    { icon: MemoryStick, label: 'Stockage', value: product.value?.variants.map((v) => v.storage).join(' / ') },
    { icon: Camera, label: 'Appareil photo', value: s.camera },
    { icon: Camera, label: 'Caméra selfie', value: s.selfie },
    { icon: Battery, label: 'Batterie', value: s.battery },
    { icon: Smartphone, label: 'Système', value: s.os },
    { icon: Wifi, label: 'Réseau', value: s.network },
    { icon: Smartphone, label: 'SIM', value: s.sim },
    { icon: Smartphone, label: 'Année de sortie', value: product.value?.year },
    { icon: ShieldCheck, label: 'État', value: product.value?.conditionLabel }
  ].filter((r) => r.value)
})

let schemaEl
watch(
  product,
  (p) => {
    colorIndex.value = 0
    variantIndex.value = 0
    view.value = 'back'
    schemaEl?.remove()
    if (!p) {
      setPageMeta({ title: 'Téléphone introuvable', path: `/telephones/${props.id}` })
      return
    }
    setPageMeta({
      title: `${p.fullName} — ${p.formattedPrice}`,
      description: `${p.fullName} ${p.conditionLabel.toLowerCase()} à partir de ${p.formattedPrice} à Yaoundé. ${p.description}`,
      path: p.url
    })
    schemaEl = document.createElement('script')
    schemaEl.type = 'application/ld+json'
    schemaEl.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.fullName,
      brand: { '@type': 'Brand', name: p.brand.name },
      description: p.description,
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'XAF',
        lowPrice: p.basePrice,
        highPrice: Math.max(...p.variants.map((v) => v.price)),
        availability: p.isAvailable ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
        itemCondition: p.condition === 'neuf' ? 'https://schema.org/NewCondition' : 'https://schema.org/RefurbishedCondition',
        seller: { '@type': 'Organization', name: shop.name }
      }
    })
    document.head.appendChild(schemaEl)
  },
  { immediate: true }
)
onBeforeUnmount(() => schemaEl?.remove())

async function share() {
  const url = window.location.href
  const data = { title: product.value.fullName, text: `${product.value.fullName} chez ${shop.name}`, url }
  try {
    if (navigator.share) {
      await navigator.share(data)
      return
    }
    await navigator.clipboard.writeText(url)
    notify('Lien copié dans le presse-papiers', { tone: 'success' })
  } catch (e) {
    if (e?.name !== 'AbortError') notify('Impossible de partager. Copiez le lien depuis la barre d’adresse.', { tone: 'warning' })
  }
}

function onRadioKey(e, list, current, set) {
  const dir = ['ArrowRight', 'ArrowDown'].includes(e.key) ? 1 : ['ArrowLeft', 'ArrowUp'].includes(e.key) ? -1 : 0
  if (!dir) return
  e.preventDefault()
  const next = (current + dir + list.length) % list.length
  set(next)
  e.currentTarget.parentElement.children[next]?.focus()
}
</script>

<template>
  <NotFoundView v-if="!product" message="Ce téléphone n’existe pas ou n’est plus disponible." />

  <div v-else class="product">
    <div class="container">
      <nav class="crumbs" aria-label="Fil d’Ariane">
        <RouterLink to="/">Accueil</RouterLink><span aria-hidden="true">/</span>
        <RouterLink to="/telephones">Téléphones</RouterLink><span aria-hidden="true">/</span>
        <RouterLink :to="{ path: '/telephones', query: { marques: product.brand.id } }">{{ product.brand.name }}</RouterLink><span aria-hidden="true">/</span>
        <span aria-current="page">{{ product.name }}</span>
      </nav>

      <div class="product__main">
        <!-- Galerie -->
        <div class="gallery">
          <div class="gallery__stage">
            <ul class="gallery__badges">
              <li v-for="b in product.badges" :key="b"><span class="badge" :class="`badge--${b}`">{{ b === 'promo' && product.discountPercent ? `-${product.discountPercent} %` : BADGES[b] }}</span></li>
            </ul>
            <Transition name="swap" mode="out-in">
              <div :key="`${view}-${colorIndex}`" class="gallery__img">
                <ProductVisual :product="product" :color="color" :view="view" />
              </div>
            </Transition>
          </div>
          <div class="gallery__thumbs" role="group" aria-label="Vues du téléphone">
            <button type="button" class="thumb" :class="{ 'is-active': view === 'back' }" :aria-pressed="view === 'back'" aria-label="Voir le dos" @click="view = 'back'">
              <ProductVisual :product="product" :color="color" view="back" />
            </button>
            <button type="button" class="thumb" :class="{ 'is-active': view === 'front' }" :aria-pressed="view === 'front'" aria-label="Voir la face avant" @click="view = 'front'">
              <ProductVisual :product="product" :color="color" view="front" />
            </button>
          </div>
          <p class="gallery__note">Illustration non contractuelle. Photos réelles disponibles sur demande via WhatsApp.</p>
        </div>

        <!-- Infos -->
        <div class="info">
          <RouterLink :to="{ path: '/telephones', query: { marques: product.brand.id } }" class="info__brand">{{ product.brand.name }}</RouterLink>
          <h1 class="info__title">{{ product.fullName }}</h1>
          <div class="info__meta">
            <span class="badge" :class="product.condition === 'neuf' ? 'badge--success' : 'badge--neutral'">{{ product.conditionLabel }}</span>
            <span class="badge" :class="`badge--${product.stockInfo.tone}`">{{ product.stockInfo.label }}</span>
          </div>
          <p class="info__desc">{{ product.description }}</p>

          <div class="price-box" aria-live="polite">
            <strong class="price-box__now">{{ formatPrice(variant.price) }}</strong>
            <template v-if="variant.oldPrice">
              <s class="price-box__old"><span class="sr-only">Ancien prix : </span>{{ formatPrice(variant.oldPrice) }}</s>
              <span class="badge badge--promo">Économisez {{ formatPrice(variant.oldPrice - variant.price) }}</span>
            </template>
          </div>

          <div class="picker">
            <p class="picker__label" id="color-label">Couleur : <strong>{{ color.name }}</strong></p>
            <div class="swatches" role="radiogroup" aria-labelledby="color-label">
              <button
                v-for="(c, i) in product.colors"
                :key="c.hex + i"
                type="button"
                role="radio"
                class="swatch"
                :aria-checked="i === colorIndex"
                :tabindex="i === colorIndex ? 0 : -1"
                :aria-label="c.name"
                :title="c.name"
                :style="{ '--swatch': c.hex }"
                @click="colorIndex = i"
                @keydown="onRadioKey($event, product.colors, colorIndex, (n) => (colorIndex = n))"
              ><Check v-if="i === colorIndex" aria-hidden="true" /></button>
            </div>
          </div>

          <div class="picker">
            <p class="picker__label" id="storage-label">Stockage : <strong>{{ variant.storage }}</strong></p>
            <div class="storages" role="radiogroup" aria-labelledby="storage-label">
              <button
                v-for="(v, i) in product.variants"
                :key="v.storage"
                type="button"
                role="radio"
                class="storage"
                :aria-checked="i === variantIndex"
                :tabindex="i === variantIndex ? 0 : -1"
                @click="variantIndex = i"
                @keydown="onRadioKey($event, product.variants, variantIndex, (n) => (variantIndex = n))"
              >
                <strong>{{ v.storage }}</strong>
                <small>{{ formatPrice(v.price) }}</small>
              </button>
            </div>
          </div>

          <div class="info__cta">
            <a :href="waLink" target="_blank" rel="noopener" class="btn btn--whatsapp btn--lg info__order" :class="{ 'is-disabled': !product.isAvailable }">
              <WhatsAppIcon /> {{ product.isAvailable ? 'Commander sur WhatsApp' : 'Être prévenu du retour en stock' }}
            </a>
            <a :href="contact.telLink" class="btn btn--outline btn--lg"><Phone /> Appeler</a>
          </div>
          <div class="info__secondary">
            <button type="button" class="btn btn--ghost btn--sm" :aria-pressed="isFavorite(product.id)" @click="toggleFavorite(product)">
              <Heart :fill="isFavorite(product.id) ? 'currentColor' : 'none'" :class="{ 'is-fav': isFavorite(product.id) }" />
              {{ isFavorite(product.id) ? 'Dans vos favoris' : 'Ajouter aux favoris' }}
            </button>
            <button type="button" class="btn btn--ghost btn--sm" :aria-pressed="isCompared(product.id)" @click="toggleCompare(product)">
              <ArrowLeftRight /> {{ isCompared(product.id) ? 'Dans le comparateur' : 'Comparer' }}
            </button>
            <button type="button" class="btn btn--ghost btn--sm" @click="share"><Share2 /> Partager</button>
          </div>

          <ul class="info__perks">
            <li><Truck aria-hidden="true" /><span><strong>Livraison rapide</strong> le jour même à Yaoundé</span></li>
            <li><ShieldCheck aria-hidden="true" /><span><strong>Garantie {{ product.condition === 'neuf' ? '12' : '6' }} mois</strong> en boutique</span></li>
            <li><Banknote aria-hidden="true" /><span><strong>Paiement à la livraison</strong> · Orange Money · MoMo</span></li>
            <li><RefreshCw aria-hidden="true" /><span><strong>Reprise</strong> de votre ancien téléphone</span></li>
          </ul>
        </div>
      </div>

      <!-- Détails -->
      <section class="details" aria-label="Détails du produit">
        <div class="details__tabs" role="tablist" aria-label="Informations">
          <button id="t-specs" type="button" role="tab" class="chip" :class="{ 'is-active': tab === 'specs' }" :aria-selected="tab === 'specs'" aria-controls="p-specs" @click="tab = 'specs'">Fiche technique</button>
          <button id="t-box" type="button" role="tab" class="chip" :class="{ 'is-active': tab === 'box' }" :aria-selected="tab === 'box'" aria-controls="p-box" @click="tab = 'box'">Garantie &amp; livraison</button>
        </div>
        <div v-show="tab === 'specs'" id="p-specs" role="tabpanel" aria-labelledby="t-specs" class="card details__panel">
          <table class="specs">
            <caption class="sr-only">Caractéristiques techniques du {{ product.fullName }}</caption>
            <tbody>
              <tr v-for="r in specRows" :key="r.label">
                <th scope="row"><component :is="r.icon" aria-hidden="true" />{{ r.label }}</th>
                <td>{{ r.value }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-show="tab === 'box'" id="p-box" role="tabpanel" aria-labelledby="t-box" class="card details__panel details__text">
          <h2>Garantie</h2>
          <p>{{ product.condition === 'neuf' ? 'Téléphone neuf scellé, garanti 12 mois en boutique (hors casse et oxydation).' : 'Téléphone reconditionné testé sur 40 points, batterie contrôlée, garanti 6 mois en boutique.' }}</p>
          <h2>Livraison</h2>
          <p>Livraison le jour même à Yaoundé (commande avant 16 h), 24 à 48 h vers Douala et les autres villes du Cameroun. Retrait gratuit en boutique, {{ shop.address.street }}.</p>
          <h2>Paiement</h2>
          <p>Espèces, Orange Money ou MTN Mobile Money. À Yaoundé, vous payez à la réception après vérification du téléphone.</p>
        </div>
      </section>

      <section v-if="related.length" class="related" aria-labelledby="related-title">
        <h2 id="related-title">Vous aimerez aussi</h2>
        <div class="grid grid--products">
          <ProductCard v-for="p in related" :key="p.id" :product="p" />
        </div>
      </section>
    </div>

    <!-- Barre d'achat mobile -->
    <div class="buybar">
      <div class="buybar__price"><small>{{ variant.storage }} · {{ color.name }}</small><strong>{{ formatPrice(variant.price) }}</strong></div>
      <a :href="waLink" target="_blank" rel="noopener" class="btn btn--whatsapp"><WhatsAppIcon /> Commander</a>
    </div>
  </div>
</template>

<style scoped>
.product { padding: 24px 0 80px; }
.crumbs { display: flex; gap: 8px; font-size: 0.85rem; color: var(--text-muted); flex-wrap: wrap; margin-bottom: 24px; }
.crumbs a:hover { color: var(--brand-ink); text-decoration: underline; }
.product__main { display: grid; grid-template-columns: 1fr 1fr; gap: 56px; align-items: start; }

.gallery { position: sticky; top: calc(var(--header-h) + 54px); }
.gallery__stage { position: relative; aspect-ratio: 1 / 1; border-radius: var(--radius-lg); background: var(--gradient-soft); display: grid; place-items: center; overflow: hidden; }
.gallery__badges { position: absolute; top: 20px; left: 20px; display: flex; gap: 8px; z-index: 1; }
.gallery__img { position: absolute; top: 9%; bottom: 9%; left: 50%; translate: -50% 0; aspect-ratio: 1 / 2; }
.gallery__thumbs { display: flex; gap: 12px; margin-top: 14px; }
.thumb { width: 84px; height: 84px; padding: 8px; border-radius: var(--radius); border: 2px solid var(--border); background: var(--surface); display: grid; place-items: center; transition: border-color 0.2s; }
.thumb > :deep(svg), .thumb > :deep(img) { height: 64px; width: auto; filter: none; }
.thumb.is-active { border-color: var(--brand-ink); }
.gallery__note { margin-top: 10px; font-size: 0.78rem; color: var(--text-soft); }
.swap-enter-active, .swap-leave-active { transition: opacity 0.25s, transform 0.3s var(--ease); }
.swap-enter-from { opacity: 0; transform: scale(0.95) rotate(-3deg); }
.swap-leave-to { opacity: 0; transform: scale(1.03); }

.info__brand { font-weight: 700; color: var(--brand-ink); text-transform: uppercase; letter-spacing: 0.08em; font-size: 0.85rem; }
.info__brand:hover { text-decoration: underline; }
.info__title { font-size: clamp(1.8rem, 3.5vw, 2.6rem); margin: 8px 0 12px; }
.info__meta { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; }
.info__desc { color: var(--text-muted); margin: 18px 0; font-size: 1.02rem; }
.price-box { display: flex; flex-wrap: wrap; align-items: baseline; gap: 12px; padding: 18px 20px; border-radius: var(--radius); background: var(--bg-soft); border: 1px solid var(--border); }
.price-box__now { font-family: var(--font-display); font-size: 2rem; font-weight: 700; }
.price-box__old { color: var(--text-soft); font-size: 1.05rem; }
.picker { margin-top: 22px; }
.picker__label { margin-bottom: 10px; font-size: 0.92rem; color: var(--text-muted); }
.picker__label strong { color: var(--text); }
.swatches { display: flex; flex-wrap: wrap; gap: 10px; }
.swatch { width: 44px; height: 44px; border-radius: 50%; background: var(--swatch); border: 3px solid var(--bg); box-shadow: 0 0 0 1px var(--border); display: grid; place-items: center; transition: box-shadow 0.2s, transform 0.2s; }
.swatch:hover { transform: scale(1.06); }
.swatch[aria-checked='true'] { box-shadow: 0 0 0 2px var(--brand-500); }
.swatch svg { width: 18px; height: 18px; color: #fff; filter: drop-shadow(0 0 2px rgb(0 0 0 / 0.8)); }
.storages { display: flex; flex-wrap: wrap; gap: 10px; }
.storage { display: grid; gap: 2px; padding: 10px 18px; min-width: 120px; border-radius: var(--radius); border: 2px solid var(--border); background: var(--surface); text-align: left; transition: border-color 0.2s, background-color 0.2s; }
.storage small { color: var(--text-muted); font-size: 0.8rem; }
.storage:hover { border-color: var(--brand-400); }
.storage[aria-checked='true'] { border-color: var(--brand-ink); background: var(--brand-50); }
.info__cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 28px; }
.info__order { flex: 1; min-width: 240px; }
.info__secondary { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 12px; }
.info__secondary .is-fav { color: var(--promo); }
.info__perks { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 28px; padding-top: 24px; border-top: 1px solid var(--border); }
.info__perks li { display: flex; gap: 10px; font-size: 0.87rem; color: var(--text-muted); }
.info__perks strong { color: var(--text); }
.info__perks svg { width: 22px; height: 22px; color: var(--brand-ink); flex-shrink: 0; }

.details { margin-top: 64px; }
.details__tabs { display: flex; gap: 8px; margin-bottom: 16px; flex-wrap: wrap; }
.details__panel { padding: 8px 24px; }
.details__text { padding: 24px; }
.details__text h2 { font-size: 1.1rem; margin-top: 8px; }
.details__text p { color: var(--text-muted); }
.specs { width: 100%; border-collapse: collapse; }
.specs tr + tr { border-top: 1px solid var(--border); }
.specs th, .specs td { padding: 14px 8px; text-align: left; vertical-align: top; }
.specs th { width: 38%; font-weight: 600; color: var(--text-muted); display: flex; align-items: center; gap: 10px; }
.specs th svg { width: 18px; height: 18px; color: var(--brand-ink); flex-shrink: 0; }
.related { margin-top: 72px; }
.buybar { display: none; }

@media (max-width: 900px) {
  .product__main { grid-template-columns: 1fr; gap: 32px; }
  .gallery { position: static; max-width: 520px; margin: 0 auto; width: 100%; }
  .buybar { display: flex; position: fixed; left: 0; right: 0; bottom: 0; z-index: 45; align-items: center; justify-content: space-between; gap: 12px; padding: 12px 16px calc(12px + env(safe-area-inset-bottom)); background: var(--surface); border-top: 1px solid var(--border); box-shadow: 0 -10px 30px -10px rgb(0 0 0 / 0.2); }
  .buybar__price { display: grid; line-height: 1.2; min-width: 0; }
  .buybar__price small { color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .buybar__price strong { font-family: var(--font-display); font-size: 1.2rem; }
  .product { padding-bottom: 120px; }
}
@media (max-width: 560px) {
  .info__perks { grid-template-columns: 1fr; }
  .specs th { width: 45%; }
  .details__panel { padding: 4px 14px; }
}
</style>
