<script lang="ts" setup>
import emojis from './emoji.json'
import Message from '~/composables/message'
import type { CommentForm } from '~/types'
import { addComment } from '~/utils/api'

const { refId, type, index, parentId = '', root = false } = defineProps<{ refId: string; type: string; index: number; parentId?: string; root?: boolean }>()

const emits = defineEmits(['onSend'])
const textarea = ref<HTMLTextAreaElement>()
const svg = ref<SVGElement>()
const rect = ref<SVGRectElement>()

const mailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const urlReg = /^(https:\/\/|http:\/\/)/
const processing = ref(false)
const commentForm = reactive<CommentForm>({
  ref: refId,
  refType: type,
  author: '',
  mail: '',
  url: '',
  content: '',
  parent: parentId,
  commentsIndex: index,
  key: '',
  location: '',
  isWhispers: 0,
  avatar: '',
})
watch(() => index, () => {
  commentForm.commentsIndex = index
})
const handleAddComment = useThrottleFn(async () => {
  const { author, mail, content, url } = commentForm
  if (!content) {
    Message.warning('你好像什么都没说')
    return
  }
  if (!author) {
    Message.warning('取个昵称吧')
    return
  }
  if (!mailReg.test(mail)) {
    Message.warning('检查下邮箱格式吧')
    return
  }
  if (url !== '' && !urlReg.test(url)) {
    Message.warning('似乎网址格式不对')
    return
  }
  processing.value = true
  const res = await addComment(commentForm)
  if (res.code === 200) {
    if (commentForm.isWhispers)
      Message.success('收到你的悄悄话啦')
    else
      Message.success('感谢评论')
    emits('onSend')
    commentForm.content = ''
    localStorage.setItem('user', JSON.stringify({
      author,
      mail,
      url,
    }))
  }
  processing.value = false
}, 1000)

const handleEmoji = (e: Event) => {
  if (e.target === e.currentTarget)
    return
  const startIndex = textarea.value!.selectionStart
  const endIndex = textarea.value!.selectionEnd
  const pre = commentForm.content.substring(0, startIndex)
  const last = commentForm.content.substring(endIndex)
  const el = e.target as HTMLElement
  commentForm.content = pre + el.innerText + last
  textarea.value!.focus()
  nextTick(() => {
    textarea.value!.selectionEnd = startIndex + el.innerText.length
  })
}
const initSvg = () => {
  svg.value!.style.height = `${textarea.value!.offsetHeight}px`
  svg.value!.style.width = `${textarea.value!.offsetWidth}px`
  const css = `
    --len: ${rect.value!.getTotalLength()};
  `
  svg.value!.style.cssText += css
  // rect.value!.style.cssText = css
}
useResizeObserver(textarea, () => {
  initSvg()
})
onMounted(() => {
  initSvg()
  const user = localStorage.getItem('user')
  if (user) {
    try {
      const info = JSON.parse(user)
      commentForm.author = info.author
      commentForm.mail = info.mail
      commentForm.url = info.url
    }
    catch {

    }
  }
})
</script>

<template>
  <div text-sm>
    <div flex gap-4 flex-col sm:flex-row>
      <input class="input" v-model="commentForm.author" type="text" placeholder="昵称 *">
      <input class="input" v-model="commentForm.mail" type="text" placeholder="邮箱 *">
      <input class="input" v-model="commentForm.url" type="text" placeholder="网址">
    </div>
    <div mt-8 relative>
      <textarea ref="textarea" v-model="commentForm.content" :style="{ backgroundColor: commentForm.isWhispers ? '#cad7f180' : '#e5e7eb80' }" min-h-40 focus:border-pink-2 placeholder="嘿(～￣▽￣)～，留个评论好不好" p-2 />
      <svg ref="svg" absolute left-0 top-0>
        <rect ref="rect" class="rect" width="100%" height="100%" />
      </svg>
    </div>
    <div p-2 flex justify-between text-sm>
      <div>
        <CommonPopper trigger="hover" placement="bottom-start">
          <button btn rounded-full py-1>
            (≧∇≦)ﾉ
          </button>
          <template #content>
            <div p-4 text-sm grid gap-2 grid-cols-3 class="emoji" @click="handleEmoji">
              <span v-for="i, idx in emojis" :key="idx">{{ i }}</span>
            </div>
          </template>
        </CommonPopper>
      </div>
      <div text-sm>
        <span select-none cursor-pointer @click="commentForm.isWhispers = Number(!commentForm.isWhispers)">
          <div class="checkbox" :class="{ checked: commentForm.isWhispers }" />
          <span>悄悄话</span>
        </span>
        <button :disabled="!commentForm.content || processing" px-4 py-1 cursor-pointer text-white ml-4 rounded-full bg-orange-4 disabled:bg-gray @click="handleAddComment">
          发送
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.input-area input,textarea{
  width: 100%;
  outline: none;
  min-width: 0;
  background: transparent;
}
textarea{
  min-width: 0;
  transition: background-color .2s;
}
.input{
  flex: 1;
  outline: none;
  background-color: rgba(229,231,235,.5);
  padding: 0.25rem 1rem;
  border-radius: 0.4rem;
  transition: outline 0.2s;
}
.input:focus{
  outline: 2px solid rgba(255, 158, 169,0.2);
}
.input-area:has(input:focus){
  border: 1px solid var(--yellow);
}
.checkbox{
  position: relative;
  display: inline-block;
  cursor: pointer;
  width: 1rem;
  height: 1rem;
  overflow: hidden;
  vertical-align:middle;
  transition: border 0.4s;
  margin-right: 4px;
}
.checkbox::before{
  position: absolute;
  top:0;
  left: 0;
  content: '';
  width: 1rem;
  height: 1rem;
  border: 2px solid #c95f5f;
  transition: all .4s ease-in-out;
}
.checked::before{
  transform: rotate(-55deg);
  left: -0.18rem;
  top: -0.42rem;
}
.checked{
  border:none;
}
.icon{
  color: var(--light-color);
}
.emoji span{
  cursor: pointer;
  transition: color 0.1s;
}
.emoji span:hover{
  color: rgba(251, 146, 60,1)
}
.input-rect{
  transition: .5s;
  shape-rendering: crispEdges;
  stroke: var(--yellow);
  stroke-width: 1.5px;
  fill: #0000;
  stroke-dashoffset: 0;
}

svg{
  pointer-events: none;
}
.rect{
  stroke: var(--yellow);
  fill: rgba(255,255,255,0);
  stroke-width: 4px;
  transition: all linear 0.8s;
  stroke-dasharray: 0 var(--len);
}
textarea:focus + svg>.rect{
  stroke-dasharray: var(--len) 0;
}
</style>
