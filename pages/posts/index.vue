<script lang="ts" setup>
import { dateFns } from '~/composables'
import { getArticles } from '~/utils/api'

const { data: posts, pending } = useAsyncData(async () => {
  const res = await getArticles()
  return res.data.list
})
</script>

<template>
  <NuxtLayout v-if="posts" name="post">
    <div v-for="p, idx in posts" :key="p.id" v-spring:delay="idx * 100" class="post-item " pb-8>
      <div>
        <div class="left-label" display-none sm:display-block>
          {{ dateFns(p.createTime).format('yyyy-MM-dd') }}
        </div>
        <div class="left-label" display-block sm:display-none>
          {{ dateFns(p.createTime).format('MM-dd') }}
        </div>
        <div text-center text-base>
          <router-link :to="`/posts/${p.id}`" hover:text-orange transition>
            {{ p.title }}
          </router-link>
        </div>
        <div py-4 leading-8 indent-lg tracking-wider text-sm>
          <p line-clamp-5>
            {{ p.content }}
          </p>
        </div>
        <p text-center>
          <router-link :to="`/posts/${p.id}`" btn rounded-full text-sm>
            查看原文
          </router-link>
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<style scoped>
.post-item{
  color: var(--light-color);
}
.dark .post-item{
  color: var(--dark-brown);
}
</style>
