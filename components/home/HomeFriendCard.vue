<script lang="ts" setup>
import type { Friend } from '~/types'

const { data } = defineProps<{
  data: Friend
}>()
</script>

<template>
  <div class="text-center">
    <a :href="data.url" w-20 h-20 rounded-full target="_blank">
      <CommonImageLoad :src="data.avatar" w-20 h-20 object-fit rounded-full class="img" />
    </a>
    <div pt-2 text="sm gray-4">
      {{ data.name }}
    </div>
  </div>
</template>

<style scoped>
.img{
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}
</style>
