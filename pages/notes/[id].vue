<script lang="ts" setup>
import { getNotes } from '~/utils/api'
import CommentWidget from '~~/components/comment/CommentWidget.vue'
import { useCatalog } from '~~/components/Markdown/catalog'
import { dateFns, formateToLocal } from '~/composables'

const headerInfo = useHeaderInfo()
const route = useRoute()
const id = computed(() => route.params.id as string)
const { anchor, parse } = useCatalog()
const { data: note, pending } = useAsyncData(async () => {
  const res = await queryNote(id.value)
  headerInfo.value.id = res.data.id
  headerInfo.value.like = 0
  headerInfo.value.title = res.data.title
  headerInfo.value.type = '记录生活'
  return res.data
})
const { data: notes, pending: notesPending } = useLazyAsyncData(async () => {
  const res = await getNotes()
  // const idx = res.data.list.findIndex(i => i.id === note.value?.id)
  // list.value = res.data.list.slice(idx - 4, idx + 4)
  // console.log('idx', idx)
  return res.data.list
})
const index = computed(() => {
  const idx = notes.value?.findIndex(n => n.id === id.value) || 0
  return idx > 0 ? idx : 0
})
const weather = () => {
  const { weather } = note.value!
  if (weather.includes('晴'))
    return 'i-carbon-sun'
  if (weather.includes('阴'))
    return 'i-carbon-cloud'
  if (weather.includes('雨'))
    return 'i-carbon-rain-heavy'
  if (weather.includes('雪'))
    return 'i-carbon-snow-scattered'
  return 'i-carbon-word-cloud'
}
onMounted(() => {
  parse()
})
onBeforeUnmount(() => {
  headerInfo.value.title = ''
  anchor.value = []
})
const title = computed(() => {
  if (pending.value)
    return '记录生活'
  return note.value?.title || '记录生活'
})
useHead({ title })
</script>

<template>
  <CommonLoading :loading="pending" />
  <div v-if="note && !pending" class="spring">
    <div class="info" border p-4 md:p-8 mb-8>
      <p class="left-label">
        {{ formateToLocal(note.createTime) }}
      </p>
      <p text-center p-4 text="16.8px" mb-8>
        {{ note.title }}
      </p>
      <div v-if="note.musicId" flex justify-center my-4>
        <MusicCard :id="note.musicId" />
      </div>
      <div class="notes">
        <MarkdownViewer :value="note.content" min-h-100 />
      </div>
      <div class="line" />
      <div text="center sm">
        <router-link to="/timeLine?type=notes">
          <span pr-1>时间线</span>
          <div i-ri-time-line inline-block class="font-icon" />
        </router-link>
      </div>
      <div v-if="notes" text-sm flex justify-between>
        <div>
          <router-link v-if="index > 0" :to="`/notes/${notes[index - 1]?.id}`">
            <div flex items-center>
              <div text-xl i-ri-arrow-drop-left-line />
              <span>上一篇</span>
            </div>
            <div pl-5 max->
              {{ notes[index - 1]?.title }}
            </div>
          </router-link>
        </div>
        <div>
          <router-link v-if="index < notes.length - 1" :to="`/notes/${notes[index + 1]?.id}`">
            <div flex items-center>
              <span>下一篇</span>
              <div text-xl i-ri-arrow-drop-right-line />
            </div>
            <div>
              {{ notes[index + 1]?.title }}
            </div>
          </router-link>
        </div>
      </div>
      <div text-sm flex justify-between mt-4>
        <div flex items-center gap-4>
          <div v-if="note.weather" flex items-center gap-1>
            <div :class="weather()" />
            <div>{{ note.weather }}</div>
          </div>
          <div display-none>
            <div i-carbon-sun />
            <div i-carbon-rain-heavy />
            <div i-carbon-cloud />
            <div i-carbon-snow-scattered />
            <div i-carbon-word-cloud />
          </div>
          <div flex items-center gap-1>
            <div i-ri-calendar-todo-line />
            <div>{{ dateFns(note.createTime).fromNow() }}</div>
          </div>
        </div>
        <div flex items-center gap-2px>
          <div i-ri-heart-3-fill />
          <div>0</div>
        </div>
      </div>
    </div>
    <CommentWidget v-if="note.allowComment" :ref-id="note.id" type="note" />
  </div>
</template>

<style scoped>
.info{
  color: var(--light-color);
  position: relative;
}
.dark .info{
  color: white;
}
.info::before{
  content: '';
  position: absolute;
  width: 0;
  height: 0;
  right: 0;
  bottom: 0;
  border-top: rgba(0, 0, 0, 0.5) 1rem solid;
  border-right: transparent 1rem solid;
}
.line{
  position: relative;
  padding-bottom: 1rem;
}
.line::before{
  content: '';
  position: absolute;
  background: #2333;
  left: 50%;
  width: 200px;
  transform: translateX(-50%);
  height: 1px;
}
</style>
