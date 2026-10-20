<script setup>
import { Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-vue-next'
import BrandLogo from '@/views/components/BrandLogo.vue'
import WhatsAppIcon from '@/views/components/WhatsAppIcon.vue'
import { shop, fullAddress } from '@/config/shop'
import { contact } from '@/controllers/contactController'
import { productRepository } from '@/services/ProductRepository'

const topBrands = productRepository.brandsWithCount().slice(0, 8)
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__grid">
      <div class="footer__about">
        <RouterLink to="/" aria-label="The Smart Boutique — accueil"><BrandLogo light /></RouterLink>
        <p>{{ shop.slogan }} Smartphones neufs et reconditionnés, garantis et livrés, au cœur de {{ shop.address.city }}.</p>
        <div class="footer__social">
          <a :href="contact.whatsappLink(contact.greeting())" target="_blank" rel="noopener" aria-label="WhatsApp"><WhatsAppIcon /></a>
          <a v-if="shop.socials.facebook" :href="shop.socials.facebook" target="_blank" rel="noopener" aria-label="Facebook"><Facebook /></a>
          <a v-if="shop.socials.instagram" :href="shop.socials.instagram" target="_blank" rel="noopener" aria-label="Instagram"><Instagram /></a>
        </div>
      </div>

      <nav aria-labelledby="f-shop">
        <h2 id="f-shop" class="footer__title">Boutique</h2>
        <ul>
          <li><RouterLink to="/telephones">Tous les téléphones</RouterLink></li>
          <li><RouterLink :to="{ path: '/telephones', query: { promo: '1' } }">Promotions</RouterLink></li>
          <li><RouterLink :to="{ path: '/telephones', query: { etat: 'reconditionne' } }">Reconditionnés</RouterLink></li>
          <li><RouterLink :to="{ path: '/telephones', query: { reseau: '5G' } }">Smartphones 5G</RouterLink></li>
          <li><RouterLink to="/comparateur">Comparateur</RouterLink></li>
          <li><RouterLink to="/favoris">Mes favoris</RouterLink></li>
        </ul>
      </nav>

      <nav aria-labelledby="f-brands">
        <h2 id="f-brands" class="footer__title">Marques</h2>
        <ul>
          <li v-for="{ brand } in topBrands" :key="brand.id">
            <RouterLink :to="{ path: '/telephones', query: { marques: brand.id } }">{{ brand.name }}</RouterLink>
          </li>
          <li><RouterLink to="/marques">Toutes les marques →</RouterLink></li>
        </ul>
      </nav>

      <div>
        <h2 class="footer__title">Nous trouver</h2>
        <ul class="footer__contact">
          <li><MapPin aria-hidden="true" /><a :href="contact.mapsLink" target="_blank" rel="noopener">{{ fullAddress }}</a></li>
          <li><Phone aria-hidden="true" /><a :href="contact.telLink">{{ shop.phoneDisplay }}</a></li>
          <li><WhatsAppIcon /><a :href="contact.whatsappLink(contact.greeting())" target="_blank" rel="noopener">WhatsApp : {{ shop.phoneDisplay }}</a></li>
          <li>
            <Clock aria-hidden="true" />
            <span><template v-for="h in shop.openingHours" :key="h.days">{{ h.days }} : {{ h.hours }}<br /></template></span>
          </li>
        </ul>
      </div>
    </div>
    <div class="container footer__bottom">
      <p>© {{ year }} {{ shop.name }} — Tous droits réservés.</p>
      <p>
        <RouterLink to="/services">Garantie &amp; SAV</RouterLink> ·
        <RouterLink to="/a-propos">À propos</RouterLink> ·
        <RouterLink to="/contact">Contact</RouterLink>
      </p>
    </div>
  </footer>
</template>

<style scoped>
.footer { background: #0a1712; color: #c2ccc5; padding-top: 64px; margin-top: auto; }
.footer__grid { display: grid; grid-template-columns: 1.4fr 1fr 1fr 1.4fr; gap: 40px; padding-bottom: 48px; }
.footer__about p { margin: 18px 0; max-width: 340px; font-size: 0.92rem; }
.footer__title { font-size: 0.85rem; letter-spacing: 0.08em; text-transform: uppercase; color: #fff; margin-bottom: 16px; }
.footer ul { display: grid; gap: 10px; font-size: 0.92rem; }
.footer a { transition: color 0.2s; }
.footer a:hover { color: #fff; }
.footer__social { display: flex; gap: 10px; }
.footer__social a { width: 42px; height: 42px; border-radius: 50%; display: grid; place-items: center; background: rgb(255 255 255 / 0.08); }
.footer__social a:hover { background: var(--whatsapp); color: #fff; }
.footer__social svg { width: 20px; height: 20px; }
.footer__contact li { display: grid; grid-template-columns: 20px 1fr; gap: 10px; align-items: start; }
.footer__contact svg { width: 18px; height: 18px; margin-top: 3px; color: var(--accent); }
.footer__bottom { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; padding-top: 20px; padding-bottom: 96px; border-top: 1px solid rgb(255 255 255 / 0.08); font-size: 0.85rem; }
.footer__bottom p { margin: 0; }
@media (max-width: 960px) { .footer__grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 560px) { .footer__grid { grid-template-columns: 1fr; gap: 32px; } }
</style>
