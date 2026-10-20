<script setup>
import { ref, useId } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
defineProps({ items: { type: Array, required: true } })
const open = ref(0)
const uid = useId()
</script>

<template>
  <div class="faq">
    <div v-for="(item, i) in items" :key="item.q" class="faq__item" :class="{ 'is-open': open === i }">
      <h3 class="faq__q">
        <button type="button" :id="`${uid}-q${i}`" :aria-expanded="open === i" :aria-controls="`${uid}-a${i}`" @click="open = open === i ? -1 : i">
          <span>{{ item.q }}</span>
          <ChevronDown aria-hidden="true" />
        </button>
      </h3>
      <div :id="`${uid}-a${i}`" class="faq__a" role="region" :aria-labelledby="`${uid}-q${i}`" :hidden="open !== i">
        <p>{{ item.a }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.faq { display: grid; gap: 12px; }
.faq__item { background: var(--surface); border: 1px solid var(--border); border-radius: var(--radius); transition: border-color 0.2s, box-shadow 0.2s; }
.faq__item.is-open { border-color: var(--brand-400); box-shadow: var(--shadow-sm); }
.faq__q { margin: 0; font-size: 1rem; }
.faq__q button { width: 100%; display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 18px 20px; background: none; border: none; text-align: left; font-weight: 600; min-height: 56px; }
.faq__q svg { width: 20px; height: 20px; flex-shrink: 0; transition: transform 0.3s var(--ease); color: var(--brand-500); }
.is-open .faq__q svg { transform: rotate(180deg); }
.faq__a { padding: 0 20px 18px; color: var(--text-muted); }
.faq__a p { margin: 0; }
</style>
