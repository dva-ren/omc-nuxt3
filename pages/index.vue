<script lang="ts" setup>
import { disposeCursor, initCursor, updateCursor } from 'ipad-cursor'
import Message from '~/composables/message'
import { queryFriends, queryTop } from '~/utils/api'

const words = ref('')
const isMobile = computed(() => useWindowSize().width.value <= 690)

onMounted(() => {
  if (process.client && !isMobile.value) {
    initCursor()
    updateCursor()
  }
})
onBeforeUnmount(() => {
  disposeCursor()
})

const master = useMaster()
const { data: topData, pending } = useAsyncData(async () => {
  const res = await queryTop(4)
  return res.data
})
const { data: friends,pending: fPending } = useAsyncData(async () => {
  const res = await queryFriends()
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
</script>

<template>
  <div py-10 md:py-20>
    <div pb-10 flex flex-col items-center sm="flex-row justify-unset items-unset" gap-6>
      <CommonImageLoad data-cursor="block" :src="master?.avatar" h-30 w-30 rounded-full object-cover shadow />
      <div text-center sm:text-left>
        <p text-xl font-bold data-cursor="text">
          {{ master?.nickname }}
        </p>
        <p text="sm gray-6" py-4 data-cursor="text">
          {{ master?.introduce }}
        </p>
        <div class="spring" text-gray-1>
          <a data-cursor="block" href="https://github.com/dva-ren" target="_blank" class="circle-icon git-link">
            <div i-carbon:logo-github class="v-icon" inline-block />
          </a>
          <a data-cursor="block" ml-4 href="https://y.music.163.com/m/user?id=136604471" target="_blank" class="circle-icon netease-link">
            <div i-ri-netease-cloud-music-line class="v-icon" inline-block />
          </a>
          <a data-cursor="block" ml-4 href="https://space.bilibili.com/60385716" target="_blank" class="circle-icon bilibili-link">
            <div i-ri-bilibili-fill class="v-icon" inline-block />
          </a>
          <a data-cursor="block" ml-4 href="mailto:473029463@qq.com" class="circle-icon mail-link">
            <div i-ri:at-line class="v-icon" inline-block />
          </a>
        </div>
      </div>
    </div>
    <CommonTextAnimation min-h-10 :text="words" class="text-sm text-gray-400 px-4 mb-4" />
    <div class="spring">
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
        <HomeCardList :data="topData?.notes" type="notes"/>
      </div>
      <div text-white text-sm mt-6>
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
        <HomeCardList :data="topData?.posts"/>
      </div>
      <div text-white mt-10 text-sm>
        <div flex justify-between items-end class="label">
          <div class="title" flex bg="#55bb8a">
            <div class="icon" bg="#12a182">
              <div i-carbon:bookmark class="v-icon" inline-block />
            </div>
            <span px-3>友人帐</span>
          </div>
          <router-link to="/friends" class="icon" bg="#55bb8a" p-4>
            <div i-carbon:chevron-right text-lg />
          </router-link>
        </div>
        <div class="friends" flex gap-10 px-10 overflow-x-auto w-full>
          <template v-if="friends?.length" v-for="item in friends" :key="item.id">
            <HomeFriendCard :data="item" />
          </template>
          <template v-if="!friends" v-for="i in 3" :key="i">
            <CommonSkeleton w-20 h-20 rounded-full></CommonSkeleton>
          </template>
        </div>
      </div>
      <div text-white mt-10 text-sm>
        <div flex justify-between items-end class="label">
          <div class="title" flex bg="#2376b7">
            <div class="icon" bg="#144a74">
              <div i-carbon-collapse-all class="v-icon" inline-block />
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
          <NuxtLink to="/message">
            <HomeCard title="你的话对我很重要" text="留言" />
          </NuxtLink>
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
.git-link{
  background-color: rgba(96,165,250,1);
  box-shadow:0 0 10px rgba(96,165,250,0.5);
}
.bilibili-link{
  background-color: rgba(242, 93, 142,1);
  box-shadow:0 0 10px rgba(242, 93, 142,0.5);
}
.netease-link{
  background-color: rgba(255, 58, 58,1);
  box-shadow:0 0 10px rgba(255, 58, 58,0.5);
}
.mail-link{
  background-color: rgba(45,212,191,1);
  box-shadow:0 0 10px rgba(45,212,191,0.5);
}
.img{
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}
</style>
