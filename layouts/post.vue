<script lang="ts" setup>
const { full, loadding } = defineProps({
  full: {
    type: Boolean,
    default: false,
  },
  loadding: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <div>
    <div v-if="full" v-bind="$attrs">
      <slot />
    </div>
    <Loadding :loadding="loadding" />
    <div v-if="!full && !loadding" v-spring v-bind="$attrs" flex justify-center>
      <div display-none xl:display-block>
        <slot name="pre" />
      </div>
      <div p-4 max-w-750px min-w-0 sm:max-w-850px flex-1 class="layout-post">
        <slot />
      </div>
      <div display-none md:display-block>
        <slot name="sidebar" />
      </div>
    </div>
    <!-- <Footer /> -->
  </div>
</template>

<style scoped>
.layout-post{
  background-color: rgba(255,255,255,0.5);
}
.dark .layout-post{
  background-color: rgba(0,0,0,0.5);

}
</style>
