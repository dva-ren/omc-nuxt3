<script lang="ts" setup>
// import { querySongInfo } from '~/api'
import { usePlayer } from '~/hooks'
import type { SongInfo } from '~/types'
const props = defineProps<{ id: string }>()

const songInfo = reactive<SongInfo>({
  id: props.id,
  artist: '',
  name: '',
  pic: '',
  url: '',
  time: '',
  lrc: '',
})
const { player, show } = usePlayer()
const playing = ref(false)
useLazyAsyncData(async () => {
  const res = await querySongInfo(props.id)
  try {
    const artists = res.songs[0].ar.map((i: any) => i.name) as Array<String>
    songInfo.artist = artists.join(',')
  }
  catch {
  }
  songInfo.name = res.songs[0].name
  songInfo.pic = res.songs[0].al.picUrl
  useLazyAsyncData(async () => {
    const urlRes = await querySongurl(props.id)
    songInfo.time = urlRes.data[0].time
    songInfo.url = urlRes.data[0].url
  })
})

const handleClick = () => {
  if (!show.value)
    show.value = true
  if (!playing.value)
    player.play(songInfo)
  else
    player.pause()
  playing.value = !playing.value
}
</script>

<template>
  <div rounded p-2 border flex gap-4 w-80 items-center relative shadow hover:shadow-xl transition>
    <CommonImageLoad :src="songInfo.pic" w-12 h-12 object-fit rounded />
    <div flex-1 overflow-hidden>
      <div>{{ songInfo.name }}</div>
      <div text-gray-3 text-sm overflow-hidden text-ellipsis whitespace-nowrap>
        {{ songInfo.artist }}
      </div>
    </div>
    <button mr-2 @click="handleClick">
      <div v-if="!playing" i-ri:play-circle-line text-2xl />
      <div v-else i-ri:pause-circle-line text-2xl />
    </button>
    <div pointer-events-none bg-gray-1 w-full h-full absolute left-0 rounded transition duration-500 :style="{ opacity: songInfo.name ? 0 : 1 }" />
  </div>
</template>
