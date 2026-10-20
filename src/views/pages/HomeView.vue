<script setup>
import { computed, ref } from 'vue'
import { ArrowRight, Star, Truck, ShieldCheck, Phone, MapPin, Clock, Sparkles, Zap, Wifi, Recycle, Tag, Crown, Wallet } from 'lucide-vue-next'
import PhoneMockup from '@/views/components/PhoneMockup.vue'
import ProductCard from '@/views/components/ProductCard.vue'
import FaqList from '@/views/components/FaqList.vue'
import DynamicIcon from '@/views/components/DynamicIcon.vue'
import WhatsAppIcon from '@/views/components/WhatsAppIcon.vue'
import { productRepository } from '@/services/ProductRepository'
import { contact } from '@/controllers/contactController'
import { shop, fullAddress } from '@/config/shop'
import { perks, steps, testimonials, faq, stats } from '@/data/content'

const brands = productRepository.brandsWithCount()
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

const categories = [
  { label: 'Petits prix', hint: 'Moins de 100 000 FCFA', icon: Wallet, query: { max: '100000' } },
  { label: 'Milieu de gamme', hint: '100 000 – 300 000 FCFA', icon: Zap, query: { min: '100000', max: '300000' } },
  { label: 'Haut de gamme', hint: 'Plus de 300 000 FCFA', icon: Crown, query: { min: '300000' } },
  { label: 'Smartphones 5G', hint: 'La vitesse maximale', icon: Wifi, query: { reseau: '5G' } },
  { label: 'Reconditionnés', hint: 'Garantis 6 mois', icon: Recycle, query: { etat: 'reconditionne' } },
  { label: 'Promotions', hint: 'Les bonnes affaires', icon: Tag, query: { promo: '1' } }
]

const formatStat = (s) => `${s.value.toLocaleString('fr-FR')}${s.suffix}`
const brandCount = brands.length
</script>

