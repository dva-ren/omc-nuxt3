<script lang="ts" setup>
import projects from './projects.json'
import ProjectWidget from '~~/components/project/ProjectWidget.vue'
onMounted(() => {
  useHead({
    title: '项目',
  })
})
</script>

<template>
  <div>
    <h1 text-2xl font-bold>
      Projects
    </h1>
    <div text-sm text-gray-400 py-4>
      一些代码片段和好玩的项目
    </div>
    <div class="spring project-grid py-2 -mx-3 gap-2">
      <ProjectWidget v-for="(p, idx) in projects" :key="idx" :data="p" />
    </div>
    <div hidden>
      <div i-carbon-align-box-middle-left />
      <div i-ri:heart-pulse-fill />
      <div i-ri-code-box-line />
      <div i-ri:emotion-laugh-fill />
      <div i-ri-snowy-fill />
      <div i-carbon:button-centered />
      <div i-ri-fire-fill />
    </div>
  </div>
</template>

<style scoped>
  .project-grid{
    display: grid;
    grid-template-columns: repeat(2,1fr);
    column-gap: 1rem;
  }
</style>
