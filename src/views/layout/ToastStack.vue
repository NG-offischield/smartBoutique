<script setup>
import { CircleCheck, Info, TriangleAlert, X } from 'lucide-vue-next'
import { useToasts } from '@/controllers/toastController'
const { toasts, dismiss } = useToasts()
const icons = { success: CircleCheck, warning: TriangleAlert, info: Info }
</script>

<template>
  <div class="toasts" role="status" aria-live="polite">
    <TransitionGroup name="toast">
      <div v-for="t in toasts" :key="t.id" class="toast" :class="`toast--${t.tone}`">
        <component :is="icons[t.tone] || Info" class="toast__icon" aria-hidden="true" />
        <span>{{ t.message }}</span>
        <button type="button" class="toast__close" aria-label="Fermer la notification" @click="dismiss(t.id)"><X /></button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toasts { position: fixed; left: 50%; bottom: 24px; transform: translateX(-50%); z-index: 100; display: grid; gap: 8px; width: min(440px, calc(100vw - 32px)); pointer-events: none; }
.toast { pointer-events: auto; display: flex; align-items: center; gap: 10px; padding: 12px 12px 12px 16px; border-radius: var(--radius); background: #14201b; color: #fff; box-shadow: 0 16px 40px -12px rgb(0 0 0 / 0.5); font-size: 0.9rem; font-weight: 500; }
.toast__icon { width: 20px; height: 20px; flex-shrink: 0; color: #7fd0ad; }
.toast--success .toast__icon { color: #4ade80; }
.toast--warning .toast__icon { color: #fbbf24; }
.toast span { flex: 1; }
.toast__close { background: none; border: none; color: #9ca3af; width: 32px; height: 32px; display: grid; place-items: center; border-radius: 8px; }
.toast__close:hover { color: #fff; background: rgb(255 255 255 / 0.1); }
.toast__close svg { width: 16px; height: 16px; }
.toast-enter-active, .toast-leave-active { transition: all 0.3s var(--ease); }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(16px) scale(0.96); }
@media (max-width: 640px) { .toasts { bottom: 84px; } }
</style>