<template>
  <div>
    <!-- ============ HERO ============ -->
    <section class="hero" aria-labelledby="hero-title">
      <div class="hero__bg" aria-hidden="true"><span></span><span></span></div>
      <div class="container hero__inner">
        <div class="hero__content">
          <p class="hero__pill"><Sparkles aria-hidden="true" /> Nouveaux iPhone 17 &amp; Galaxy Z7 disponibles</p>
          <h1 id="hero-title">
            Le smartphone de vos rêves, <span class="text-gradient">au juste prix</span> à Yaoundé.
          </h1>
          <p class="hero__lead">
            Apple, Samsung, Xiaomi, Tecno, Infinix, Google Pixel… {{ brandCount }} marques, neufs et reconditionnés,
            garantis et livrés chez vous. Commandez en un clic sur WhatsApp.
          </p>
          <div class="hero__cta">
            <RouterLink to="/telephones" class="btn btn--primary btn--lg">Voir le catalogue <ArrowRight /></RouterLink>
            <a :href="contact.whatsappLink(contact.greeting() + '\nJe souhaite un conseil pour choisir un téléphone.')" target="_blank" rel="noopener" class="btn btn--whatsapp btn--lg">
              <WhatsAppIcon /> Conseil gratuit
            </a>
          </div>
          <ul class="hero__trust">
            <li><Truck aria-hidden="true" /> Livraison le jour même</li>
            <li><ShieldCheck aria-hidden="true" /> Garantie 12 mois</li>
            <li><Star aria-hidden="true" /> 4,9/5 · 2 500+ clients</li>
          </ul>
        </div>

        <div class="hero__visual" aria-hidden="true">
          <div class="hero__phone hero__phone--1"><PhoneMockup color="#2F6B57" variant="square" brand="Tecno" /></div>
          <div class="hero__phone hero__phone--2"><PhoneMockup color="#4F46E5" variant="apple-pro" view="front" island /></div>
          <div class="hero__phone hero__phone--3"><PhoneMockup color="#E3732D" variant="apple-pro" brand="Apple" /></div>
          <div class="hero__float hero__float--a"><Truck /> <span><strong>Livré en 3 h</strong><small>à Yaoundé</small></span></div>
          <div class="hero__float hero__float--b"><span class="hero__stars">★★★★★</span><small>« Service impeccable ! »</small></div>
        </div>
      </div>
    </section>

    <!-- ============ MARQUES (défilement) ============ -->
    <section class="marquee" aria-label="Marques disponibles">
      <div class="marquee__track">
        <template v-for="n in 2" :key="n">
          <RouterLink
            v-for="{ brand } in brands"
            :key="`${n}-${brand.id}`"
            :to="{ path: '/telephones', query: { marques: brand.id } }"
            class="marquee__item"
            :tabindex="n === 2 ? -1 : undefined"
            :aria-hidden="n === 2 ? 'true' : undefined"
          >{{ brand.name }}</RouterLink>
        </template>
      </div>
    </section>

    <!-- ============ CATÉGORIES ============ -->
    <section class="section" aria-labelledby="cat-title">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow">Trouvez vite</p>
            <h2 id="cat-title">Quel téléphone cherchez-vous ?</h2>
          </div>
          <RouterLink to="/marques" class="btn btn--outline">Toutes les marques <ArrowRight /></RouterLink>
        </div>
        <ul class="cats">
          <li v-for="(c, i) in categories" :key="c.label" v-reveal="i * 60">
            <RouterLink :to="{ path: '/telephones', query: c.query }" class="cat">
              <span class="cat__icon"><component :is="c.icon" aria-hidden="true" /></span>
              <span class="cat__label">{{ c.label }}</span>
              <span class="cat__hint">{{ c.hint }}</span>
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>

    <!-- ============ PRODUITS ============ -->
    <section class="section section--soft" aria-labelledby="sel-title">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow">Notre sélection</p>
            <h2 id="sel-title">Les téléphones du moment</h2>
          </div>
          <div class="tabs" role="tablist" aria-label="Sélection de téléphones">
            <button
              v-for="(t, i) in tabs"
              :id="`tab-${t.id}`"
              :key="t.id"
              type="button"
              role="tab"
              class="chip"
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
          <RouterLink to="/telephones" class="btn btn--primary btn--lg">Voir les {{ productRepository.all().length }} téléphones <ArrowRight /></RouterLink>
        </div>
      </div>
    </section>

    <!-- ============ AVANTAGES ============ -->
    <section class="section" aria-labelledby="perks-title">
      <div class="container">
        <div class="section-head section-head--center">
          <p class="eyebrow">Pourquoi nous choisir</p>
          <h2 id="perks-title">Acheter en toute confiance</h2>
        </div>
        <ul class="perks">
          <li v-for="(p, i) in perks" :key="p.title" v-reveal="i * 80" class="perk">
            <span class="perk__icon"><DynamicIcon :name="p.icon" /></span>
            <h3>{{ p.title }}</h3>
            <p>{{ p.text }}</p>
          </li>
        </ul>
        <ul class="stats">
          <li v-for="s in stats" :key="s.label"><strong>{{ formatStat(s) }}</strong><span>{{ s.label }}</span></li>
        </ul>
      </div>
    </section>

    <!-- ============ COMMENT COMMANDER ============ -->
    <section class="section section--soft" aria-labelledby="steps-title">
      <div class="container steps-wrap">
        <div>
          <p class="eyebrow">Simple et rapide</p>
          <h2 id="steps-title">Commander en 3 étapes</h2>
          <p class="muted">Pas de compte à créer, pas de paiement en ligne : vous échangez directement avec notre équipe et payez à la réception.</p>
          <a :href="contact.whatsappLink(contact.greeting())" target="_blank" rel="noopener" class="btn btn--whatsapp btn--lg"><WhatsAppIcon /> Démarrer sur WhatsApp</a>
        </div>
        <ol class="steps">
          <li v-for="(s, i) in steps" :key="s.title" v-reveal="i * 100" class="step">
            <span class="step__num" aria-hidden="true">{{ i + 1 }}</span>
            <div>
              <h3>{{ s.title }}</h3>
              <p>{{ s.text }}</p>
            </div>
          </li>
        </ol>
      </div>
    </section>

    <!-- ============ AVIS ============ -->
    <section class="section" aria-labelledby="reviews-title">
      <div class="container">
        <div class="section-head">
          <div>
            <p class="eyebrow">Ils nous font confiance</p>
            <h2 id="reviews-title">Ce que disent nos clients</h2>
          </div>
        </div>
        <ul class="reviews">
          <li v-for="(t, i) in testimonials" :key="t.name" v-reveal="i * 80" class="review">
            <p class="review__stars" :aria-label="`${t.rating} étoiles sur 5`">{{ '★'.repeat(t.rating) }}<span class="review__off">{{ '★'.repeat(5 - t.rating) }}</span></p>
            <blockquote>« {{ t.text }} »</blockquote>
            <p class="review__who"><span class="review__avatar" aria-hidden="true">{{ t.name[0] }}</span><span><strong>{{ t.name }}</strong><small>{{ t.city }}</small></span></p>
          </li>
        </ul>
      </div>
    </section>

    <!-- ============ FAQ ============ -->
    <section class="section section--soft" aria-labelledby="faq-title">
      <div class="container faq-wrap">
        <div>
          <p class="eyebrow">Questions fréquentes</p>
          <h2 id="faq-title">Vous avez des questions ?</h2>
          <p class="muted">Vous ne trouvez pas votre réponse ? Notre équipe vous répond sur WhatsApp en quelques minutes.</p>
          <RouterLink to="/contact" class="btn btn--outline">Nous contacter <ArrowRight /></RouterLink>
        </div>
        <FaqList :items="faq.slice(0, 5)" />
      </div>
    </section>

    <!-- ============ CTA / VISITE ============ -->
    <section class="section" aria-labelledby="visit-title">
      <div class="container">
        <div class="visit" v-reveal>
          <div class="visit__content">
            <p class="eyebrow eyebrow--light">Venez nous voir</p>
            <h2 id="visit-title">Passez en boutique, testez avant d’acheter.</h2>
            <ul class="visit__info">
              <li><MapPin aria-hidden="true" /><a :href="contact.mapsLink" target="_blank" rel="noopener">{{ fullAddress }}</a></li>
              <li><Phone aria-hidden="true" /><a :href="contact.telLink">{{ shop.phoneDisplay }}</a> (appel &amp; WhatsApp)</li>
              <li><Clock aria-hidden="true" />{{ shop.openingHours[0].days }} : {{ shop.openingHours[0].hours }}</li>
            </ul>
            <div class="hero__cta">
              <a :href="contact.telLink" class="btn btn--light btn--lg"><Phone /> Appeler</a>
              <a :href="contact.whatsappLink(contact.greeting())" target="_blank" rel="noopener" class="btn btn--whatsapp btn--lg"><WhatsAppIcon /> WhatsApp</a>
            </div>
          </div>
          <div class="visit__phones" aria-hidden="true">
            <PhoneMockup color="#1428A0" variant="trio" brand="Samsung" />
            <PhoneMockup color="#E8742C" variant="square" view="front" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Hero */
