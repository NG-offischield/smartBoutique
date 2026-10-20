/** v-reveal : fait apparaître un élément en douceur quand il entre dans l'écran. */
let observer

function getObserver() {
  if (!observer && typeof IntersectionObserver !== 'undefined') {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )
  }
  return observer
}

export default {
  mounted(el, binding) {
    const obs = getObserver()
    if (!obs) return
    el.classList.add('reveal')
    if (binding.value) el.style.transitionDelay = `${binding.value}ms`
    obs.observe(el)
  },
  unmounted(el) {
    observer?.unobserve(el)
  }
}
