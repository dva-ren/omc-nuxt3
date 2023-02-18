<script setup lang="ts">
useHead({
  title: '灰色と青',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/nuxt.png',
    },
  ],
})
// useState<Master>('master', () => {})
// getMaster().then((res) => {
//   useState<Master>('master', () => res.data)
// })
getMaster().then((res) => {
  const master = useMaster()
  master.value.avatar = res.data.avatar
  Object.assign(master, res.data)
})
// useState('catelog', () => [])
</script>

<template>
  <NavBar />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div class="z--1 inset-0 fixed op-80 bg-fixed pointer-events-none transition-opacity duration-500 ease transform-gpu">
    <div class="bg absolute inset-0 transform-gpu" />
  </div>
  <!-- <Footer /> -->
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
