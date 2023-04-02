<script lang="ts" setup>
import { getImageSizeFromUrl } from '~/composables/utils'
const props = defineProps<{
  src: string
  lazy?: boolean
}>()

const image = ref<HTMLImageElement>()

const data_url = ref('')
const loadingState = ref('')
const aspectRatio = ref<string | number>('auto')

const ob = useIntersectionObserver(image, (el) => {
  if (el[0].isIntersecting) {
    loadingState.value = 'loading'
    const img = new Image()
    img.src = props.src
    img.onload = () => {
      data_url.value = props.src
      loadingState.value = 'loaded'
      ob.stop()
    }
  }
})

onMounted(() => {
  if (!props.src)
    return
  const size = getImageSizeFromUrl(props.src)
  if (size)
    aspectRatio.value = size.width / size.height
})
</script>

<template>
  <div class="img-container" :style="{ aspectRatio }">
    <img v-bind="$attrs" ref="image" :lazy="loadingState" :src="data_url">
  </div>
</template>

<style scoped>
img {
  /* box-shadow: 0 0 10px #2333; */
  width: 100%;
  user-select: none;
  /* margin: 1em 0; */
  transition: all 0.2s ease-in 0.2s;
}
img[lazy="loading"]{
  background-color: #f8f5ff;
  opacity: 1;
  filter: blur(12px);
}
img[lazy="loaded"]{
  opacity: 1;
}
</style>
