<script lang="ts" setup>
import { dateFns } from '~/composables'
import { getArticles } from '~/utils/api'
const route = useRoute()

const categoryId = computed(() => route.query.id as string)
const total = ref(0)

const { data: posts, pending, refresh } = useAsyncData(async () => {
  const res = await getArticles({
    category: categoryId.value,
  })
  total.value = res.data.total
  useHead({
    title: `分类 - ${res.data.list[0]?.categoryName}`,
  })
  return res.data.list
})

watch(categoryId, () => {
  refresh()
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}, { immediate: true })
</script>

<template>
  <div v-if="posts" :loading="pending">
    <p text-2xl>
      <CommonTextAnimation :text="`分类 - ${posts[0]?.categoryName}`" />
    </p>
    <p text-gray text="15px" py-1>
      <CommonTextAnimation :text="`该分类下共有 ${total} 篇文章,加油!`" />
    </p>
    <!-- <CommonLoading :loading="loading" /> -->
    <div pl-8 py-4 text-sm>
      <ul class="posts" text-gray-500>
        <template v-for="item, idx in posts" :key="item.id">
          <li class="item fade_in_up" :style="`--delay:${idx * 0.1}s`" flex items-center tracking-wider>
            <Nuxt-link :to="`/posts/${item.id}`" class="link" px-2 text-gray-800>
              {{ item.title }}
            </Nuxt-link>
            <span text="12px gray-600">{{ dateFns(item.createTime).format('M/D/YYYY') }}</span>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.item{
  position: relative;
  height: 30px;
  padding-left: .4rem;
}
.item::before{
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  border-radius: 9999px;
  top: 50%;
  left: -0.3rem;
  transform: translateY(-50%);
  background-color: var(--yellow);
}
.item::after{
  content: '';
  position: absolute;
  width: 1px;
  height: 30px;
  top: 50%;
  left: -0.1rem;
  transform: translateY(-50%);
  background-color: var(--yellow);
}
.posts .item:first-child::after{
  transform: translateY(10%);
}
.posts .item:last-child::after{
  transform: translateY(-90%);
}
.link{

}
.dark .link{
  color: rgba(255,255,255,0.8);
}
.link:hover{
  /* outline: 1px solid orange; */
  /* border-bottom: 1px orange solid; */
  text-decoration: underline rgb(167, 152, 126);
}
</style>
