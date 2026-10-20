<script setup>
import { ref } from 'vue'
import PhoneMockup from './PhoneMockup.vue'

const props = defineProps({
  product: { type: Object, required: true },
  color: { type: Object, default: null },
  view: { type: String, default: 'back' }
})

// Si une vraie photo est fournie mais ne se charge pas, on revient à l'illustration
const imageFailed = ref(false)
</script>

<template>
  <img
    v-if="product.image && !imageFailed && view === 'back'"
    :src="product.image"
    :alt="product.fullName"
    loading="lazy"
    decoding="async"
    class="product-visual__img"
    @error="imageFailed = true"
  />
  <PhoneMockup
    v-else
    :color="(color || product.colors[0]).hex"
    :variant="product.mockup"
    :view="view"
    :brand="product.brand.name"
    :island="product.brand.id === 'apple'"
    :label="`${product.fullName} – coloris ${(color || product.colors[0]).name}`"
  />
</template>

<style scoped>
.product-visual__img { width: 100%; height: 100%; object-fit: contain; }
</style>
