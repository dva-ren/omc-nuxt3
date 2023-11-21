<script lang="ts" setup>
import type { Article, Note } from '~/types'
const { data, type = 'posts' } = defineProps<{
  data: Array<Article | Note>
  type?: string
}>()
</script>

<template>
  <div grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8 text-sm v-bind="$attrs">
    <template v-if="data" v-for="p in data" :key="p.id">
      <router-link :to="`/${type}/${p.id}`" h-30>
        <HomeCard :title="p.title" :bg="p.cover" />
      </router-link>
    </template>
    <template v-if="!data" v-for="i in 4" :key="i">
      <CommonSkeleton h-30 rounded-xl></CommonSkeleton>
    </template>
  </div>
</template>
