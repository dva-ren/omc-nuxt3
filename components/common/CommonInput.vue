<script lang="ts" setup>
const props = defineProps<{}>()
</script>

<template>
  <div>
    <svg><rect height="123" width="642" class="input_rect" style="stroke-dasharray: 1530px; stroke-dashoffset: 1530px;" /></svg>
    <slot>
      aa
    </slot>
  </div>
</template>

<style scoped lang="postcss">

</style>
