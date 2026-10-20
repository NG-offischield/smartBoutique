<script setup>
import { Heart, Trash2, ArrowRight } from 'lucide-vue-next'
import PageHero from '@/views/components/PageHero.vue'
import ProductCard from '@/views/components/ProductCard.vue'
import WhatsAppIcon from '@/views/components/WhatsAppIcon.vue'
import { useFavorites } from '@/controllers/favoritesController'
import { contact } from '@/controllers/contactController'

const { items, count, clear } = useFavorites()
</script>

<template>
  <div>
    <PageHero title="Mes favoris" subtitle="Les téléphones que vous avez mis de côté. Envoyez votre sélection en un clic pour vérifier la disponibilité." />
    <section class="section">
      <div class="container">
        <template v-if="count">
          <div class="bar">
            <p><strong>{{ count }}</strong> téléphone{{ count > 1 ? 's' : '' }} en favoris</p>
            <div class="bar__actions">
              <button type="button" class="btn btn--ghost" @click="clear"><Trash2 /> Tout retirer</button>
              <a :href="contact.whatsappLink(contact.listMessage(items, 'ma liste de favoris'))" target="_blank" rel="noopener" class="btn btn--whatsapp"><WhatsAppIcon /> Envoyer ma sélection</a>
            </div>
          </div>
          <TransitionGroup tag="div" name="list" class="grid grid--products">
            <ProductCard v-for="p in items" :key="p.id" :product="p" />
          </TransitionGroup>
        </template>
        <div v-else class="empty">
          <Heart class="empty__icon" aria-hidden="true" />
          <h2>Aucun favori pour le moment</h2>
          <p class="muted">Touchez le cœur sur un téléphone pour le retrouver ici.</p>
          <RouterLink to="/telephones" class="btn btn--primary">Découvrir les téléphones <ArrowRight /></RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.bar { display: flex; justify-content: space-between; align-items: center; gap: 16px; flex-wrap: wrap; margin-bottom: 24px; }
.bar p { margin: 0; }
.bar__actions { display: flex; gap: 8px; flex-wrap: wrap; }
.empty { text-align: center; padding: 64px 20px; border: 2px dashed var(--border); border-radius: var(--radius-lg); }
.empty__icon { width: 56px; height: 56px; margin: 0 auto 16px; color: var(--text-soft); }
</style>