.hero { position: relative; overflow: hidden; padding: clamp(40px, 7vw, 88px) 0 clamp(48px, 7vw, 96px); }
.hero__bg span { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.5; }
.hero__bg span:first-child { width: 520px; height: 520px; background: #818cf8; top: -160px; right: -120px; }
.hero__bg span:last-child { width: 420px; height: 420px; background: #67e8f9; bottom: -200px; left: -140px; opacity: 0.35; }
:root[data-theme='dark'] .hero__bg span { opacity: 0.25; }
.hero__inner { position: relative; display: grid; grid-template-columns: 1.1fr 1fr; gap: 48px; align-items: center; }
.hero__pill { display: inline-flex; align-items: center; gap: 8px; padding: 6px 14px; border-radius: 999px; background: var(--surface); border: 1px solid var(--border); font-size: 0.85rem; font-weight: 600; box-shadow: var(--shadow-sm); }
.hero__pill svg { width: 16px; height: 16px; color: var(--brand-500); }
.hero h1 { margin: 20px 0 18px; }
.hero__lead { font-size: 1.12rem; color: var(--text-muted); max-width: 560px; }
.hero__cta { display: flex; flex-wrap: wrap; gap: 12px; margin: 28px 0; }
.hero__trust { display: flex; flex-wrap: wrap; gap: 10px 22px; font-size: 0.9rem; font-weight: 500; color: var(--text-muted); }
.hero__trust li { display: inline-flex; align-items: center; gap: 8px; }
.hero__trust svg { width: 18px; height: 18px; color: var(--brand-500); }
.hero__visual { position: relative; height: 520px; }
.hero__phone { position: absolute; width: 190px; height: 380px; animation: float 6s ease-in-out infinite; }
.hero__phone--1 { left: 4%; top: 70px; transform: rotate(-12deg); animation-delay: -2s; }
.hero__phone--2 { left: 32%; top: 10px; width: 220px; height: 440px; z-index: 2; animation-delay: -1s; }
.hero__phone--3 { right: 2%; top: 90px; transform: rotate(10deg); animation-delay: -3s; }
@keyframes float { 0%, 100% { translate: 0 0; } 50% { translate: 0 -14px; } }
.hero__float { position: absolute; z-index: 3; display: flex; align-items: center; gap: 10px; padding: 12px 16px; border-radius: 16px; background: var(--surface); border: 1px solid var(--border); box-shadow: var(--shadow); font-size: 0.85rem; }
.hero__float svg { width: 22px; height: 22px; color: var(--brand-500); }
.hero__float span, .hero__float--b { display: grid; line-height: 1.3; }
.hero__float small { color: var(--text-muted); }
.hero__float--a { left: 0; bottom: 40px; }
.hero__float--b { right: 0; top: 20px; }
.hero__stars { color: #f59e0b; letter-spacing: 2px; }

/* Marquee */
.marquee { overflow: hidden; border-block: 1px solid var(--border); background: var(--bg-soft); padding: 18px 0; mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent); }
.marquee__track { display: flex; gap: 56px; width: max-content; animation: scroll 40s linear infinite; }
.marquee:hover .marquee__track, .marquee:focus-within .marquee__track { animation-play-state: paused; }
.marquee__item { font-family: var(--font-display); font-weight: 800; font-size: 1.35rem; color: var(--text-soft); white-space: nowrap; transition: color 0.2s; }
.marquee__item:hover, .marquee__item:focus-visible { color: var(--brand-500); }
@keyframes scroll { to { transform: translateX(-50%); } }

/* Catégories */
.cats { display: grid; grid-template-columns: repeat(6, 1fr); gap: 14px; }
.cat { display: flex; flex-direction: column; gap: 4px; height: 100%; padding: 20px; border-radius: var(--radius); background: var(--surface); border: 1px solid var(--border); transition: all 0.3s var(--ease); }
.cat:hover { border-color: var(--brand-400); transform: translateY(-3px); box-shadow: var(--shadow); }
.cat__icon { width: 46px; height: 46px; border-radius: 14px; display: grid; place-items: center; background: var(--brand-50); color: var(--brand-500); margin-bottom: 10px; transition: all 0.3s; }
:root[data-theme='dark'] .cat__icon { color: #a5b4fc; }
.cat:hover .cat__icon { background: var(--gradient); color: #fff; }
.cat__icon svg { width: 22px; height: 22px; }
.cat__label { font-weight: 700; }
.cat__hint { font-size: 0.8rem; color: var(--text-muted); }

/* Tabs */
.tabs { display: flex; gap: 8px; flex-wrap: wrap; }
.center { display: flex; justify-content: center; margin-top: 40px; }

/* Avantages */
.section-head--center { flex-direction: column; align-items: center; text-align: center; }
.perks { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.perk { padding: 28px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); }
.perk__icon { width: 54px; height: 54px; border-radius: 16px; display: grid; place-items: center; background: var(--gradient); color: #fff; margin-bottom: 18px; box-shadow: var(--shadow-lg); }
.perk__icon svg { width: 26px; height: 26px; }
.perk p { color: var(--text-muted); margin: 0; font-size: 0.93rem; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); margin-top: 40px; border-radius: var(--radius-lg); background: var(--gradient); color: #fff; padding: 32px; gap: 16px; text-align: center; }
.stats strong { display: block; font-family: var(--font-display); font-size: clamp(1.8rem, 3.5vw, 2.6rem); font-weight: 800; line-height: 1.1; }
.stats span { opacity: 0.85; font-size: 0.9rem; }

/* Étapes */
.steps-wrap, .faq-wrap { display: grid; grid-template-columns: 1fr 1.2fr; gap: 56px; align-items: start; }
.steps { display: grid; gap: 16px; list-style: none; margin: 0; padding: 0; }
.step { display: flex; gap: 18px; padding: 22px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); }
.step__num { flex-shrink: 0; width: 48px; height: 48px; border-radius: 50%; display: grid; place-items: center; font-family: var(--font-display); font-weight: 800; font-size: 1.2rem; background: var(--brand-50); color: var(--brand-500); }
:root[data-theme='dark'] .step__num { color: #a5b4fc; }
.step h3 { margin-bottom: 4px; }
.step p { margin: 0; color: var(--text-muted); }

/* Avis */
.reviews { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
.review { display: flex; flex-direction: column; gap: 14px; padding: 24px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); }
.review__stars { margin: 0; color: #f59e0b; letter-spacing: 2px; }
.review__off { color: var(--border); }
.review blockquote { margin: 0; flex: 1; font-size: 0.95rem; }
.review__who { margin: 0; display: flex; align-items: center; gap: 12px; }
.review__who span:last-child { display: grid; line-height: 1.3; }
.review__who small { color: var(--text-muted); }
.review__avatar { width: 42px; height: 42px; border-radius: 50%; background: var(--gradient); color: #fff; display: grid; place-items: center; font-weight: 700; }

/* Visite */
.visit { position: relative; overflow: hidden; display: grid; grid-template-columns: 1.4fr 1fr; gap: 32px; align-items: center; padding: clamp(28px, 5vw, 56px); border-radius: 32px; background: linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #0e7490 100%); color: #fff; }
.eyebrow--light { color: #a5f3fc !important; }
.visit h2 { color: #fff; max-width: 520px; }
.visit__info { display: grid; gap: 12px; margin: 20px 0 8px; }
.visit__info li { display: flex; align-items: center; gap: 12px; }
.visit__info svg { width: 20px; height: 20px; color: #a5f3fc; flex-shrink: 0; }
.visit__info a { text-decoration: underline; text-underline-offset: 3px; }
.visit__phones { display: flex; justify-content: center; gap: 12px; height: 300px; }
.visit__phones > svg { width: 150px; height: 300px; }
.visit__phones > svg:first-child { transform: rotate(-8deg) translateY(10px); }
.visit__phones > svg:last-child { transform: rotate(6deg); }

@media (max-width: 1100px) {
  .cats { grid-template-columns: repeat(3, 1fr); }
  .perks, .reviews { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 900px) {
  .hero__inner, .steps-wrap, .faq-wrap, .visit { grid-template-columns: 1fr; }
  .hero__visual { height: 400px; max-width: 480px; margin: 0 auto; width: 100%; }
  .hero__phone { width: 150px; height: 300px; }
  .hero__phone--2 { width: 175px; height: 350px; }
  .visit__phones { display: none; }
  .steps-wrap, .faq-wrap { gap: 32px; }
}
@media (max-width: 640px) {
  .cats { grid-template-columns: repeat(2, 1fr); gap: 10px; }
  .cat { padding: 16px; }
  .perks, .reviews { grid-template-columns: 1fr; }
  .stats { grid-template-columns: repeat(2, 1fr); padding: 24px 16px; }
  .hero__visual { height: 330px; }
  .hero__phone { width: 120px; height: 240px; }
  .hero__phone--2 { width: 145px; height: 290px; }
  .hero__float { font-size: 0.75rem; padding: 8px 12px; }
  .hero__cta .btn { flex: 1 1 100%; }
}
</style>
