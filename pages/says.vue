<script lang="ts" setup>
import type { Say } from '../types'
import { querySayList } from '~/utils/api'
useHead({
  title: '说说',
})
interface SayInfo extends Say {
  color?: string
  delay?: number
}

const list1 = ref<Array<SayInfo>>([])
const list2 = ref<Array<SayInfo>>([])

const windowSize = useWindowSize()

const isMini = ref(windowSize.width.value < 600)

const colors = [
  '#eba0b3',
  '#3170a7',
  '#a4aca7',
  '#f8c387',
  '#f17666',
  '#f8df72',
  '#E290BD',
  '#FDD19F',
  '#FAA563',
  '#F6A441',
  '#FAB35B',
  '#FFC8CB',
  '#E2DCDD',
  '#34718D',
  '#1475BC',
  '#538DA8',
]

const { data, pending } = useAsyncData(async () => {
  const res = await querySayList()
  const says = res.data.list.map((say, idx) => {
    const s = {
      ...say,
      color: colors[randomNumber(0, colors.length)],
      delay: idx * 0.2,
    }
    if (idx % 2 === 0)
      list1.value.push(s)
    else
      list2.value.push(s)
    return s
  })
  return says
})

watch(useDebounce(windowSize.width, 500), () => {
  if (windowSize.width.value < 600)
    isMini.value = true
  else
    isMini.value = false
})
</script>

<template>
  <NuxtLayout :loading="pending">
    <div v-if="!isMini" flex gap-4>
      <div flex-1>
        <SayCard v-for="s in list1" :key="s.id" :data="s" :delay="s.delay" />
      </div>
      <div flex-1>
        <SayCard v-for="s in list2" :key="s.id" :data="s" :delay="s.delay" />
      </div>
    </div>
    <div v-else>
      <SayCard v-for="s in data" :key="s.id" :data="s" :delay="s.delay" />
    </div>
  </NuxtLayout>
</template>

<style scoped>

</style>
