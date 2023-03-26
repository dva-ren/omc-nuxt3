<script lang="ts" setup>
const props = defineProps<{ src: string }>()
const data_url = ref('')
const loadingState = ref('')

watch(() => props.src, () => {
  if (!props.src)
    return
  loadingState.value = 'loading'
  const img = new Image()
  img.src = props.src
  img.onload = () => {
    data_url.value = props.src
    loadingState.value = 'loaded'
  }
}, { immediate: true })
</script>

<template>
  <div class="img-container">
    <img v-bind="$attrs" :lazy="loadingState" :src="data_url">
  </div>
</template>

<style scoped>
img {
  box-shadow: 0 0 10px #2333;
  width: 100%;
  user-select: none;
  /* margin: 1em 0; */
  transition: all 0.2s ease-in 0.2s;
}
img[lazy="loading"]{
  background-color: #f8f5ff;
  border: 1px solid #2333;
  opacity: 1;
  filter: blur(6px);
}
img[lazy="loaded"]{
  opacity: 1;
}
</style>
