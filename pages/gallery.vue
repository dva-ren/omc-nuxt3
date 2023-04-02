<script lang="ts" setup>
import type { Picture } from '~~/types'
import { queryPictures } from '~~/utils/api'

const pictures = ref<Picture[]>([])
const pageNum = ref(1)
const pageSize = ref(30)
const pending = ref(false)

const fetchData = async () => {
  if (pending.value)
    return
  // console.log('fetchData')
  pending.value = true
  const res = await queryPictures({
    pageNum: pageNum.value,
    pageSize: pageSize.value,
  })
  pageSize.value = 15
  const imgs = new Array(6).fill(0).map((_, idx) => {
    return res.data.list[idx % res.data.list.length]
  })
  pictures.value.push(...imgs)
  pending.value = false
}
fetchData()

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
  <div v-if="!pending">
    <ClientOnly>
      <!-- <div flex justify-center>
        <div v-for="i in 6" :key="i" class="category" :class="{ active: i === 1 }">
          {{ i }}
        </div>
      </div> -->
      <div v-masonry gutter="10" fit-width="true" transition-duration="0.1s" item-selector=".img-item" class="masonry-container">
        <div v-for="item, idx in pictures" :key="idx" v-masonry-tile w-44vw md:w-60 class="img-item" overflow-hidden>
          <CommonImageLoad :src="item.url" />
          <div p-2>
            <div break-words text-base text="14px" pb-2>
              {{ item.description }}
            </div>
            <div text="gray xs" flex justify-between>
              <div flex items-center gap-1>
                <div i-carbon:location-filled />
                <div>{{ item.position }}</div>
              </div>
              <div i-ri:heart-3-fill />
            </div>
          </div>
        </div>
      </div>
      <div text="sm center">
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
  box-shadow: 4px 4px 10px rgba(224,224,224,0.5);
}
.img-item img{
  object-fit: cover;
}
</style>
