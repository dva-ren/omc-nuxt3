<script setup lang="ts">
import type { Master, Response } from './types'

useHead({
  title: '灰色と青',
  link: [
    {
      rel: 'icon', type: 'image/png', href: '/nuxt.png',
    },
  ],
})
// useState<Master>('master', () => {})
useFetch<Response<Master>>('http://localhost:4000/master').then((res) => {
  useState<Master>('master', () => res.data.value!.data)
})
useState('catelog', () => [])
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <div class="z--1 inset-0 fixed op-80 bg-fixed pointer-events-none transition-opacity duration-500 ease transform-gpu">
    <div class="bg absolute inset-0 transform-gpu" />
  </div>
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
  background-image: url('./public/images/background2.png');
}
.dark .bg{
  background-image: url('./public/images/background2.png');
}
</style>
