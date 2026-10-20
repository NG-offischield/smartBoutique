import { computed, ref, watch } from 'vue'
import { productRepository } from '@/services/ProductRepository'
import { readJSON, writeJSON } from './storage'
import { useToasts } from './toastController'

export const MAX_COMPARE = 3
const KEY = 'tsb:compare'
const ids = ref(readJSON(KEY, []).filter((id) => productRepository.findById(id)).slice(0, MAX_COMPARE))
watch(ids, (v) => writeJSON(KEY, v), { deep: true })

export function useCompare() {
  const { notify } = useToasts()

  const items = computed(() => ids.value.map((id) => productRepository.findById(id)).filter(Boolean))
  const count = computed(() => ids.value.length)
  const isCompared = (id) => ids.value.includes(id)

  function toggle(product) {
    if (isCompared(product.id)) {
      ids.value = ids.value.filter((id) => id !== product.id)
      notify(`${product.fullName} retiré du comparateur`)
      return
    }
    if (ids.value.length >= MAX_COMPARE) {
      notify(`Vous pouvez comparer ${MAX_COMPARE} téléphones maximum. Retirez-en un d’abord.`, { tone: 'warning' })
      return
    }
    ids.value = [...ids.value, product.id]
    notify(`${product.fullName} ajouté au comparateur`, { tone: 'success' })
  }

  function remove(id) {
    ids.value = ids.value.filter((x) => x !== id)
  }

  function clear() {
    ids.value = []
  }

  return { items, count, isCompared, toggle, remove, clear }
}
