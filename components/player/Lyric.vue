<script lang="ts" setup>
import Lyric from 'lyric-parser'
const { id } = defineProps<{ id: string | number }>()
function hanlder({ lineNum, txt }) {
  // this hanlder called when lineNum change
  lyricText3.value = txt
}

useLazyAsyncData(async () => {
  const lrcRes = await queryLyric(id)
  const lyric = new Lyric(lrcRes.lrc.lyric, hanlder)
  lyric.play()
})
</script>

<template>
  <div class="lyric-container">
    <div class="lyric-text">
      {{ lyricText1 }}
    </div>
    <div class="lyric-text">
      {{ lyricText2 }}
    </div>
  </div>
</template>

<style scoped>
.lyric-container{
  height: 56px;
  overflow: hidden;
}
.lyric-text{
  height: 56px;
  line-height: 56px;
}
</style>
