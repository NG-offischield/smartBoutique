<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import AppHeader from '@/views/layout/AppHeader.vue'
import AppFooter from '@/views/layout/AppFooter.vue'
import FloatingActions from '@/views/layout/FloatingActions.vue'
import ToastStack from '@/views/layout/ToastStack.vue'
import SearchDialog from '@/views/layout/SearchDialog.vue'
import CompareTray from '@/views/layout/CompareTray.vue'

const searchOpen = ref(false)

// Raccourci clavier « / » ou Ctrl+K pour ouvrir la recherche
function onKey(e) {
  const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName) || e.target.isContentEditable
  if ((e.key === '/' && !typing) || ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k')) {
    e.preventDefault()
    searchOpen.value = true
  }
}
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <a href="#main" class="skip-link">Aller au contenu principal</a>
  <AppHeader @open-search="searchOpen = true" />
  <main id="main" tabindex="-1">
    <RouterView v-slot="{ Component, route }">
      <Transition name="page" mode="out-in">
        <component :is="Component" :key="route.name === 'catalog' ? 'catalog' : route.path" />
      </Transition>
    </RouterView>
  </main>
  <AppFooter />
  <FloatingActions />
  <CompareTray />
  <ToastStack />
  <SearchDialog :open="searchOpen" @close="searchOpen = false" />
</template>

<style>
#app { min-height: 100vh; display: flex; flex-direction: column; }
main { flex: 1; outline: none; }
</style>
