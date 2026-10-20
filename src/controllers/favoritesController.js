import { computed, ref, watch } from 'vue'
import { productRepository } from '@/services/ProductRepository'
import { readJSON, writeJSON } from './storage'
import { useToasts } from './toastController'

const KEY = 'tsb:favorites'
const ids = ref(readJSON(KEY, []).filter((id) => productRepository.findById(id)))
watch(ids, (v) => writeJSON(KEY, v), { deep: true })

export function useFavorites() {
  const { notify } = useToasts()

  const items = computed(() => ids.value.map((id) => productRepository.findById(id)).filter(Boolean))
  const count = computed(() => ids.value.length)
  const isFavorite = (id) => ids.value.includes(id)

  function toggle(product) {
    if (isFavorite(product.id)) {
      ids.value = ids.value.filter((id) => id !== product.id)
      notify(`${product.fullName} retiré des favoris`)
    } else {
      ids.value = [...ids.value, product.id]
      notify(`${product.fullName} ajouté aux favoris`, { tone: 'success' })
    }
  }

  function clear() {
    ids.value = []
  }

  return { items, count, isFavorite, toggle, clear }
}
