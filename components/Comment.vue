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
      共有{{ total }}条评论
    </div>
    <EditComment :ref-id="refId" :type="type" :index="total" @on-send="refresh" />
    <div ref="commentRef" />
    <div v-if="visible">
      <Loadding :loadding="pending" />
      <div v-if="!pending">
        <div v-if="total" mt-4>
          <template v-for="i, idx in comments" :key="i.id">
            <CommentItem v-if="!i.isWhispers" :data="i" :index="idx" @on-replay="refresh" />
          </template>
        </div>
        <Empty v-else>
          这里空空的，想说点什么吗...
        </Empty>
      </div>
    </div>
  </div>
</template>
