<script setup>
defineProps({ compact: { type: Boolean, default: false }, light: { type: Boolean, default: false } })
</script>

<template>
  <span class="logo" :class="{ 'logo--light': light }">
    <svg class="logo__mark" viewBox="0 0 128 128" aria-hidden="true">
      <rect width="128" height="128" rx="26" fill="#135C45" />
      <path d="M47 41c0-17 34-17 34 0" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round" />
      <rect x="37" y="36" width="54" height="80" rx="13" fill="#fff" />
      <rect x="56" y="42" width="16" height="4.5" rx="2.25" fill="#14201B" opacity=".9" />
      <path d="M74.5 62.5c0-6-5-9.5-10.5-9.5c-6.2 0-10.8 3.6-10.8 9c0 6.6 6.4 8.3 11 9.4c5.2 1.2 11.3 2.8 11.3 9.6c0 5.8-5.2 9.5-11.5 9.5c-6.4 0-11.5-3.6-11.5-9.8" fill="none" stroke="#135C45" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="56" y="106" width="16" height="4" rx="2" fill="#135C45" opacity=".3" />
      <path d="M103 14l3.2 8.8L115 26l-8.8 3.2L103 38l-3.2-8.8L91 26l8.8-3.2z" fill="#F2A93B" />
    </svg>
    <span v-if="!compact" class="logo__text">
      <span class="logo__the">The</span>
      <span class="logo__name">Smart <span class="logo__accent">Boutique</span></span>
    </span>
  </span>
</template>

<style scoped>
.logo { display: inline-flex; align-items: center; gap: 10px; }
.logo__mark { width: 42px; height: 42px; flex-shrink: 0; }
.logo__text { display: grid; line-height: 1; }
.logo__the { font-size: 0.66rem; font-weight: 600; letter-spacing: 0.24em; text-transform: uppercase; color: var(--text-muted); }
.logo__name { font-family: var(--font-display); font-weight: 750; font-size: 1.28rem; letter-spacing: -0.03em; color: var(--text); }
.logo__accent { color: var(--brand-ink); }
.logo--light .logo__the { color: rgb(255 255 255 / 0.65); }
.logo--light .logo__name { color: #fff; }
.logo--light .logo__accent { color: var(--accent); }
</style>
