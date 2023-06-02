<script lang="ts" setup>
const resume = '# BBI \n  > 爱具体的人，而非爱抽象的人\n  \n  Hi 我是即将入行的新人程序员BBI ，喜欢前端，喜欢一点一点写出页面的感觉，非常有成就感（ps: bug也写了一堆）\n\n  这里是我的个人博客,使用<a href=\"https://nuxt.com\" target=\"_blank\">Nuxt3</a>，<a href=\"https://github.com/unocss/unocss\" target=\"_blank\">unocss</a>框架，这个网站记录这学习中的部分笔记，代码片段以及一些好玩的项目，同时偶尔写写随记啥的。\n\n  ### Website Todo:\n  - [x] 完成基本框架\n  - [ ] 文章根据标签筛选\n  - [ ] 文章搜索\n\n  ### Life Todo:\n  - [x] 吃饭\n  - [x] 睡觉\n  - [x] 打代码\n  - [ ] 天冷了，记得找个女朋友 (😭)\n\n  ...'
</script>

<template>
  <div>
    <MarkdownViewer :value="resume" />
  </div>
</template>
