<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { ArrowUp } from 'lucide-vue-next'
import WhatsAppIcon from '@/views/components/WhatsAppIcon.vue'
import { contact } from '@/controllers/contactController'

const route = useRoute()
const showTop = ref(false)
const onScroll = () => (showTop.value = window.scrollY > 600)
onMounted(() => window.addEventListener('scroll', onScroll, { passive: true }))
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
const toTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
</script>

<template>
  <div class="fab-stack" :class="{ 'is-raised': route.name === 'product' }">
    <Transition name="fade">
      <button v-if="showTop" type="button" class="fab fab--top" aria-label="Revenir en haut de la page" @click="toTop"><ArrowUp /></button>
    </Transition>
    <a :href="contact.whatsappLink(contact.greeting())" target="_blank" rel="noopener" class="fab fab--wa" aria-label="Discuter avec nous sur WhatsApp">
      <WhatsAppIcon />
      <span class="fab__tooltip" aria-hidden="true">Une question ? Écrivez-nous</span>
    </a>
  </div>
</template>

<style scoped>
.fab-stack { position: fixed; right: 20px; bottom: 20px; z-index: 40; display: flex; flex-direction: column; align-items: center; gap: 12px; }
.fab { width: 56px; height: 56px; border-radius: 50%; display: grid; place-items: center; border: none; position: relative; box-shadow: 0 12px 28px -8px rgb(0 0 0 / 0.35); transition: transform 0.2s var(--ease); }
.fab:hover { transform: scale(1.07); }
.fab--wa { background: var(--whatsapp); color: #fff; }
.fab--wa::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: var(--whatsapp); animation: pulse 2.4s infinite; z-index: -1; }
.fab--wa svg { width: 30px; height: 30px; }
.fab--top { width: 46px; height: 46px; background: var(--surface); color: var(--text); border: 1px solid var(--border); }
.fab--top svg { width: 20px; height: 20px; }
.fab__tooltip { position: absolute; right: calc(100% + 12px); white-space: nowrap; background: var(--text); color: var(--bg); padding: 8px 12px; border-radius: 10px; font-size: 0.85rem; font-weight: 600; opacity: 0; transform: translateX(6px); pointer-events: none; transition: all 0.2s; }
.fab--wa:hover .fab__tooltip, .fab--wa:focus-visible .fab__tooltip { opacity: 1; transform: none; }
@keyframes pulse { 0% { transform: scale(1); opacity: 0.55; } 80%, 100% { transform: scale(1.6); opacity: 0; } }
@media (max-width: 900px) { .fab-stack.is-raised { bottom: 96px; } }
@media (max-width: 640px) { .fab-stack { right: 14px; bottom: 14px; } .fab__tooltip { display: none; } }
</style>
