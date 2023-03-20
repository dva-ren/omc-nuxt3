<script lang="ts" setup>
import { querySayList } from '~/utils/api'
useHead({
  title: '说说',
})
const { data, pending } = useAsyncData(async () => {
  const res = await querySayList()
  return res.data.list
})
</script>

<template>
  <NuxtLayout :loading="pending">
    <ClientOnly>
      <SayList :data="data" />
    </ClientOnly>
  </NuxtLayout>
</template>

<style scoped>

</style>
