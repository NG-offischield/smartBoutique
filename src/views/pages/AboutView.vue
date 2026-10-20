<script setup>
import { ArrowRight } from 'lucide-vue-next'
import PageHero from '@/views/components/PageHero.vue'
import PhoneMockup from '@/views/components/PhoneMockup.vue'
import DynamicIcon from '@/views/components/DynamicIcon.vue'
import { perks } from '@/data/content'
import { productRepository } from '@/services/ProductRepository'
import { formatPrice } from '@/models/format'
import { shop } from '@/config/shop'

// Chiffres calculés à partir du catalogue réel (src/data/products.js)
const facts = [
  { value: productRepository.all().length, label: 'modèles au catalogue' },
  { value: productRepository.brandsWithCount().length, label: 'marques' },
  { value: formatPrice(productRepository.priceBounds().min), label: 'premier prix' },
  { value: productRepository.all().filter((p) => p.condition === 'reconditionne').length, label: 'reconditionnés testés' }
]

const values = [
  { icon: 'BadgeCheck', title: 'Authenticité', text: 'Uniquement des appareils d’origine, traçables et contrôlés.' },
  { icon: 'Award', title: 'Conseil honnête', text: 'Nous vous orientons vers le téléphone adapté à votre usage et à votre budget, pas vers le plus cher.' },
  { icon: 'Store', title: 'Proximité', text: 'Une vraie boutique à Yaoundé, une équipe joignable à tout moment sur WhatsApp.' }
]
</script>

<template>
  <div>
    <PageHero title="À propos" :subtitle="`${shop.name}, votre spécialiste du smartphone à ${shop.address.city}.`" />
    <section class="section">
      <div class="container about">
        <div v-reveal>
          <p class="eyebrow">Notre histoire</p>
          <h2>Rendre la technologie accessible, simplement.</h2>
          <p class="muted">
            {{ shop.name }} est née d’une idée simple : permettre à chacun, à Yaoundé et partout au Cameroun, d’acheter
            un smartphone authentique, au juste prix, avec un vrai service après-vente.
          </p>
          <p class="muted">
            Des modèles d’entrée de gamme itel, Tecno et Infinix aux derniers iPhone, Galaxy et Pixel, nous sélectionnons
            chaque appareil avec soin, nous le testons et nous vous conseillons pour qu’il vous accompagne longtemps.
          </p>
          <RouterLink to="/telephones" class="btn btn--primary">Découvrir nos téléphones <ArrowRight /></RouterLink>
        </div>
        <div class="about__visual" aria-hidden="true">
          <PhoneMockup color="#1428A0" variant="trio" brand="Samsung" />
          <PhoneMockup color="#135C45" variant="apple-pro" view="front" island />
          <PhoneMockup color="#FF6900" variant="square" brand="Xiaomi" />
        </div>
      </div>
    </section>
    <section class="section section--soft" aria-labelledby="values-title">
      <div class="container">
        <h2 id="values-title" class="center-title">Nos valeurs</h2>
        <ul class="values">
          <li v-for="(v, i) in values" :key="v.title" v-reveal="i * 80" class="value">
            <span class="value__icon"><DynamicIcon :name="v.icon" /></span>
            <h3>{{ v.title }}</h3>
            <p>{{ v.text }}</p>
          </li>
        </ul>
        <ul class="stats">
          <li v-for="f in facts" :key="f.label"><strong>{{ f.value }}</strong><span>{{ f.label }}</span></li>
        </ul>
        <ul class="perks">
          <li v-for="p in perks" :key="p.title"><DynamicIcon :name="p.icon" /><span><strong>{{ p.title }}</strong> — {{ p.text }}</span></li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.about { display: grid; grid-template-columns: 1.1fr 1fr; gap: 56px; align-items: center; }
.about__visual { display: flex; justify-content: center; gap: 4px; height: 360px; }
.about__visual > svg { width: 150px; height: 300px; }
.about__visual > svg:nth-child(1) { transform: rotate(-10deg) translateY(30px); }
.about__visual > svg:nth-child(2) { width: 170px; height: 340px; z-index: 1; }
.about__visual > svg:nth-child(3) { transform: rotate(10deg) translateY(30px); }
.center-title { text-align: center; margin-bottom: 32px; }
.values { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.value { padding: 28px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); }
.value__icon { width: 52px; height: 52px; border-radius: var(--radius); display: grid; place-items: center; background: var(--brand-50); color: var(--brand-ink); margin-bottom: 16px; }
.value__icon svg { width: 24px; height: 24px; }
.value p { color: var(--text-muted); margin: 0; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); margin: 40px 0; padding: 24px 0; gap: 16px; border-block: 1px solid var(--border); }
.stats strong { display: block; font-family: var(--font-display); font-size: clamp(1.5rem, 3vw, 2.1rem); font-weight: 700; line-height: 1.15; font-variant-numeric: tabular-nums; }
.stats span { color: var(--text-muted); font-size: 0.9rem; }
.perks { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
.perks li { display: flex; gap: 12px; align-items: flex-start; color: var(--text-muted); }
.perks strong { color: var(--text); }
.perks svg { width: 22px; height: 22px; color: var(--brand-ink); flex-shrink: 0; margin-top: 2px; }
@media (max-width: 900px) {
  .about { grid-template-columns: 1fr; }
  .about__visual { height: 300px; }
  .about__visual > svg { width: 110px; height: 220px; }
  .about__visual > svg:nth-child(2) { width: 130px; height: 260px; }
  .values { grid-template-columns: 1fr; }
}
@media (max-width: 640px) { .stats { grid-template-columns: 1fr 1fr; padding: 20px 0; } .perks { grid-template-columns: 1fr; } }
</style>
