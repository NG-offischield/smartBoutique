<script setup>
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Sun, Moon, Heart, ArrowLeftRight, Menu, X, Phone } from 'lucide-vue-next'
import BrandLogo from '@/views/components/BrandLogo.vue'
import WhatsAppIcon from '@/views/components/WhatsAppIcon.vue'
import { useTheme } from '@/controllers/themeController'
import { useFavorites } from '@/controllers/favoritesController'
import { useCompare } from '@/controllers/compareController'
import { contact } from '@/controllers/contactController'
import { shop } from '@/config/shop'

const emit = defineEmits(['open-search'])
const { theme, toggle } = useTheme()
const { count: favCount } = useFavorites()
const { count: cmpCount } = useCompare()
const route = useRoute()

const links = [
  { to: '/', label: 'Accueil' },
  { to: '/telephones', label: 'Téléphones' },
  { to: '/marques', label: 'Marques' },
  { to: '/services', label: 'Services' },
  { to: '/a-propos', label: 'À propos' },
  { to: '/contact', label: 'Contact' }
]

const scrolled = ref(false)
const menuOpen = ref(false)
const onScroll = () => (scrolled.value = window.scrollY > 8)
const onKey = (e) => {
  if (e.key === 'Escape') menuOpen.value = false
}
onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKey)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKey)
})
watch(() => route.fullPath, () => (menuOpen.value = false))
watch(menuOpen, (open) => document.body.style.setProperty('overflow', open ? 'hidden' : ''))

const isActive = (to) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
</script>

<template>
  <header class="header" :class="{ 'is-scrolled': scrolled }">
    <div class="topbar">
      <div class="container topbar__inner">
        <span>📍 {{ shop.address.street }}, {{ shop.address.city }}</span>
        <span class="topbar__right">
          <a :href="contact.telLink"><Phone aria-hidden="true" /> {{ shop.phoneDisplay }}</a>
          <span class="topbar__sep" aria-hidden="true">•</span>
          <span>Livraison à Yaoundé &amp; Douala</span>
        </span>
      </div>
    </div>
    <div class="container header__inner">
      <RouterLink to="/" class="header__logo" aria-label="The Smart Boutique — accueil">
        <BrandLogo />
      </RouterLink>

      <nav class="nav" aria-label="Navigation principale">
        <RouterLink v-for="l in links" :key="l.to" :to="l.to" class="nav__link" :class="{ 'is-active': isActive(l.to) }" :aria-current="isActive(l.to) ? 'page' : undefined">
          {{ l.label }}
        </RouterLink>
      </nav>

      <div class="header__tools">
        <button type="button" class="search-trigger" aria-label="Rechercher un téléphone (raccourci : /)" @click="emit('open-search')">
          <Search aria-hidden="true" />
          <span class="search-trigger__label">Rechercher…</span>
          <kbd aria-hidden="true">/</kbd>
        </button>
        <button type="button" class="icon-btn hide-sm" :aria-label="theme === 'dark' ? 'Activer le thème clair' : 'Activer le thème sombre'" @click="toggle">
          <Sun v-if="theme === 'dark'" /><Moon v-else />
        </button>
        <RouterLink to="/favoris" class="icon-btn hide-xs" :aria-label="`Mes favoris (${favCount})`">
          <Heart /><span v-if="favCount" class="counter" aria-hidden="true">{{ favCount }}</span>
        </RouterLink>
        <RouterLink to="/comparateur" class="icon-btn hide-xs" :aria-label="`Comparateur (${cmpCount})`">
          <ArrowLeftRight /><span v-if="cmpCount" class="counter" aria-hidden="true">{{ cmpCount }}</span>
        </RouterLink>
        <a :href="contact.whatsappLink(contact.greeting())" target="_blank" rel="noopener" class="btn btn--whatsapp btn--sm hide-md">
          <WhatsAppIcon /> WhatsApp
        </a>
        <button type="button" class="icon-btn burger" :aria-expanded="menuOpen" aria-controls="mobile-menu" :aria-label="menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'" @click="menuOpen = !menuOpen">
          <X v-if="menuOpen" /><Menu v-else />
        </button>
      </div>
    </div>

    <Transition name="drawer">
      <div v-if="menuOpen" id="mobile-menu" class="drawer" role="dialog" aria-modal="true" aria-label="Menu">
        <nav aria-label="Navigation mobile">
          <RouterLink v-for="l in links" :key="l.to" :to="l.to" class="drawer__link" :class="{ 'is-active': isActive(l.to) }">{{ l.label }}</RouterLink>
          <RouterLink to="/favoris" class="drawer__link">Mes favoris <span v-if="favCount" class="badge badge--nouveau">{{ favCount }}</span></RouterLink>
          <RouterLink to="/comparateur" class="drawer__link">Comparateur <span v-if="cmpCount" class="badge badge--nouveau">{{ cmpCount }}</span></RouterLink>
        </nav>
        <div class="drawer__actions">
          <button type="button" class="btn btn--outline btn--block" @click="toggle">
            <Sun v-if="theme === 'dark'" /><Moon v-else />{{ theme === 'dark' ? 'Thème clair' : 'Thème sombre' }}
          </button>
          <a :href="contact.telLink" class="btn btn--outline btn--block"><Phone /> Appeler {{ shop.phoneDisplay }}</a>
          <a :href="contact.whatsappLink(contact.greeting())" target="_blank" rel="noopener" class="btn btn--whatsapp btn--block"><WhatsAppIcon /> Écrire sur WhatsApp</a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.header { position: sticky; top: 0; z-index: 50; background: color-mix(in srgb, var(--bg) 85%, transparent); backdrop-filter: saturate(180%) blur(14px); -webkit-backdrop-filter: saturate(180%) blur(14px); transition: box-shadow 0.3s, border-color 0.3s; border-bottom: 1px solid transparent; }
