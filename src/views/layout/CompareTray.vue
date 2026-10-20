<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowLeftRight, X } from 'lucide-vue-next'
import { useCompare, MAX_COMPARE } from '@/controllers/compareController'

const route = useRoute()
const { items, count, clear } = useCompare()
const visible = computed(() => count.value > 0 && route.name !== 'compare')
</script>

<template>
  <Transition name="fade">
    <div v-if="visible" class="tray" :class="{ 'is-raised': route.name === 'product' }" role="region" aria-label="Comparateur">
      <ArrowLeftRight class="tray__icon" aria-hidden="true" />
      <span class="tray__text">
        <strong>{{ count }}/{{ MAX_COMPARE }}</strong> à comparer
        <small>{{ items.map((p) => p.name).join(' · ') }}</small>
      </span>
      <RouterLink to="/comparateur" class="btn btn--primary btn--sm">Comparer</RouterLink>
      <button type="button" class="tray__close" aria-label="Vider le comparateur" @click="clear"><X /></button>
    </div>
  </Transition>
</template>

<style scoped>
.tray { position: fixed; left: 20px; bottom: 20px; z-index: 39; display: flex; align-items: center; gap: 12px; padding: 8px 8px 8px 16px; max-width: min(480px, calc(100vw - 110px)); background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); box-shadow: var(--shadow); }
.tray__icon { width: 20px; height: 20px; color: var(--brand-ink); flex-shrink: 0; }
.tray__text { display: grid; line-height: 1.2; font-size: 0.9rem; min-width: 0; }
.tray__text small { color: var(--text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tray__close { width: 34px; height: 34px; border-radius: 50%; border: none; background: var(--surface-2); display: grid; place-items: center; flex-shrink: 0; }
.tray__close svg { width: 16px; height: 16px; }
@media (max-width: 900px) { .tray.is-raised { bottom: 96px; } }
@media (max-width: 640px) { .tray { left: 14px; bottom: 14px; } .tray__text small { display: none; } }
</style>
