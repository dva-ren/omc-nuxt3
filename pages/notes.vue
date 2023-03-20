<script lang="ts" setup>
import { getNotes } from '~/utils/api'
import { useCatalog } from '~/components/Markdown/catalog'

const route = useRoute()
const id = computed(() => route.params.id as string)

const { anchor } = useCatalog()

const { data: notes, pending: notesPending } = useLazyAsyncData(async () => {
  const res = await getNotes()
  const idx = res.data.list.findIndex(i => i.id === id.value)
  return res.data.list
})
const index = computed(() => {
  const idx = notes.value?.findIndex(n => n.id === id.value) || 0
  return idx > 0 ? idx : 0
})
onBeforeUnmount(() => {
  anchor.value = []
})
definePageMeta({
  layout: false,
})
</script>

<template>
  <NuxtLayout name="post">
    <template #pre>
      <div class="list-container">
        <ul class="note-list">
          <li v-for="i, idx in notes" :key="i.id" class="item" :class="{ active: idx === index }">
            <div v-if="idx === index" i-ri:record-circle-line text-base text-pink class="point" />
            <NuxtLink :to="`/notes/${i.id}`">
              {{ i.title }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </template>
    <NuxtPage :page-key="id" />
    <template #sidebar>
      <div sticky top-20 mt-20 text-sm>
        <MarkdownCatalog />
      </div>
    </template>
  </NuxtLayout>
</template>

<style scoped>
.list-container{
  position: sticky;
  top: 30vh;
  font-size: 14px;
  padding-left: 80px;
  color: rgba(80,80,80,0.8);
}
.note-list .item{
  display: flex;
  align-items: center;
  line-height: 1.8em;
  transition: all 0.2s;
}
.note-list .item a{
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: all 0.2s;
}
.active a{
  margin-left: 0.3em;
  color: var(--color-1);
}
.note-list:hover{
  opacity: 1;
}
.note-list .item:hover{
  color: #0F86BE;
}
.point{
  animation: move-in 0.3s ease-in;
}
@keyframes move-in {
  from{
    opacity: 0;
    transform: translate3d(-40px,0,0);
  }
}
</style>
