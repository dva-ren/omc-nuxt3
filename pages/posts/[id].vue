<script lang="ts" setup>
import type { Master } from '~/types'
import { formateToLocal } from '~/composables'

const route = useRoute()
const id = computed(() => route.params.id as string)
const master = useState<Master>('master')

const headerInfo = useHeaderInfo()

const { data: articleData, pending } = await useAsyncData(async () => {
  const res = await queryArticle(id.value)
  headerInfo.value.id = res.data.id
  headerInfo.value.like = 0
  headerInfo.value.title = res.data.title
  headerInfo.value.type = '记录生活'
  try {
    useHead({ title: res.data.title })
  }
  catch {}
  return res.data
})
definePageMeta({
  layout: false,
})
onBeforeUnmount(() => {
  headerInfo.value.title = ''
})
</script>

<template>
  <NuxtLayout name="post">
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
      <Comment v-if="articleData.allowComment" :ref-id="id" type="posts" />
    </div>
    <template #sidebar>
      <div sticky top-20 mt-20 text-sm>
        <MarkdownCatalog />
      </div>
    </template>
  </NuxtLayout>
</template>

<style scoped>
:deep(.md-editor-dark) {
  --md-bk-color: transparent;
}
:deep(.md-editor-dark blockquote) {
  background-color: rgba(224,224,224,0.1) !important;
}
</style>
