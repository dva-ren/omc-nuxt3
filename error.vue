<script setup>
const props = defineProps({
  error: Object,
})
const handleError = () => clearError({ redirect: '/' })
const reload = () => window.location.reload()
</script>

<template>
  <div p-10 flex-center h-full>
    <div>
      <div>
        <img v-if="error.statusCode === 500" src="./assets/image/500.svg" alt="500" w-120>
      </div>
      <div flex-center>
        <button btn bg-gray-3 mr-4 @click="reload">刷新页面</button>
        <button btn @click="handleError">
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>
