<script lang="ts" setup>
import type { Picture } from '~~/types'
import { queryPictures } from '~~/utils/api'
import { resizeImgUrl } from '~/composables/utils'

const pictures = ref<Picture[]>([])
const pageNum = ref(1)
const pageSize = ref(15)
const pending = ref(false)
const hasNext = ref(false)

const fetchData = async () => {
  if (pending.value)
    return
  pending.value = true
  const res = await queryPictures({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  })
  hasNext.value = res.data.hasNextPage
  pageSize.value = 10
  pictures.value.push(...res.data.list)
  pending.value = false
}
fetchData()
const loadMore = () => {
  if (!hasNext.value)
    return
  pageNum.value++
  fetchData()
}
// const { y } = useWindowScroll()
// watch(y, useThrottleFn(() => {
//   const el = document.documentElement
//   if (el.clientHeight + el.scrollTop > el.scrollHeight - 50) {
//     console.log('done')
//     fetchData()
//   }
// }, 50))
useHead({
  title: '照片墙',
})
</script>

<template>
  <div v-if="pictures.length">
    <ClientOnly>
      <!-- <div flex justify-center>
        <div v-for="i in 6" :key="i" class="category" :class="{ active: i === 1 }">
          {{ i }}
        </div>
      </div> -->
      <div v-masonry gutter="10" fit-width="true" transition-duration="0.5s" item-selector=".img-item" class="masonry-container">
        <div v-for="item, idx in pictures" :key="idx" v-masonry-tile w-44vw md:w-60 class="img-item" overflow-hidden>
          <CommonImageLoad blur :src="resizeImgUrl(item.url, 720)" />
          <div p-2>
            <div break-words text-base text="14px" pb-2>
              {{ item.description }}
            </div>
            <div text="gray xs" flex justify-between>
              <div flex items-center gap-1>
                <template v-if="item.position">
                  <div i-carbon:location-filled />
                  <div>{{ item.position }}</div>
                </template>
              </div>
              <button text-red-200 i-ri:heart-3-fill />
            </div>
          </div>
        </div>
      </div>
      <LazyCommonLoadMore v-if="hasNext" :loading="pending" @load-more="loadMore" />
      <div v-else text="sm center">
        没有更多了...
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped>
.category{
  width: 4rem;
  height: 2rem;
  line-height: 2rem;
  border-radius: 1rem;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
}
.category:hover{
  background-color: var(--yellow);
  color: white;
}
.active{
  color: white;
  background-color: #8076a3;
}
.masonry-container{
  margin: 0 auto;
}
.img-item{
  /* border: 1px solid gray; */
  border-radius: 10px;
  margin-bottom: 0.8rem;
  background-color: white;
  box-shadow: 0 0 10px rgba(224,224,224,0.7);
}
.img-item img{
  object-fit: cover;
}
.dark .img-item{
  background-color: rgba(50,50,50,0.5);
  box-shadow: 0 0 6px rgba(250,250,250,0.2);
}
</style>
