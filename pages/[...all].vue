<script setup>
const router = useRouter()
</script>

<template>
  <div p-10 flex-center h-full>
    <div>
      <div>
        <img src="../assets/image/404.svg" alt="404" w-100>
      </div>
      <div flex-center>
        <button btn @click="router.replace('/')">
          返回首页
        </button>
      </div>
    </div>
  </div>
</template>
