import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import HomeView from '@/views/pages/HomeView.vue'

const routes = [
  { path: '/', name: 'home', component: HomeView },
  { path: '/telephones', name: 'catalog', component: () => import('@/views/pages/CatalogView.vue'), meta: { title: 'Tous nos téléphones' } },
  { path: '/telephones/:id', name: 'product', component: () => import('@/views/pages/ProductView.vue'), props: true },
  { path: '/marques', name: 'brands', component: () => import('@/views/pages/BrandsView.vue'), meta: { title: 'Toutes les marques' } },
  { path: '/comparateur', name: 'compare', component: () => import('@/views/pages/CompareView.vue'), meta: { title: 'Comparateur' } },
  { path: '/favoris', name: 'favorites', component: () => import('@/views/pages/FavoritesView.vue'), meta: { title: 'Mes favoris' } },
  { path: '/services', name: 'services', component: () => import('@/views/pages/ServicesView.vue'), meta: { title: 'Nos services' } },
  { path: '/a-propos', name: 'about', component: () => import('@/views/pages/AboutView.vue'), meta: { title: 'À propos' } },
  { path: '/contact', name: 'contact', component: () => import('@/views/pages/ContactView.vue'), meta: { title: 'Contact & accès' } },
  { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('@/views/pages/NotFoundView.vue'), meta: { title: 'Page introuvable' } }
]

const router = createRouter({
  // Mode « hash » uniquement pour les aperçus hébergés hors Vercel (VITE_ROUTER_MODE=hash)
  history: import.meta.env.VITE_ROUTER_MODE === 'hash' ? createWebHashHistory() : createWebHistory(),
  routes,
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) return { el: to.hash, behavior: 'smooth', top: 90 }
    // Changement de filtres sur le catalogue : on ne remonte pas en haut
    if (to.name === from.name && to.name === 'catalog' && to.query.page === from.query.page) return false
    return { top: 0 }
  }
})

export default router
