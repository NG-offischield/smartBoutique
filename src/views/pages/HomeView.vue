<script setup>
import { computed, ref } from 'vue'
import { ArrowRight, MapPin, Phone, Clock, Zap, Wifi, Recycle, Tag, Crown, Wallet } from 'lucide-vue-next'
import ProductCard from '@/views/components/ProductCard.vue'
import ProductVisual from '@/views/components/ProductVisual.vue'
import FaqList from '@/views/components/FaqList.vue'
import DynamicIcon from '@/views/components/DynamicIcon.vue'
import WhatsAppIcon from '@/views/components/WhatsAppIcon.vue'
import { productRepository } from '@/services/ProductRepository'
import { contact } from '@/controllers/contactController'
import { formatPrice } from '@/models/format'
import { shop, fullAddress } from '@/config/shop'
import { perks, steps, testimonials, faq } from '@/data/content'

const all = productRepository.all()
const brands = productRepository.brandsWithCount()
const minPrice = productRepository.priceBounds().min

// Tableau « en vitrine » : un modèle mis en avant par marque, du plus récent au plus ancien
const showcase = (() => {
  const seen = new Set()
  return productRepository
    .newest(all.length)
    .filter((p) => (p.featured || p.badges.includes('nouveau')) && !seen.has(p.brand.id) && seen.add(p.brand.id))
    .slice(0, 6)
})()

const tabs = [
  { id: 'featured', label: 'Coups de cœur', items: productRepository.featured(8) },
  { id: 'new', label: 'Nouveautés', items: productRepository.newest(8) },
  { id: 'promo', label: 'Promotions', items: productRepository.promotions(8) }
]
const activeTab = ref('featured')
const currentItems = computed(() => tabs.find((t) => t.id === activeTab.value).items)

function onTabKey(e, index) {
  const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  if (!dir) return
  const next = tabs[(index + dir + tabs.length) % tabs.length]
  activeTab.value = next.id
  document.getElementById(`tab-${next.id}`)?.focus()
}

function countFor(q) {
  return all.filter((p) => {
    if (q.max && p.basePrice > Number(q.max)) return false
    if (q.min && !p.variants.some((v) => v.price >= Number(q.min))) return false
    if (q.reseau && !p.is5G) return false
    if (q.etat && p.condition !== q.etat) return false
    if (q.promo && !p.isPromo) return false
    return true
  }).length
}

