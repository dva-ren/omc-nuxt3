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
  <CommonLoading :loading="pending" />
  <div v-if="!pending">
    <ClientOnly>
      <SayList v-if="data" :data="data" />
    </ClientOnly>
  </div>
</template>

<style scoped>

</style>
