<script setup>
import PageHero from '@/views/components/PageHero.vue'
import DynamicIcon from '@/views/components/DynamicIcon.vue'
import FaqList from '@/views/components/FaqList.vue'
import WhatsAppIcon from '@/views/components/WhatsAppIcon.vue'
import { services, faq } from '@/data/content'
import { contact } from '@/controllers/contactController'
</script>

<template>
  <div>
    <PageHero title="Nos services" subtitle="Bien plus qu’une boutique : nous vous accompagnons avant, pendant et après votre achat." />
    <section class="section">
      <div class="container">
        <ul class="services">
          <li v-for="(s, i) in services" :key="s.title" v-reveal="(i % 3) * 80" class="service">
            <span class="service__icon"><DynamicIcon :name="s.icon" /></span>
            <h2>{{ s.title }}</h2>
            <p>{{ s.text }}</p>
            <a :href="contact.whatsappLink(`${contact.greeting()}\nJe souhaite des informations sur : ${s.title}.`)" target="_blank" rel="noopener" class="service__link">
              <WhatsAppIcon /> Se renseigner
            </a>
          </li>
        </ul>
      </div>
    </section>
    <section class="section section--soft" aria-labelledby="sfaq">
      <div class="container narrow">
        <h2 id="sfaq">Questions fréquentes</h2>
        <FaqList :items="faq" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.services { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
.service { display: flex; flex-direction: column; padding: 28px; border-radius: var(--radius-lg); background: var(--surface); border: 1px solid var(--border); transition: all 0.3s var(--ease); }
.service:hover { transform: translateY(-3px); box-shadow: var(--shadow); }
.service__icon { width: 56px; height: 56px; border-radius: var(--radius); display: grid; place-items: center; background: var(--brand-50); color: var(--brand-ink); margin-bottom: 18px; }
.service__icon svg { width: 26px; height: 26px; }
.service h2 { font-size: 1.2rem; }
.service p { color: var(--text-muted); flex: 1; }
.service__link { display: inline-flex; align-items: center; gap: 8px; font-weight: 600; color: var(--whatsapp-dark); }
:root[data-theme='dark'] .service__link { color: var(--whatsapp); }
.service__link svg { width: 18px; height: 18px; }
.service__link:hover { text-decoration: underline; }
.narrow { max-width: 820px; }
@media (max-width: 900px) { .services { grid-template-columns: 1fr 1fr; } }
@media (max-width: 600px) { .services { grid-template-columns: 1fr; } }
</style>
