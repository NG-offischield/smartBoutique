<script setup>
import { Star } from 'lucide-vue-next'
defineProps({ value: { type: Number, required: true }, reviews: { type: Number, default: 0 } })
</script>

<template>
  <span class="rating" :aria-label="`Note ${value.toLocaleString('fr-FR')} sur 5${reviews ? `, ${reviews} avis` : ''}`">
    <Star class="rating__star" aria-hidden="true" />
    <strong>{{ value.toLocaleString('fr-FR', { minimumFractionDigits: 1 }) }}</strong>
    <span v-if="reviews" class="rating__count" aria-hidden="true">({{ reviews }})</span>
  </span>
</template>

<style scoped>
.rating { display: inline-flex; align-items: center; gap: 4px; font-size: 0.85rem; }
.rating__star { width: 15px; height: 15px; color: #f59e0b; fill: #f59e0b; }
.rating__count { color: var(--text-soft); }
</style>
