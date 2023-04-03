<script lang="ts" setup>
const props = defineProps<{
  type: 'textarea' | 'text' | 'number' | 'password'

}>()
const input = ref<HTMLElement>()
const rect = ref<SVGRectElement>()

onMounted(() => {

})
</script>

<template>
  <div relative>
    <div>
      <textarea v-if="props.type === 'textarea'" ref="input" class="input" type="text" v-bind="$attrs" />
      <input v-else ref="input" class="input" type="text" v-bind="$attrs">
    </div>
  </div>
</template>

<style scoped lang="postcss">
svg{
  pointer-events: none;
}
.rect{
  stroke: pink;
  fill: rgba(255,255,255,0);
  stroke-width: 4px;
  stroke-dasharray: 0 var(--len);
  transition: all linear 1s;
}
textarea:focus + svg>.rect{
  stroke-dasharray: var(--len) 0;

}
</style>
