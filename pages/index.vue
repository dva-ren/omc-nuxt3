<script lang="ts" setup>
import Message from '~~/components/message'
import { queryTop } from '~/utils/api'

const master = useMaster()
const words = ref('')
const { data: topData, pending } = useAsyncData(async () => {
  const res = await queryTop(4)
  return res.data
})

fetch('https://v1.hitokoto.cn').then((response) => {
  response.json().then((res) => {
    words.value = words.value = `「 ${res.hitokoto} 」 ——${res.from}`
  })
})
useHead({
  titleTemplate: '',
  title: '灰色と青 · 不虚光阴',
})
function handleClick() {
  Message.warning('开发中~')
}
</script>

<template>
  <div py-10 md:py-20>
    <div pb-10 flex flex-col items-center sm="flex-row justify-unset items-unset" gap-6>
      <img :src="master?.avatar" h-30 w-30 rounded-full object-cover p-1 bg-gray-2 shadow>
      <div text-center sm:text-left>
        <p text-xl font-bold>
          {{ master?.nickname }}
        </p>
        <p text="sm gray-6" py-4>
          {{ master?.introduce }}
        </p>
        <div class="spring" text-gray-1>
          <a href="https://github.com/dva-ren" target="_blank" class="circle-icon" bg-blue-400>
            <div i-carbon:logo-github class="v-icon" inline-block />
          </a>
          <a ml-4 href="https://y.music.163.com/m/user?id=136604471" target="_blank" class="circle-icon" bg="#ff3a3a">
            <div i-ri-netease-cloud-music-line class="v-icon" inline-block />
          </a>
          <a ml-4 href="https://space.bilibili.com/60385716" target="_blank" class="circle-icon" bg="#f25d8e">
            <div i-ri-bilibili-fill class="v-icon" inline-block />
          </a>
          <a ml-4 href="mailto:473029463@qq.com" class="circle-icon" bg-teal-400>
            <div i-ri:at-line class="v-icon" inline-block />
          </a>
        </div>
      </div>
    </div>
    <CommonTextAnimation min-h-10 :text="words" class="text-sm text-gray-400 px-4 mb-4" />
    <div v-if="!pending" class="spring">
      <div text-white text-sm>
        <div flex justify-between items-end class="label">
          <div class="title" flex bg="#74759b">
            <div class="icon" bg="#2e317c">
              <div i-carbon:boolean class="v-icon" inline-block />
            </div>
            <span px-3>近期博文</span>
          </div>
          <NuxtLink to="/posts" class="icon" bg="#74759b" p-4>
            <div i-carbon:chevron-right text-lg />
          </NuxtLink>
        </div>
        <HomeCardList :data="topData?.posts" />
      </div>
      <div text-white mt-10 text-sm>
        <div flex justify-between items-end class="label">
          <div class="title" flex bg="#f17666">
            <div class="icon" bg="#ed3321">
              <div i-carbon:bookmark class="v-icon" inline-block />
            </div>
            <span px-3>记录生活</span>
          </div>
          <NuxtLink to="/notes/latest" class="icon" bg="#f17666" p-4>
            <div i-carbon:chevron-right text-lg />
          </NuxtLink>
        </div>
        <HomeCardList :data="topData?.notes" type="notes" />
      </div>
      <div text-white mt-10 text-sm>
        <div flex justify-between items-end class="label">
          <div class="title" flex bg="#55bb8a">
            <div class="icon" bg="#12a182">
              <div i-carbon:bookmark class="v-icon" inline-block />
            </div>
            <span px-3>朋友们</span>
          </div>
          <router-link to="/friends" class="icon" bg="#55bb8a" p-4>
            <div i-carbon:chevron-right text-lg />
          </router-link>
        </div>
        <div class="friends" flex gap-10 px-10 overflow-x-auto w-full>
          <img shrink-0 shadow w-25 h-25 rounded-full object-cover src="https://image.dvaren.xyz/images/unsplash/bulksplash-jon_photos-RM5jjBIh8Hw.jpg" alt="">
          <img shrink-0 shadow w-25 h-25 rounded-full object-cover src="https://image.dvaren.xyz/images/unsplash/173814.jpg" alt="">
          <img shrink-0 shadow w-25 h-25 rounded-full object-cover src="https://image.dvaren.xyz/images/unsplash/bulksplash-tomofficials-WODiUmUDWGQ.jpg" alt="">
        </div>
      </div>
      <div text-white mt-10 text-sm>
        <div flex justify-between items-end class="label">
          <div class="title" flex bg="#2376b7">
            <div class="icon" bg="#144a74">
              <div i-carbon:bookmark class="v-icon" inline-block />
            </div>
            <span px-3>了解更多</span>
          </div>
        </div>
        <div grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-8 text-sm>
          <NuxtLink to="/about">
            <HomeCard text="关于我" title="这里有我的小秘密" />
          </NuxtLink>
          <NuxtLink to="/gallery">
            <HomeCard title="记录美好瞬间" text="相册" />
          </NuxtLink>
          <HomeCard title="你的话对我很重要" text="留言" @click="handleClick" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.label{
  padding: 1rem 0;
}
.title{
  padding: .4rem 1.4rem .4rem .5rem;
  border-radius: 2rem;
}
.icon{
  border-radius: 1.25rem;
  padding: 0 .5em;
  height: 100%;
  color: white;
}
.v-icon{
  vertical-align: -0.25rem;
}
.friends::-webkit-scrollbar-thumb, .friends::-webkit-scrollbar-thum:hover {
  background-color: rgba(0,0,0,0);
}
</style>
