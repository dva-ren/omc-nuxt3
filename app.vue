<script setup lang="ts">
import nprogress from 'nprogress'
import { usePlayer } from './hooks'

import 'nprogress/nprogress.css'
nprogress.configure({ showSpinner: false })
const loadding = ref(true)

// useState('catelog', () => [])
onMounted(() => {
  getMaster().then((res) => {
    const master = useMaster()
    Object.assign(master.value, res.data)
  })
})
const { init } = usePlayer()
const router = useRouter()
const route = useRoute()

router.beforeEach(() => {
  nprogress.start()
})
router.afterEach(() => {
  nprogress.done()
})
useHead({
  titleTemplate: (s) => {
    // if (s && s.length > 6)
    //   s = `${s.slice(0, 30)}...`
    return `${s} - 灰色と青 · 不虚光阴`
  },
  link: [
    {
      rel: 'icon', type: 'image/svg', href: '/logo.svg',
    },
  ],
})
</script>

<template>
  <NavWidget />
  <CommonLoadMask v-model="loadding" @end="loadding = false" />
  <div min-h-full>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
  <CommonFooter />
  <div class="z--1 inset-0 fixed bg-fixed pointer-events-none transition-opacity duration-500 ease transform-gpu" :class="$route.path === '/' ? 'op-80' : 'op-20'">
    <div class="bg absolute inset-0 transform-gpu" />
  </div>
  <ClientOnly>
    <NavToolsBar />
    <PlayerWidget v-if="init" />
  </ClientOnly>
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
#nprogress .bar {
  background: #ed556a !important;
}
</style>
