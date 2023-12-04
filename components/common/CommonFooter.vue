<script lang="ts" setup>
const master = useMaster()
const onlinePopulation = ref(0)
const env = useRuntimeConfig()
const baseUrl = env.public.VITE_REQUEST_BASE_URL
const uuid = Date.now()
const url = baseUrl.replace('https://','wss://')
  .replace('http://','ws://') + '/websocket/' + uuid
console.log(baseUrl,url)
try {
  const socket = new WebSocket(url)
  socket.onerror = onError
  socket.onmessage = onMessage
} catch (error) {
  console.error('Socket Error', error)
}

function onError(event: Event) {
  console.log('onError', event)
}

function onMessage(event: MessageEvent) {
  onlinePopulation.value = parseInt(event.data)
}
</script>

<template>
  <footer text-sm w-full text-white>
    <img class="footer-img" src="/images/footer.png" alt="">
    <div class="content" text-center w-full bg="#67ACA0" py-10>
      <p>
        <span pr-2>© 2022-{{ new Date().getUTCFullYear() }}</span>
        <a href="https://github.com/dva-ren">dvaren</a>
        <span>. Stay hungry</span>
        <span>. Stay foolish.</span>
      </p>
      <p>
        <span px-2>Powered by</span>
        <a href="https://github.com/dva-ren">dvaren</a>
        <span px-1>•</span>
        <a href="https://github.com/dva-ren/ohmycat">ohmycat</a>
        <span px-2>{{ onlinePopulation }} 个小伙伴在线</span>
      </p>
      <a href="http://beian.miit.gov.cn/" target="_blank">{{ master.icp }}</a>
    </div>
  </footer>
</template>

<style scoped>
.footer-img{
  width: 100%;
  margin-bottom: -2px;
}
a{
  transition: color .2s;
}
a:hover{
  color: var(--yellow)
}
</style>
