<script lang="ts" setup>
import type { Friend } from '~/types'
const { data } = defineProps<{ data: Friend }>()
const circle = ref<SVGCircleElement>()
const len = ref(0)

onMounted(() => {
  len.value = circle.value!.getTotalLength()
})
</script>

<template>
  <a :href="data.url" target="_blank" flex items-center p-2 hover:bg-gray-200 rounded transition>
    <div relative>
      <svg width="80" height="80" absolute inset-0 :style="{ '--len': len }">
        <circle
          ref="circle"
          class="circle"
          cx="40" cy="40" r="39"
          stroke="black"
          stroke-width="3" fill="transparent"
        />
      </svg>
      <CommonImageLoad rounded-full class="img" w-20 h-20 :src="data.avatar" />
    </div>
    <div pl-4>
      <div>{{ data.name }}</div>
      <div text="sm gray-4" pt-1 break-all>
        {{ data.description }}
      </div>
    </div>
  </a>
</template>

<style lang="postcss" scoped>
svg{
  .circle{
    stroke: var(--light-color);
    stroke-width: 2px;
    transition: all linear .5s;
    stroke-dasharray: 0 var(--len);
  }
}
a:hover svg> .circle{
  stroke-dasharray: var(--len) 0;
}
.img{
  box-shadow: 0 6px 16px rgba(0,0,0,0.1);
}
</style>