const categories = [
  { label: 'Petits prix', hint: 'moins de 100 000 FCFA', icon: Wallet, query: { max: '100000' } },
  { label: 'Milieu de gamme', hint: '100 000 à 300 000 FCFA', icon: Zap, query: { min: '100000', max: '300000' } },
  { label: 'Haut de gamme', hint: 'plus de 300 000 FCFA', icon: Crown, query: { min: '300000' } },
  { label: 'Compatibles 5G', hint: 'pour le réseau 5G', icon: Wifi, query: { reseau: '5G' } },
  { label: 'Reconditionnés', hint: 'testés et garantis', icon: Recycle, query: { etat: 'reconditionne' } },
  { label: 'En promotion', hint: 'prix barrés', icon: Tag, query: { promo: '1' } }
].map((c) => ({ ...c, count: countFor(c.query) }))
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="container hero__inner">
        <div class="hero__content">
          <p class="hero__where"><MapPin aria-hidden="true" /> {{ shop.address.street }} · {{ shop.address.city }}</p>
          <h1 id="hero-title">Le bon téléphone, au bon prix, <span class="text-gradient">sans détour</span>.</h1>
          <p class="hero__lead">
            iPhone, Galaxy, Redmi, Camon, Hot ou Pixel : neufs ou reconditionnés, vérifiés devant vous et garantis.
            Vous choisissez ici, vous commandez sur WhatsApp, vous payez à la réception.
          </p>
          <div class="hero__cta">
            <RouterLink to="/telephones" class="btn btn--primary btn--lg">Voir le catalogue <ArrowRight /></RouterLink>
            <a :href="contact.whatsappLink(contact.greeting() + '\nJe souhaite un conseil pour choisir un téléphone.')" target="_blank" rel="noopener" class="btn btn--outline btn--lg">
              <WhatsAppIcon class="wa-green" /> Demander conseil
            </a>
          </div>
          <dl class="hero__facts">
            <div><dt>Modèles</dt><dd>{{ all.length }}</dd></div>
            <div><dt>Marques</dt><dd>{{ brands.length }}</dd></div>
            <div><dt>Premier prix</dt><dd>{{ formatPrice(minPrice) }}</dd></div>
          </dl>
        </div>

        <aside class="board" aria-labelledby="board-title">
          <header class="board__head">
            <h2 id="board-title">En vitrine</h2>
            <span>prix en FCFA</span>
          </header>
          <ul class="board__list">
            <li v-for="p in showcase" :key="p.id">
              <RouterLink :to="p.url" class="board__row">
                <span class="board__thumb" aria-hidden="true"><ProductVisual :product="p" /></span>
                <span class="board__name">
                  <strong>{{ p.fullName }}</strong>
                  <small>{{ p.baseVariant.storage }} · {{ p.conditionLabel }} · <span :class="`is-${p.stockInfo.tone}`">{{ p.stock === 'en-stock' ? 'en stock' : 'sur commande' }}</span></small>
                </span>
                <span class="board__price">{{ p.basePrice.toLocaleString('fr-FR') }}</span>
              </RouterLink>
            </li>
          </ul>
          <RouterLink to="/telephones" class="board__more">Les {{ all.length }} modèles <ArrowRight aria-hidden="true" /></RouterLink>
        </aside>
      </div>
    </section>

    <!-- ============ MARQUES ============ -->
    <section class="brands-index" aria-labelledby="brands-title">
      <div class="container">
        <h2 id="brands-title" class="brands-index__title">{{ brands.length }} marques en rayon</h2>
        <ul class="brands-index__list">
          <li v-for="{ brand, count } in brands" :key="brand.id">
            <RouterLink :to="{ path: '/telephones', query: { marques: brand.id } }">{{ brand.name }}<sup>{{ count }}</sup></RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- ============ CATÉGORIES ============ -->
    <section class="section" aria-labelledby="cat-title">
      <div class="container">
        <div class="section-head">
          <h2 id="cat-title">Par budget ou par besoin</h2>
          <RouterLink to="/marques" class="btn btn--outline btn--sm">Toutes les marques <ArrowRight /></RouterLink>
        </div>
        <ul class="cats">
          <li v-for="c in categories" :key="c.label">
            <RouterLink :to="{ path: '/telephones', query: c.query }" class="cat">
              <component :is="c.icon" class="cat__icon" aria-hidden="true" />
              <span class="cat__label">{{ c.label }}</span>
              <span class="cat__hint">{{ c.hint }}</span>
              <span class="cat__count">{{ c.count }} modèles</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- ============ PRODUITS ============ -->
    <section class="section section--soft" aria-labelledby="sel-title">
      <div class="container">
        <div class="section-head">
          <h2 id="sel-title">Les téléphones du moment</h2>
          <div class="tabs" role="tablist" aria-label="Sélection de téléphones">
            <button
              v-for="(t, i) in tabs"
              :id="`tab-${t.id}`"
              :key="t.id"
              type="button"
              role="tab"
              class="tab"
              :class="{ 'is-active': activeTab === t.id }"
              :aria-selected="activeTab === t.id"
              aria-controls="tab-panel"
              :tabindex="activeTab === t.id ? 0 : -1"
              @click="activeTab = t.id"
              @keydown="onTabKey($event, i)"
            >{{ t.label }}</button>
          </div>
        </div>
        <div id="tab-panel" role="tabpanel" :aria-labelledby="`tab-${activeTab}`">
          <TransitionGroup tag="div" name="list" class="grid grid--products">
            <ProductCard v-for="p in currentItems" :key="`${activeTab}-${p.id}`" :product="p" />
          </TransitionGroup>
        </div>
        <div class="center">
          <RouterLink to="/telephones" class="btn btn--primary btn--lg">Voir les {{ all.length }} téléphones <ArrowRight /></RouterLink>
        </div>
      </div>
    </section>

    <!-- ============ AVANTAGES ============ -->
    <section class="section" aria-labelledby="perks-title">
      <div class="container">
        <h2 id="perks-title">Ce que vous avez en achetant chez nous</h2>
        <ul class="perks">
          <li v-for="p in perks" :key="p.title" class="perk">
            <DynamicIcon :name="p.icon" class="perk__icon" />
            <h3>{{ p.title }}</h3>
            <p>{{ p.text }}</p>
          </li>
        </ul>
      </div>
    </section>

    <!-- ============ COMMENT COMMANDER ============ -->
    <section class="section section--soft" aria-labelledby="steps-title">
      <div class="container steps-wrap">
        <div>
          <h2 id="steps-title">Commander en 3 étapes</h2>
          <p class="muted">Pas de compte à créer ni de paiement en ligne : vous parlez directement à la boutique et vous payez à la réception.</p>
          <a :href="contact.whatsappLink(contact.greeting())" target="_blank" rel="noopener" class="btn btn--whatsapp btn--lg"><WhatsAppIcon /> Écrire sur WhatsApp</a>
        </div>
        <ol class="steps">
          <li v-for="(s, i) in steps" :key="s.title" class="step">
            <span class="step__num" aria-hidden="true">{{ i + 1 }}</span>
            <div>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- ============ AVIS (affichés seulement s'il y en a) ============ -->
    <section v-if="testimonials.length" class="section" aria-labelledby="reviews-title">
      <div class="container">
        <h2 id="reviews-title">Ce que disent nos clients</h2>
        <ul class="reviews">
          <li v-for="t in testimonials" :key="t.name" class="review">
            <blockquote>« {{ t.text }} »</blockquote>
            <p class="review__who"><strong>{{ t.name }}</strong><small>{{ t.city }}</small></p>
          </li>
        </ul>
      </div>
    </section>

    <!-- ============ FAQ ============ -->
    <section class="section" aria-labelledby="faq-title">
      <div class="container faq-wrap">
        <div>
          <h2 id="faq-title">Questions fréquentes</h2>
          <p class="muted">Vous ne trouvez pas la réponse ? Posez votre question sur WhatsApp, on vous répond rapidement.</p>
          <RouterLink to="/contact" class="btn btn--outline">Nous contacter <ArrowRight /></RouterLink>
        </div>
        <FaqList :items="faq.slice(0, 5)" />
      </div>
    </section>

    <!-- ============ VISITE ============ -->
    <section class="visit" aria-labelledby="visit-title">
      <div class="container visit__inner">
        <div>
          <h2 id="visit-title">Passez à la boutique, testez avant d’acheter.</h2>
          <p class="visit__lead">Tous les téléphones en stock peuvent être pris en main sur place.</p>
        </div>
        <ul class="visit__info">
          <li><MapPin aria-hidden="true" /><a :href="contact.mapsLink" target="_blank" rel="noopener">{{ fullAddress }}</a></li>
          <li><Phone aria-hidden="true" /><a :href="contact.telLink">{{ shop.phoneDisplay }}</a><span class="visit__note">appel et WhatsApp</span></li>
          <li><Clock aria-hidden="true" /><span>{{ shop.openingHours[0].days }}, {{ shop.openingHours[0].hours }}</span></li>
          <li class="visit__cta">
            <a :href="contact.whatsappLink(contact.greeting())" target="_blank" rel="noopener" class="btn btn--whatsapp"><WhatsAppIcon /> WhatsApp</a>
            <RouterLink to="/contact" class="btn btn--light">Plan d’accès</RouterLink>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero */
.hero { padding: clamp(36px, 6vw, 72px) 0 clamp(40px, 6vw, 72px); border-bottom: 1px solid var(--border); }
.hero__inner { display: grid; grid-template-columns: 1.15fr 1fr; gap: clamp(32px, 5vw, 64px); align-items: center; }
.hero__content { min-width: 0; }
.hero__where { display: inline-flex; align-items: center; gap: 6px; font-size: 0.9rem; font-weight: 600; color: var(--brand-ink); margin: 0; }
.hero__where svg { width: 16px; height: 16px; }
.hero h1 { font-size: clamp(2.3rem, 5vw, 4rem); font-weight: 700; margin: 16px 0 18px; max-width: 14ch; }
.hero__lead { font-size: 1.1rem; color: var(--text-muted); max-width: 54ch; }
.hero__cta { display: flex; flex-wrap: wrap; gap: 12px; margin: 28px 0 32px; }
.wa-green { color: var(--whatsapp-dark); }
.hero__facts { display: flex; flex-wrap: wrap; row-gap: 12px; margin: 0; border-top: 1px solid var(--border); padding-top: 18px; }
.hero__facts div { padding-right: 28px; margin-right: 28px; border-right: 1px solid var(--border); }
.hero__facts div:last-child { border-right: none; }
.hero__facts dt { font-size: 0.8rem; color: var(--text-soft); }
.hero__facts dd { margin: 2px 0 0; font-family: var(--font-display); font-size: 1.4rem; font-weight: 700; font-variant-numeric: tabular-nums; }

/* Tableau en vitrine */
.board { min-width: 0; background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius-lg); box-shadow: var(--shadow); overflow: hidden; }
.board__head { display: flex; justify-content: space-between; align-items: baseline; padding: 16px 20px; background: var(--band); color: var(--band-text); }
.board__head h2 { font-size: 1.05rem; margin: 0; letter-spacing: 0; color: inherit; }
.board__head span { font-size: 0.8rem; opacity: 0.75; }
.board__list li + li { border-top: 1px dashed var(--border); }
.board__row { display: flex; align-items: center; gap: 14px; padding: 10px 20px; transition: background-color 0.15s; }
.board__row:hover, .board__row:focus-visible { background: var(--bg-soft); }
.board__thumb { width: 22px; height: 44px; flex-shrink: 0; }
.board__thumb :deep(svg) { filter: none; }
.board__name { flex: 1; min-width: 0; display: grid; line-height: 1.3; }
.board__name strong { font-size: 0.95rem; font-weight: 600; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.board__name small { color: var(--text-muted); font-size: 0.78rem; }
.board__price { font-family: var(--font-display); font-weight: 700; font-size: 1.05rem; font-variant-numeric: tabular-nums; white-space: nowrap; padding: 2px 8px; background: var(--accent); color: var(--accent-ink); border-radius: 4px; }
.board__more { display: flex; justify-content: space-between; align-items: center; padding: 14px 20px; border-top: 1px solid var(--border); font-weight: 600; color: var(--brand-ink); }
.board__more svg { width: 18px; height: 18px; }
.board__more:hover { background: var(--bg-soft); }
.is-success { color: var(--success); }
.is-warning { color: var(--warning); }
.is-danger { color: var(--danger); }

/* Index des marques */
.brands-index { padding: 36px 0; background: var(--bg-soft); border-bottom: 1px solid var(--border); }
.brands-index__title { font-size: 0.95rem; font-family: var(--font-sans); font-weight: 600; color: var(--text-muted); margin-bottom: 14px; letter-spacing: 0; }
.brands-index__list { display: flex; flex-wrap: wrap; gap: 6px 26px; }
.brands-index__list a { font-family: var(--font-display); font-weight: 600; font-size: clamp(1.15rem, 2.2vw, 1.5rem); letter-spacing: -0.02em; color: var(--text); transition: color 0.15s; }
.brands-index__list a:hover { color: var(--brand-ink); text-decoration: underline; text-decoration-color: var(--accent); text-decoration-thickness: 3px; text-underline-offset: 5px; }
.brands-index__list sup { font-family: var(--font-sans); font-size: 0.7rem; font-weight: 500; color: var(--text-soft); margin-left: 3px; }

/* Catégories */
.cats { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--border); border-left: 1px solid var(--border); }
.cat { display: grid; grid-template-columns: auto 1fr auto; grid-template-rows: auto auto; column-gap: 14px; align-items: center; padding: 20px 22px; border-right: 1px solid var(--border); border-bottom: 1px solid var(--border); transition: background-color 0.15s; height: 100%; }
.cat:hover { background: var(--bg-soft); }
.cat__icon { grid-row: span 2; width: 26px; height: 26px; color: var(--brand-ink); }
.cat__label { font-weight: 600; font-size: 1.02rem; }
.cat__hint { grid-column: 2; font-size: 0.85rem; color: var(--text-muted); }
.cat__count { grid-row: 1 / span 2; grid-column: 3; font-size: 0.8rem; color: var(--text-soft); font-variant-numeric: tabular-nums; }

