<script setup>
/**
 * Illustration vectorielle d'un téléphone (dos ou face avant), générée à partir
 * de la couleur et du style de module photo. Légère, nette à toutes les tailles
 * et sans problème de droits d'image.
 */
import { computed, useId } from 'vue'
import { isLight, shade } from '@/views/utils/color'

const props = defineProps({
  color: { type: String, default: '#1F2023' },
  variant: { type: String, default: 'square' },
  view: { type: String, default: 'back' },
  label: { type: String, default: '' },
  brand: { type: String, default: '' },
  island: { type: Boolean, default: false }
})

const uid = useId()
const ids = { body: `b-${uid}`, gloss: `g-${uid}`, screen: `s-${uid}`, lens: `l-${uid}` }

const light = computed(() => isLight(props.color))
const edge = computed(() => shade(props.color, light.value ? -0.18 : 0.22))
const bodyTop = computed(() => shade(props.color, light.value ? 0.12 : 0.14))
const bodyBottom = computed(() => shade(props.color, light.value ? -0.08 : -0.25))
const moduleFill = computed(() => shade(props.color, light.value ? -0.06 : 0.1))
const moduleStroke = computed(() => shade(props.color, light.value ? -0.2 : 0.28))
const textFill = computed(() => (light.value ? 'rgba(0,0,0,.28)' : 'rgba(255,255,255,.32)'))
const isFold = computed(() => props.variant === 'fold' && props.view === 'front')
const width = computed(() => (isFold.value ? 340 : 200))

const lenses = computed(() => {
  switch (props.variant) {
    case 'apple-pro':
      return [[50, 50, 16], [50, 92, 16], [88, 71, 16]]
    case 'apple':
      return [[48, 48, 15], [48, 88, 15]]
    case 'air':
      return [[48, 50, 15]]
    case 'trio':
    case 'fold':
      return [[44, 50, 15], [44, 88, 15], [44, 126, 15]]
    case 'square':
      return [[50, 50, 15], [86, 50, 15], [50, 86, 15]]
    case 'circle':
      return [[100, 66, 15], [80, 100, 15], [120, 100, 15]]
    case 'visor':
      return [[60, 90, 14], [98, 90, 14], [136, 90, 10]]
    case 'bar':
      return [[48, 50, 14], [86, 50, 14]]
    case 'flip':
      return [[52, 52, 13], [52, 88, 13]]
    default:
      return [[50, 50, 15]]
  }
})

const flash = computed(() => {
  const map = { 'apple-pro': [88, 44], apple: [76, 48], air: [84, 50], trio: [76, 50], fold: [76, 50], square: [86, 86], circle: [100, 122], visor: [164, 90], bar: [118, 50], flip: [82, 52] }
  return map[props.variant] || [80, 40]
})
</script>

