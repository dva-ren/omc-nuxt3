<script lang="ts" setup>
definePageMeta({
  layout: 'post',
})
const url = `${location.host}/friends`
</script>

<template>
  <ClientOnly>
    <h1 text-3xl>
      留言
    </h1>
    <p py-2 text-gray-4 mb-10>
      在这里悄悄的留下什么
    </p>
    <div text-md>
      <p py-2>
        畅所欲言吧
      </p>
      <p py-2>
        不过得文明用语哟
      </p>
      <p py-2>
        申请友链请前往：
        <NuxtLink text-green-800 hover:text-green-900 to="/friends">
          {{ url }}
        </NuxtLink>
      </p>
    </div>
    <div mt-10>
      <CommentWidget ref-id="1723963802837524482" type="note" :observer="false"/>
    </div>
  </ClientOnly>
</template>
