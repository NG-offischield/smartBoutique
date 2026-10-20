import { ref, watch } from 'vue'
import { readJSON, writeJSON } from './storage'

const KEY = 'tsb:theme'
const media = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null
const theme = ref(readJSON(KEY, null) || (media?.matches ? 'dark' : 'light'))

function apply(value) {
  document.documentElement.dataset.theme = value
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', value === 'dark' ? '#0B1020' : '#FFFFFF')
}

apply(theme.value)
watch(theme, (v) => {
  apply(v)
  writeJSON(KEY, v)
})

export function useTheme() {
  const toggle = () => (theme.value = theme.value === 'dark' ? 'light' : 'dark')
  return { theme, toggle }
}
