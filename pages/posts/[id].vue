<script lang="ts" setup>
import type { Master } from '~/types'
import { formateToLocal, formateToLocaleHasWeek } from '~/composables'
import { useCatalog } from '~/hooks/useCatalog'

const route = useRoute()
const id = computed(() => route.params.id as string)
const master = useState<Master>('master')

const headerInfo = useHeaderInfo()
const { anchor, parse } = useCatalog()
onMounted(() => {
  parse()
})
const { data: articleData, pending } = useAsyncData(async () => {
  const res = await queryArticle(id.value)
  headerInfo.value.id = res.data.id
  headerInfo.value.like = 0
  headerInfo.value.title = res.data.title
  headerInfo.value.type = res.data.categoryName
  return res.data
})
definePageMeta({
  layout: false,
})
onBeforeUnmount(() => {
  headerInfo.value.title = ''
  anchor.value = []
})
const title = computed(() => {
  if (pending.value)
    return '文章详情'
  return articleData.value?.title || '文章详情'
})
useHead({ title })

const isOutdate = computed(() => {
  if (!articleData.value)
    return false
  const df = dateFns().diff(dateFns(articleData.value?.updateTime || articleData.value.createTime), 'month')
  return df > 3
})
</script>

<template>
  <NuxtLayout name="post" :loading="pending">
    <div v-if="articleData">
      <div w-full>
        <div flex items-center justify-between mb-4>
          <div text-2xl style="color: var(--light-color)" mb-8>
            {{ articleData?.title }}
          </div>
        </div>
        <div v-if="isOutdate" flex justify-center items-center text="sm gray-800" min-h-20 p-4 border="1px orange-200" mb-10 gap-4 bg-orange-50 items rounded>
          <div text-3xl lg:text-base text-orange i-carbon:warning-alt />
          <div>这篇文章上次修改于 {{ formateToLocal(articleData.updateTime || articleData.createTime) }}，可能部分内容已经不适用，如有疑问可询问作者。</div>
        </div>
        <div class="posts" min-h-100>
          <MarkdownViewer :value="articleData.content" />
        </div>
        <div mt-10 text="xs gray" md:text-sm>
          <p>文章标题：{{ articleData.title }}</p>
          <p py-2>
            文章作者：{{ master?.nickname }}
          </p>
          <p>最后修改时间：{{ formateToLocaleHasWeek(articleData.updateTime || articleData.createTime) }}</p>
          <p w-full my-4 h-1px bg-gray-2 />
          <div flex items-center select-none>
            <i i-ri:calendar-todo-line mr-1 />
            <span>{{ formateToLocaleHasWeek(articleData.createTime) }}</span>
            <i ml-4 i-ri:hashtag />
            <span pl-1>{{ articleData.categoryName }}</span>
          </div>
        </div>
        <div my-10 text-gray-5>
          <button flex items-center style="color: var(--light-color);" @click="$router.go(-1)">
            <div i-ri:arrow-left-s-line inline-block />
            <div text-sm>
              返回..
            </div>
          </button>
        </div>
      </div>
      <CommentWidget v-if="articleData.allowComment" :ref-id="id" type="posts" />
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
