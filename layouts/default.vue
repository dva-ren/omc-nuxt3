<script setup lang="ts">
const { loadding } = defineProps({
  loadding: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <CommonLoadding :loadding="loadding" />
  <div v-if="!loadding" min-h-full max-w-1050px m-auto p-4 sm:px-6 lg:max-w-7xl lg:px-8 v-bind="$attrs">
    <slot />
  </div>
</template>
