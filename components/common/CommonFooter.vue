<script lang="ts" setup>
const master = useMaster()
</script>

<template>
  <footer text-sm w-full text-white>
    <img class="footer-img" src="/images/footer.png" alt="">
    <div class="content" text-center w-full bg="#67ACA0" py-10>
      <p>
        <span pr-2>© 2022-2023</span>
        <a href="https://github.com/dva-ren">dvaren</a>
        <span>. Stay hungry</span>
        <span>. Stay foolish.</span>
      </p>
      <p>
        <span px-2>Powered by</span>
        <a href="https://github.com/dva-ren">dvaren</a>
        <span px-1>•</span>
        <a href="https://github.com/dva-ren/ohmycat">ohmycat</a>
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
