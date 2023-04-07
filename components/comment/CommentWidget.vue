<script lang="ts" setup>
import { queryComment } from '~/utils/api'

const { refId, type } = defineProps<{ refId: string; type: 'note' | 'posts' }>()
const visible = ref(false)
const commentRef = ref<HTMLElement>()
const total = ref(0)

const { data: comments, pending, refresh } = useAsyncData(async () => {
  const res = await queryComment(refId)
  total.value = res.data.total
  return res.data.list
})

onMounted(() => {
  let flag = false
  const { stop } = useIntersectionObserver(commentRef, () => {
    if (flag) {
      visible.value = true
      refresh()
      stop()
    }
    flag = true
  })
})
</script>

<template>
  <div>
    <div class="left-label" py-4>
      共有 <span v-if="!pending">{{ total }}</span> 条评论
    </div>
    <CommentEdit :ref-id="refId" :type="type" :index="total" @on-send="refresh" />
    <div ref="commentRef" />
    <div v-if="visible">
      <CommonLoading :loading="pending" />
      <div v-if="!pending">
        <div v-if="total" mt-4>
          <template v-for="i, idx in comments" :key="i.id">
            <CommentItem v-if="!i.isWhispers" :data="i" :index="idx" @on-replay="refresh" />
          </template>
        </div>
        <CommonEmpty v-else>
          这里空空的，想说点什么吗...
        </CommonEmpty>
      </div>
    </div>
  </div>
</template>