.header.is-scrolled { box-shadow: 0 4px 24px -12px rgb(15 23 42 / 0.25); border-bottom-color: var(--border); }
.topbar { background: var(--gradient); color: #fff; font-size: 0.8rem; font-weight: 500; }
.topbar__inner { display: flex; justify-content: space-between; align-items: center; min-height: 34px; gap: 12px; }
.topbar__right { display: inline-flex; align-items: center; gap: 10px; }
.topbar a { display: inline-flex; align-items: center; gap: 6px; font-weight: 600; }
.topbar a:hover { text-decoration: underline; }
.topbar svg { width: 14px; height: 14px; }
.header__inner { display: flex; align-items: center; justify-content: space-between; gap: 16px; height: var(--header-h); }
.header__logo { flex-shrink: 0; }
.nav { display: flex; gap: 4px; }
.nav__link { position: relative; padding: 8px 12px; border-radius: 10px; font-weight: 500; font-size: 0.95rem; white-space: nowrap; color: var(--text-muted); transition: color 0.2s, background-color 0.2s; }
.nav__link:hover { color: var(--text); background: var(--surface-2); }
.nav__link.is-active { color: var(--text); font-weight: 600; }
.nav__link.is-active::after { content: ''; position: absolute; left: 12px; right: 12px; bottom: 2px; height: 3px; border-radius: 3px; background: var(--gradient); }
.header__tools { display: flex; align-items: center; gap: 8px; }
.search-trigger { display: inline-flex; align-items: center; gap: 8px; height: 44px; padding: 0 10px 0 14px; border-radius: 999px; border: 1px solid var(--border); background: var(--surface-2); color: var(--text-soft); min-width: 200px; transition: border-color 0.2s; }
.search-trigger:hover { border-color: var(--brand-400); }
.search-trigger svg { width: 18px; height: 18px; }
.search-trigger__label { flex: 1; text-align: left; font-size: 0.9rem; }
kbd { font-family: inherit; font-size: 0.75rem; padding: 2px 8px; border-radius: 6px; border: 1px solid var(--border); background: var(--surface); }
.burger { display: none; }
.drawer { position: fixed; inset: calc(var(--header-h) + 34px) 0 0 0; background: var(--bg); padding: 16px 20px 32px; overflow-y: auto; display: flex; flex-direction: column; gap: 24px; border-top: 1px solid var(--border); }
.drawer nav { display: grid; }
.drawer__link { display: flex; align-items: center; justify-content: space-between; padding: 14px 4px; font-size: 1.15rem; font-weight: 600; border-bottom: 1px solid var(--border); }
.drawer__link.is-active { color: var(--brand-500); }
.drawer__actions { display: grid; gap: 10px; }
.drawer-enter-active, .drawer-leave-active { transition: opacity 0.25s, transform 0.3s var(--ease); }
.drawer-enter-from, .drawer-leave-to { opacity: 0; transform: translateY(-12px); }

@media (max-width: 1480px) {
  .search-trigger { min-width: 0; }
  .search-trigger__label, .search-trigger kbd { display: none; }
  .search-trigger { width: 44px; padding: 0; justify-content: center; background: var(--surface); }
}
@media (max-width: 1180px) {
  .hide-md { display: none; }
  .search-trigger { min-width: 0; }
  .search-trigger__label, .search-trigger kbd { display: none; }
  .search-trigger { width: 44px; padding: 0; justify-content: center; background: var(--surface); }
}
@media (max-width: 960px) {
  .nav { display: none; }
  .burger { display: inline-grid; }
}
@media (max-width: 640px) {
  .topbar__inner > span:first-child, .topbar__sep, .topbar__right > span:last-child { display: none; }
  .topbar__inner { justify-content: center; }
  .hide-sm { display: none; }
  .header__inner { gap: 8px; }
  .header__tools { gap: 6px; }
}
@media (max-width: 520px) {
  .hide-xs { display: none; }
}
</style>
