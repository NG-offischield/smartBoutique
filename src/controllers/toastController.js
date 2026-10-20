import { reactive } from 'vue'

const state = reactive({ items: [] })
let nextId = 1

export function useToasts() {
  function notify(message, { tone = 'info', duration = 3200 } = {}) {
    const id = nextId++
    state.items.push({ id, message, tone })
    setTimeout(() => dismiss(id), duration)
  }
  function dismiss(id) {
    const i = state.items.findIndex((t) => t.id === id)
    if (i !== -1) state.items.splice(i, 1)
  }
  return { toasts: state.items, notify, dismiss }
}
