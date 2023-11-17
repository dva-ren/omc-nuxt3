<script lang="ts" setup>
import type { Say } from '~/types'

const { data = [] } = defineProps<{ data: Array<Say> }>()

interface SayInfo extends Say {
  color?: string
  delay?: number
}
const says = ref<Array<SayInfo>>([])
const list1 = ref<Array<SayInfo>>([])
const list2 = ref<Array<SayInfo>>([])

const windowSize = useWindowSize()

const isMini = ref(windowSize.width.value < 600)

const colors = [
  '#eba0b3',
  '#3170a7',
  '#ef498b',
  '#a4aca7',
  '#f17666',
  '#f8df72',
  '#E290BD',
  '#FDD19F',
  '#d11a2d',
  '#525288',
  '#FAA563',
  '#497568',
  '#FFC8CB',
  '#E2DCDD',
  '#1475BC',
  '#538DA8',
]

// 打乱数组
const shuffle = (array:Array<any>) => {
  for (let i = array.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
　　   [array[i], array[j]] = [array[j], array[i]]
    }
  return array
}

(function(){
  const randomArray = shuffle(colors)
  says.value = data.map((say, idx) => {
    const s = {
      ...say,
      color: randomArray[idx % randomArray.length],
      delay: idx * 0.2,
    }
    if (idx % 2 === 0)
      list1.value.push(s)
    else
      list2.value.push(s)
    return s
  })
}
)()
watch(useDebounce(windowSize.width, 500), () => {
  if (windowSize.width.value < 600)
    isMini.value = true
  else
    isMini.value = false
})
</script>

<template>
  <div>
    <div v-if="!isMini" flex gap-4>
      <div flex-1>
        <SayCard v-for="s in list1" :key="s.id" :data="s" :delay="s.delay" />
      </div>
      <div flex-1>
        <SayCard v-for="s in list2" :key="s.id" :data="s" :delay="s.delay" />
      </div>
    </div>
    <div v-else>
      <SayCard v-for="s in says" :key="s.id" :data="s" :delay="s.delay" />
    </div>
  </div>
</template>

<style scoped>

</style>
