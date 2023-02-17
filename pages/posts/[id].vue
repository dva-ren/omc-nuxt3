<!-- <script lang="ts" setup>
import type { Article, Master } from '~/types'
import { formateToLocal } from '~/composables'

const { id } = defineProps<{ id: string }>()
const master = useState<Master>('master')

const articleData = ref<Article>()
const { data, pending } = await queryArticle(id)

// watch(pending, () => {
//   if (!data.value) {
//     Message.error('数据错误')
//     return
//   }

//   const { code, data: articleData, msg } = data.value
//   if (code === 200) {
//     useState<HeaderInfo>('headerInfo', () => {
//       return {
//         id: articleData.id,
//         title: articleData.title,
//         type: articleData.categoryName,
//       }
//     })
//   }
//   else { Message.error(msg) }
// })
// onMounted(() => {
//   console.log(id)
// })
// onBeforeUnmount(() => {
//   useState('headerInfo', () => {})
//   useState('catelog', () => [])
// })
</script>

<template>
  <div :loadding="pending">
    <div v-if="articleData">
      <div w-full>
        <div flex items-center justify-between mb-4>
          <div text-2xl style="color: var(--light-color)" mb-8>
            {{ articleData?.title }}
          </div>
        </div>
        <div min-h-100>
          <MarkdownViewer :value="articleData.content" />
        </div>
        <div mt-10 text="xs gray" md:text-sm>
          <p>文章标题：{{ articleData.title }}</p>
          <p py-2>
            文章作者：{{ master?.nickname }}
          </p>
          <p>最后修改时间：{{ formateToLocal(articleData.updateTime) || formateToLocal(articleData.createTime) }}</p>
          <p w-full my-4 h-1px bg-gray-2 />
          <div flex items-center select-none>
            <i i-ri:calendar-todo-line mr-1 />
            <span>{{ formateToLocal(articleData.createTime) }}</span>
            <i ml-4 i-ri:hashtag />
            <span pl-1>{{ articleData.categoryName }}</span>
          </div>
        </div>
        <div my-10 text-gray-5>
          <button flex items-center style="color: var(--light-color);" @click="$router.go(-1)">
            <div i-ri-arrow-left-line inline-block />
            <div text-sm>
              返回..
            </div>
          </button>
        </div>
      </div>
      <Comment v-if="articleData.allowComment && articleData" :ref-id="id" type="posts" />
    </div>
    <template #sidebar>
      <div sticky top-20 mt-20 text-sm>
        <Catalog />
      </div>
    </template>
  </div>
</template>

<style scoped>
:deep(.md-editor-dark) {
  --md-bk-color: transparent;
}
:deep(.md-editor-dark blockquote) {
  background-color: rgba(224,224,224,0.1) !important;
}
</style> -->

<script lang="ts" setup>

</script>

<template>
  <div> 1111</div>
</template>
