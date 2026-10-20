<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: '' },
  crumb: { type: String, default: '' }
})
</script>

<template>
  <header class="page-hero">
    <div class="container">
      <nav class="crumbs" aria-label="Fil d’Ariane">
        <RouterLink to="/">Accueil</RouterLink><span aria-hidden="true">/</span><span aria-current="page">{{ crumb || title }}</span>
      </nav>
      <h1>{{ title }}</h1>
      <p v-if="subtitle" class="muted">{{ subtitle }}</p>
      <slot />
    </div>
  </header>
</template>

<style scoped>
.page-hero { background: var(--gradient-soft); padding: 32px 0 40px; border-bottom: 1px solid var(--border); }
.page-hero h1 { font-size: clamp(1.8rem, 3.5vw, 2.6rem); margin-top: 12px; }
.page-hero p { margin: 0; max-width: 640px; }
.crumbs { display: flex; gap: 8px; font-size: 0.85rem; color: var(--text-muted); flex-wrap: wrap; }
.crumbs a:hover { color: var(--brand-ink); text-decoration: underline; }
</style>
