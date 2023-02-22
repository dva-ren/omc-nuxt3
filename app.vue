<script setup lang="ts">
import nprogress from 'nprogress'
import { usePlayer } from './hooks'

import 'nprogress/nprogress.css'

useHead({
  title: '灰色と青，不虚光阴',
  link: [
    {
      rel: 'icon', type: 'image/svg', href: '/logo.svg',
    },
  ],
})
const loadding = ref(true)
// getMaster().then((res) => {
//   const master = useMaster()
//   Object.assign(master.value, res.data)
// })
// useState('catelog', () => [])
const { show } = usePlayer()
const router = useRouter()

router.beforeEach(() => {
  nprogress.start()
})
router.afterEach(() => {
  nprogress.done()
})
</script>

<template>
  <!-- <NavBar /> -->
  <NuxtLayout>
    <div min-h-100vh>
      <NuxtPage />
    </div>
  </NuxtLayout>
  <div class="z--1 inset-0 fixed op-80 bg-fixed pointer-events-none transition-opacity duration-500 ease transform-gpu">
    <div class="bg absolute inset-0 transform-gpu" />
  </div>
  <LoadMask v-model="loadding" @end="loadding = false" />
  <ToolsBar />
  <Player v-if="show" />
  <Footer />
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
.bg{
  z-index: -1;
  height: 100%;
  background-image: url('/images/background2.png');
}
.dark .bg{
  background-image: url('/images/background2.png');
}
</style>