<template>
  <svg
    :viewBox="`0 0 ${width} 400`"
    class="phone-mockup"
    role="img"
    :aria-label="label || 'Illustration du téléphone'"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient :id="ids.body" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" :stop-color="bodyTop" />
        <stop offset="1" :stop-color="bodyBottom" />
      </linearGradient>
      <linearGradient :id="ids.gloss" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#fff" stop-opacity=".22" />
        <stop offset=".35" stop-color="#fff" stop-opacity="0" />
        <stop offset=".85" stop-color="#fff" stop-opacity="0" />
        <stop offset="1" stop-color="#fff" stop-opacity=".1" />
      </linearGradient>
      <linearGradient :id="ids.screen" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" :stop-color="shade(color, 0.15)" />
        <stop offset=".55" stop-color="#312e81" />
        <stop offset="1" stop-color="#0b1020" />
      </linearGradient>
      <radialGradient :id="ids.lens" cx=".35" cy=".35" r=".7">
        <stop offset="0" stop-color="#4b5d8a" />
        <stop offset=".45" stop-color="#141824" />
        <stop offset="1" stop-color="#05070c" />
      </radialGradient>
    </defs>

    <!-- ===== Face avant ===== -->
    <template v-if="view === 'front'">
      <rect x="4" y="4" :width="width - 8" height="392" rx="34" :fill="edge" />
      <rect x="9" y="9" :width="width - 18" height="382" rx="30" fill="#05070c" />
      <rect x="15" y="15" :width="width - 30" height="370" rx="25" :fill="`url(#${ids.screen})`" />
      <circle :cx="width * 0.78" cy="110" r="70" :fill="color" opacity=".35" />
      <circle :cx="width * 0.2" cy="300" r="90" fill="#06b6d4" opacity=".18" />
      <line v-if="isFold" :x1="width / 2" y1="15" :x2="width / 2" y2="385" stroke="#000" stroke-opacity=".25" stroke-width="2" />
      <rect v-if="island" :x="width / 2 - 28" y="26" width="56" height="17" rx="8.5" fill="#000" />
      <circle v-else :cx="width / 2" cy="34" r="6" fill="#000" />
      <text :x="width / 2" y="122" text-anchor="middle" fill="#fff" font-size="46" font-weight="300" font-family="Inter Variable, system-ui, sans-serif">09:41</text>
      <text :x="width / 2" y="146" text-anchor="middle" fill="#fff" fill-opacity=".75" font-size="12" font-family="Inter Variable, system-ui, sans-serif">The Smart Boutique</text>
      <rect :x="width / 2 - 34" y="370" width="68" height="4" rx="2" fill="#fff" opacity=".6" />
    </template>

    <!-- ===== Dos ===== -->
    <template v-else>
      <rect x="4" y="4" width="192" height="392" rx="34" :fill="edge" />
      <rect x="8" y="8" width="184" height="384" rx="31" :fill="`url(#${ids.body})`" />
      <rect x="8" y="8" width="184" height="384" rx="31" :fill="`url(#${ids.gloss})`" />

      <!-- Modules photo -->
      <rect v-if="variant === 'apple-pro'" x="22" y="22" width="94" height="98" rx="26" :fill="moduleFill" :stroke="moduleStroke" stroke-width="1.5" />
      <rect v-else-if="variant === 'apple'" x="22" y="22" width="70" height="92" rx="26" :fill="moduleFill" :stroke="moduleStroke" stroke-width="1.5" />
      <rect v-else-if="variant === 'air'" x="16" y="24" width="168" height="52" rx="26" :fill="moduleFill" :stroke="moduleStroke" stroke-width="1.5" />
      <rect v-else-if="variant === 'square'" x="22" y="22" width="92" height="92" rx="22" :fill="moduleFill" :stroke="moduleStroke" stroke-width="1.5" />
      <circle v-else-if="variant === 'circle'" cx="100" cy="92" r="58" :fill="moduleFill" :stroke="moduleStroke" stroke-width="1.5" />
      <rect v-else-if="variant === 'visor'" x="8" y="66" width="184" height="48" rx="24" fill="#0b0d12" opacity=".9" />
      <rect v-else-if="variant === 'bar'" x="22" y="26" width="112" height="48" rx="24" :fill="moduleFill" :stroke="moduleStroke" stroke-width="1.5" />
      <template v-else-if="variant === 'flip'">
        <rect x="16" y="16" width="168" height="168" rx="24" fill="#05070c" />
        <rect x="16" y="196" width="168" height="2" fill="#000" opacity=".25" />
        <text x="130" y="150" text-anchor="middle" fill="#fff" fill-opacity=".8" font-size="22" font-weight="300" font-family="Inter Variable, system-ui, sans-serif">09:41</text>
      </template>
      <line v-if="variant === 'fold'" x1="8" y1="200" x2="192" y2="200" stroke="#000" stroke-opacity=".08" />

      <g v-for="([cx, cy, r], i) in lenses" :key="i">
        <circle :cx="cx" :cy="cy" :r="r + 4" :fill="shade(color, light ? -0.35 : 0.3)" />
        <circle :cx="cx" :cy="cy" :r="r" :fill="`url(#${ids.lens})`" />
        <circle :cx="cx" :cy="cy" :r="r * 0.42" fill="#1e2a4a" />
        <circle :cx="cx - r * 0.3" :cy="cy - r * 0.3" :r="r * 0.18" fill="#fff" opacity=".55" />
      </g>
      <circle :cx="flash[0]" :cy="flash[1]" r="5" fill="#fde68a" stroke="#00000022" />

      <text
        v-if="brand"
        x="100"
        y="340"
        text-anchor="middle"
        :fill="textFill"
        font-size="15"
        font-weight="700"
        letter-spacing="1"
        font-family="Plus Jakarta Sans Variable, system-ui, sans-serif"
      >{{ brand }}</text>
    </template>
  </svg>
</template>

<style scoped>
.phone-mockup {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 18px 24px rgb(15 23 42 / 0.25));
}
</style>
