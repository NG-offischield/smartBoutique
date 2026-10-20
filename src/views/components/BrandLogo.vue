<script setup>
import { useId } from 'vue'
defineProps({ compact: { type: Boolean, default: false }, light: { type: Boolean, default: false } })
const uid = useId()
</script>

<template>
  <span class="logo" :class="{ 'logo--light': light }">
    <svg class="logo__mark" viewBox="0 0 128 128" aria-hidden="true">
      <defs>
        <linearGradient :id="`lb-${uid}`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#4338CA" /><stop offset=".55" stop-color="#4F46E5" /><stop offset="1" stop-color="#06B6D4" />
        </linearGradient>
        <linearGradient :id="`li-${uid}`" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stop-color="#4338CA" /><stop offset="1" stop-color="#0891B2" />
        </linearGradient>
      </defs>
      <rect width="128" height="128" rx="30" :fill="`url(#lb-${uid})`" />
      <path d="M47 41c0-17 34-17 34 0" fill="none" stroke="#fff" stroke-width="5.5" stroke-linecap="round" />
      <rect x="37" y="36" width="54" height="80" rx="13" fill="#fff" />
      <rect x="56" y="42" width="16" height="4.5" rx="2.25" fill="#0F172A" opacity=".85" />
      <path d="M74.5 62.5c0-6-5-9.5-10.5-9.5c-6.2 0-10.8 3.6-10.8 9c0 6.6 6.4 8.3 11 9.4c5.2 1.2 11.3 2.8 11.3 9.6c0 5.8-5.2 9.5-11.5 9.5c-6.4 0-11.5-3.6-11.5-9.8" fill="none" :stroke="`url(#li-${uid})`" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" />
      <rect x="56" y="106" width="16" height="4" rx="2" fill="#4F46E5" opacity=".35" />
      <path d="M103 14l3.2 8.8L115 26l-8.8 3.2L103 38l-3.2-8.8L91 26l8.8-3.2z" fill="#FCD34D" />
    </svg>
    <span v-if="!compact" class="logo__text">
      <span class="logo__the">The</span>
      <span class="logo__name">Smart<span class="logo__accent">Boutique</span></span>
    </span>
  </span>
</template>

<style scoped>
.logo { display: inline-flex; align-items: center; gap: 10px; }
.logo__mark { width: 42px; height: 42px; flex-shrink: 0; }
.logo__text { display: grid; line-height: 1; }
.logo__the { font-size: 0.68rem; font-weight: 600; letter-spacing: 0.22em; text-transform: uppercase; color: var(--text-muted); }
.logo__name { font-family: var(--font-display); font-weight: 800; font-size: 1.22rem; letter-spacing: -0.02em; color: var(--text); }
.logo__accent { margin-left: 4px; background: var(--gradient); -webkit-background-clip: text; background-clip: text; color: transparent; }
.logo--light .logo__the { color: rgb(255 255 255 / 0.7); }
.logo--light .logo__name { color: #fff; }
.logo--light .logo__accent { background: linear-gradient(90deg, #a5b4fc, #67e8f9); -webkit-background-clip: text; background-clip: text; }
</style>
