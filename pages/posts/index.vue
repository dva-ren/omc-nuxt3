<script lang="ts" setup>
import { dateFns, generateSpringText } from '~/composables'
import { getArticles } from '~/utils/api'
import { usePageHelper } from '~/hooks/usePageHelper'

const page = computed(() => Number(useRoute().query.page || 1))
const router = useRouter()

const { pageNum, pageSize, hasPreviousPage, hasNextPage } = usePageHelper({
  pageNum: page.value,
  pageSize: 10,
  hasNextPage: false,
  hasPreviousPage: false,
})

const { data: posts, refresh, pending } = useAsyncData(async () => {
  const res = await getArticles({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  })
  hasPreviousPage.value = res.data.hasPreviousPage
  hasNextPage.value = res.data.hasNextPage
  return res.data.list
})
useHead({ title: '文章' })

const prePage = () => {
  router.push({
    path: '/posts',
    query: {
      page: page.value - 1,
    },
  })
}
const nextPage = () => {
  router.push({
    path: '/posts',
    query: {
      page: page.value + 1,
    },
  })
}
watch(page, () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  pageNum.value = page.value
  refresh()
})
</script>

<template>
  <CommonLoading :loading="pending" />
  <div v-if="!pending">
    <div v-for="p, idx in posts" :key="p.id" :style="generateSpringText({ delay: idx * 0.1 })" class="post-item " pb-8>
      <div>
        <div class="left-label" display-none sm:display-block>
          {{ dateFns(p.createTime).format('YYYY-MM-DD') }}
        </div>
        <div class="left-label" display-block sm:display-none>
          {{ dateFns(p.createTime).format('MM-DD') }}
        </div>
        <div text-center text-base>
          <NuxtLink :to="`/posts/${p.id}`" hover:text-orange transition>
            {{ p.title }}
          </NuxtLink>
        </div>
        <div py-4 leading-8 indent-lg tracking-wider text-sm>
          <p line-clamp-5>
            {{ p.content }}
          </p>
        </div>
        <p text-center>
          <NuxtLink :to="`/posts/${p.id}`" btn rounded-full text-sm py-2>
            查看原文
          </NuxtLink>
        </p>
      </div>
    </div>
    <CommonEmpty v-if="!posts?.length" />
    <div flex justify-center gap-4>
      <button v-if="hasPreviousPage" btn rounded-full text-sm p-2 px-4 @click="prePage">
        上一页
      </button>
      <button v-if="hasNextPage" btn rounded-full text-sm p-2 px-4 @click="nextPage">
        下一页
      </button>
    </div>
  </div>
</template>

<style scoped>
.post-item{
  color: var(--light-color);
}
.dark .post-item{
  color: var(--dark-brown);
}
</style>
