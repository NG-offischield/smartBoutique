<script setup>
import { House, Smartphone } from 'lucide-vue-next'
import WhatsAppIcon from '@/views/components/WhatsAppIcon.vue'
import { contact } from '@/controllers/contactController'
defineProps({ message: { type: String, default: 'La page que vous cherchez n’existe pas ou a été déplacée.' } })
</script>

<template>
  <section class="nf container" aria-labelledby="nf-title">
    <p class="nf__code" aria-hidden="true">404</p>
    <h1 id="nf-title">Oups, page introuvable</h1>
    <p class="muted">{{ message }}</p>
    <div class="nf__actions">
      <RouterLink to="/" class="btn btn--primary"><House /> Accueil</RouterLink>
      <RouterLink to="/telephones" class="btn btn--outline"><Smartphone /> Voir les téléphones</RouterLink>
      <a :href="contact.whatsappLink(contact.greeting())" target="_blank" rel="noopener" class="btn btn--whatsapp"><WhatsAppIcon /> Nous écrire</a>
    </div>
  </section>
</template>

<style scoped>
.nf { text-align: center; padding: 96px 20px; }
.nf__code { font-family: var(--font-display); font-size: clamp(6rem, 18vw, 10rem); font-weight: 800; line-height: 1; margin: 0; background: var(--gradient); -webkit-background-clip: text; background-clip: text; color: transparent; }
.nf__actions { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 28px; }
</style>
