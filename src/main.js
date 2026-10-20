import { createApp } from 'vue'
import '@fontsource-variable/inter'
import '@fontsource-variable/plus-jakarta-sans'
import './assets/styles/main.css'
import App from './App.vue'
import router from './router'
import reveal from './views/directives/reveal'
import { injectLocalBusinessSchema, setPageMeta } from './controllers/seoController'

router.afterEach((to) => {
  // Les pages produit définissent leurs propres métadonnées
  if (to.name !== 'product') setPageMeta({ title: to.meta.title, path: to.path })
})

injectLocalBusinessSchema()
createApp(App).use(router).directive('reveal', reveal).mount('#app')