/* Onglets */
.tabs { display: flex; gap: 4px; border-bottom: 1px solid var(--border); }
.tab { background: none; border: none; padding: 10px 14px; font-weight: 600; color: var(--text-muted); border-bottom: 3px solid transparent; margin-bottom: -1px; }
.tab:hover { color: var(--text); }
.tab.is-active { color: var(--text); border-bottom-color: var(--accent); }
.center { display: flex; justify-content: center; margin-top: 40px; }

/* Avantages */
.perks { display: grid; grid-template-columns: repeat(4, 1fr); gap: 28px; margin-top: 28px; }
.perk { border-top: 2px solid var(--text); padding-top: 18px; }
.perk__icon { width: 26px; height: 26px; color: var(--brand-ink); margin-bottom: 12px; }
.perk h3 { font-size: 1.08rem; margin-bottom: 6px; }
.perk p { color: var(--text-muted); margin: 0; font-size: 0.93rem; }

/* Étapes */
.steps-wrap, .faq-wrap { display: grid; grid-template-columns: 1fr 1.2fr; gap: 56px; align-items: start; }
.steps { display: grid; list-style: none; margin: 0; padding: 0; }
.step { display: flex; gap: 18px; padding: 20px 0; border-bottom: 1px solid var(--border); }
.step:first-child { padding-top: 0; }
.step__num { flex-shrink: 0; width: 40px; height: 40px; border-radius: 50%; display: grid; place-items: center; font-family: var(--font-display); font-weight: 700; font-size: 1.1rem; background: var(--accent); color: var(--accent-ink); }
.step h3 { margin-bottom: 4px; }
.step p { margin: 0; color: var(--text-muted); }

