<!-- eslint-disable @typescript-eslint/consistent-type-imports -->
<script lang="ts" setup>
import type { NavItem } from '~/types'
import { useShare } from '~/hooks'

const route = useRoute()

const bgOpacity = ref(0)
const showInfo = ref(false)
const scroll = useWindowScroll()
const navIdx = ref(-1)
const headerInfo = useHeaderInfo()
const liked = ref(false)

const menus = ref<NavItem[]>([
  {
    name: '文',
    url: '/posts',
    icon: 'i-ri:mastodon-line',
    children: [],
  },
  {
    name: '记',
    icon: 'i-ri:quill-pen-line',
    url: '/notes/latest',
    children: [{
      name: '时间线',
      url: '/timeLine?type=notes',
    }],
  },
  {
    name: '言',
    icon: 'i-ri-bear-smile-line',
    url: '/says',
  },
  {
    name: '友',
    icon: 'i-ri:user-heart-line',
    url: '/friends',
  },
  {
    name: '项',
    icon: 'i-ri:attachment-line',
    url: '/projects',
  },
  {
    name: '趣',
    icon: 'i-ri-donut-chart-fill',
    url: '/music',
    children: [
      {
        name: '听歌',
        icon: 'i-ri:netease-cloud-music-line',
        url: '/music',
      },
    ],
  },
])
useAsyncData(async () => {
  const res = await queryCategoryList()
  menus.value[0].children = res.data.map(item => ({
    name: item.name,
    url: `/category?id=${item.id}`,
  }))
})

const handleLike = () => {
  liked.value = !liked.value
  // Message.success('感谢喜欢')
  // eslint-disable-next-line no-console
  console.log('like')
}
const handleShare = () => {
  useShare({
    title: headerInfo.value.title,
    url: location.href,
  })
}
watch(useThrottle(scroll.y, 100, true, true), (pre, cur) => {
  if (scroll.y.value > 60)
    bgOpacity.value = 1
  else
    bgOpacity.value = 0
  if (pre > cur && headerInfo.value.title)
    showInfo.value = true
  else
    showInfo.value = false
})
watch(route, () => {
  if (route.path === '/')
    navIdx.value = -1
  menus.value.forEach((m, idx) => {
    if (route.path.includes(m.url))
      navIdx.value = idx
  })
})
</script>

<template>
  <header h-20>
    <div class="header" :style="{ '--opacity': bgOpacity }" fixed top-0 w-full z-10 h-14 overflow-hidden>
      <div transition duration-500 px-4 lg:px-10 :style="{ transform: `translateY(${showInfo ? '-3.5rem' : 0})` }">
        <div flex justify-between h-14>
          <nuxt-link to="/" title="home" py-2 flex items-center gap-2>
            <CommonLogo inline-block />
            <div>
              <p>灰色と青</p>
              <p text="~ 12px gray-5">
                不虚光阴
              </p>
            </div>
          </nuxt-link>
          <nav hidden md-flex items-center :class="{ nav: navIdx !== -1 }" :style="`--idx:${navIdx}`">
            <NavItem v-for="nav, idx in menus" :key="idx" :data="nav" />
          </nav>
          <NavDrawer :active-index="navIdx" flex md-hidden :menus="menus" />
        </div>
        <div max-w-1200px m-auto flex items-center justify-between text-sm h-14>
          <div max-w-8rem md:max-w-unset>
            <div text="12px gray">
              {{ headerInfo.type }}
            </div>
            <div class="omit" text-base>
              {{ headerInfo.title }}
            </div>
          </div>
          <div flex items-center gap-2 flex-shrink-0>
            <button px-4 py-2 bg-gray-2 rounded-full flex items-center gap-1 @click="handleShare">
              <div i-ri-share-forward-fill />
              <div>分享</div>
            </button>
            <button v-if="headerInfo.like !== undefined" px-2 pr-4 h-9 bg-gray-2 rounded-full flex items-center gap-1 @click="handleLike">
              <NavHeart v-model="liked" />
              <div>喜欢</div>
            </button>
            <div>
              <div>{{ headerInfo.like }}</div>
              <div text-gray-4>
                灰色と青
              </div>
            </div>
          </div>
        </div>
      </div>
      <div hidden>
        <div i-ri:mastodon-line />
        <div i-ri:quill-pen-line />
        <div i-ri:attachment-line />
        <div i-ri-donut-chart-fill />
        <div i-ri:user-heart-line />
      </div>
    </div>
  </header>
</template>

<style scoped>
.header::before{
  opacity: 0;
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  backdrop-filter: blur(20px) saturate(180%);
  transition: all .3s;
  background-color: rgba(255, 255, 255, 0.664);
  z-index: -1;
  content: "";
  border-bottom: 1px solid #bbb3;
  opacity: var(--opacity);
}
.dark .header::before{
  background-color: rgba(255, 255, 255, 0.08);
}
.nav{
  position: relative;
}
.nav::before{
  content: '';
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 999px;
  background-color: rgba(0,0,0,0.4);
  bottom: .5rem;
  transform: translateX(-50%);
  left: calc(34px + 72px * var(--idx));
  transition: all .1s;
}
.nav:hover::before{
  width: 2.25rem;
  height: 2px;
  background-color: var(--yellow) !important;
}
.dark header::before{
  background-color: rgba(0, 0, 0, 0.464);
}
.dark .nav::before{
  background-color: rgba(255, 255, 255, 0.54);
}
.label{
  border-left: var(--yellow) 2px solid;
  padding-left: .5rem;
}
</style>
