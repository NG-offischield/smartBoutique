<script setup>
/**
 * Affiche une icône à partir de son nom (utilisé par les contenus éditables de src/data/content.js).
 * Seules les icônes listées ici sont incluses dans le site, pour garder un poids minimal.
 */
import { ShieldCheck, Truck, Banknote, BadgeCheck, Smartphone, RefreshCw, Wrench, Package, Layers, Headphones, Sparkles, Gift, Award, Store } from 'lucide-vue-next'
const icons = { ShieldCheck, Truck, Banknote, BadgeCheck, Smartphone, RefreshCw, Wrench, Package, Layers, Headphones, Sparkles, Gift, Award, Store }
defineProps({ name: { type: String, required: true } })
</script>

<template>
  <component :is="icons[name] || Sparkles" aria-hidden="true" />
</template>