/* Avis */
.reviews { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 20px; margin-top: 24px; }
.review { padding: 22px; border: 1px solid var(--border); border-radius: var(--radius); display: grid; gap: 14px; }
.review blockquote { margin: 0; }
.review__who { margin: 0; display: grid; line-height: 1.3; }
.review__who small { color: var(--text-muted); }

/* Visite */
.visit { background: var(--band); color: var(--band-text); padding: clamp(40px, 6vw, 64px) 0; }
.visit__inner { display: grid; grid-template-columns: 1.1fr 1fr; gap: 40px; align-items: center; }
.visit h2 { color: #fff; max-width: 18ch; }
.visit__lead { opacity: 0.8; margin: 0; }
.visit__info { display: grid; gap: 14px; }
.visit__info li { display: flex; align-items: center; flex-wrap: wrap; gap: 10px; }
.visit__info > li > svg { width: 20px; height: 20px; color: var(--accent); flex-shrink: 0; }
.visit__info a:not(.btn) { text-decoration: underline; text-underline-offset: 3px; }
.visit__note { font-size: 0.85rem; opacity: 0.7; }
.visit__cta { margin-top: 8px; gap: 12px !important; }

@media (max-width: 1000px) {
  .hero__inner, .steps-wrap, .faq-wrap, .visit__inner { grid-template-columns: 1fr; }
  .steps-wrap, .faq-wrap { gap: 32px; }
  .perks { grid-template-columns: repeat(2, 1fr); }
  .cats { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .cats { grid-template-columns: 1fr; }
  .perks { grid-template-columns: 1fr; gap: 20px; }
  .hero__cta .btn { flex: 1 1 100%; }
  .hero__facts div { padding-right: 16px; margin-right: 16px; }
  .hero__facts dd { font-size: 1.15rem; }
  .board__row { padding: 10px 14px; gap: 10px; }
  .tabs { overflow-x: auto; max-width: 100%; }
  .tab { white-space: nowrap; }
}
</style>
