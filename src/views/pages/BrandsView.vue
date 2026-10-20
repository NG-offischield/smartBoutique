<script setup>
import { ArrowRight } from 'lucide-vue-next'
import PageHero from '@/views/components/PageHero.vue'
import PhoneMockup from '@/views/components/PhoneMockup.vue'
import { productRepository } from '@/services/ProductRepository'
import { formatPrice } from '@/models/format'

const brands = productRepository.brandsWithCount().map(({ brand, count }) => {
  const products = productRepository.byBrand(brand.id)
  return { brand, count, from: Math.min(...products.map((p) => p.basePrice)), sample: products[0] }
})
</script>

<template>
  <div>
    <PageHero title="Toutes les marques" :subtitle="`${brands.length} marques de smartphones, des plus accessibles aux plus prestigieuses.`" />
    <section class="section">
      <div class="container">
        <ul class="brands">
          <li v-for="({ brand, count, from, sample }, i) in brands" :key="brand.id" v-reveal="(i % 4) * 60">
            <RouterLink :to="{ path: '/telephones', query: { marques: brand.id } }" class="brand" :style="{ '--brand': brand.color }">
              <span class="brand__phone" aria-hidden="true">
                <PhoneMockup :color="sample.colors[0].hex" :variant="sample.mockup" :brand="brand.name" />
              </span>
              <span class="brand__body">
                <span class="brand__name">{{ brand.name }}</span>
                <span class="brand__tag">{{ brand.tagline }}</span>
                <span class="brand__meta">{{ count }} modèle{{ count > 1 ? 's' : '' }} · dès {{ formatPrice(from) }}</span>
              </span>
              <ArrowRight class="brand__arrow" aria-hidden="true" />
            </RouterLink>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.brands { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 18px; }
.brand { position: relative; display: flex; align-items: center; gap: 16px; height: 100%; padding: 18px 20px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); overflow: hidden; transition: all 0.3s var(--ease); }
.brand::before { content: ''; position: absolute; inset: 0 auto 0 0; width: 4px; background: var(--brand); }
.brand:hover { transform: translateY(-3px); box-shadow: var(--shadow); border-color: transparent; }
.brand__phone { width: 44px; height: 88px; flex-shrink: 0; transition: transform 0.4s var(--ease); }
.brand:hover .brand__phone { transform: rotate(-8deg) scale(1.05); }
.brand__body { display: grid; gap: 2px; flex: 1; min-width: 0; }
.brand__name { font-family: var(--font-display); font-weight: 700; font-size: 1.2rem; }
.brand__tag { font-size: 0.85rem; color: var(--text-muted); }
.brand__meta { font-size: 0.8rem; font-weight: 600; color: var(--brand-ink); margin-top: 4px; }
.brand__arrow { width: 20px; height: 20px; color: var(--text-soft); transition: transform 0.2s, color 0.2s; flex-shrink: 0; }
.brand:hover .brand__arrow { transform: translateX(4px); color: var(--brand-ink); }
</style>
