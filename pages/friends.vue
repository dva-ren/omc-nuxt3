<script lang="ts" setup>
import { generateSpringText } from '~/composables'
import { applicationFriendLink } from '~/utils/api'
import type { FriendForm } from '~/types'
import message from '~/composables/message'

const { data: friends, pending } = useAsyncData(async () => {
  const res = await queryFriends()
  return res.data
})

const friendForm = reactive<FriendForm>({
  name: '',
  url: '',
  description: '',
  avatar: '',
})

const handleClick = async (e: Event) => {
  e.preventDefault()
  if (friendForm.name.length < 2 || friendForm.name.length > 22) {
    message.warning('名称应该在2-22字符之间')
    return
  }
  if (!friendForm.url) {
    message.warning('网站地址不能为空')
    return
  }
  try {
    const res = await applicationFriendLink(friendForm)

    if (res.code === 200)
      message.success('感谢申请，请等待审核通过~')
    else
      message.error(res.msg)
  }
  catch {
    message.error('服务器错误')
  }
}
</script>

<template>
  <div m-auto max-w-160>
    <div text-2xl leading-10>
      友人帐
    </div>
    <div text-gray-4>
      愿我们都能被这个世界温柔以待
    </div>
    <CommonLoading v-if="pending" />
    <div v-else grid grid-cols-1 md:grid-cols-2 gap-2 my-10>
      <template v-for="item, idx in friends" :key="item.id">
        <FriendsCard :data="item" :style="generateSpringText({ delay: 50 * idx })" />
      </template>
    </div>
    <div class="left-label text-xl pb-4">
      友链申请
    </div>
    <form action="" flex flex-col gap-2>
      <label>网站名称：</label>
      <input v-model="friendForm.name" type="text" placeholder="">
      <label>网站地址：</label>
      <input v-model="friendForm.url" type="text">
      <span>头像:</span>
      <input v-model="friendForm.avatar" type="text">
      <label>网站描述：</label>
      <textarea v-model="friendForm.description" rows="4" />
      <button type="submit" btn w-40 @click="handleClick">
        提交
      </button>
    </form>
  </div>
</template>

<style scoped lang="postcss">
input{
  border: 1px solid rgba(224,224,224,0.8);
  width: 100%;
  padding: 4px;
}
textarea {
  border: 1px solid rgba(224,224,224,0.8);
}
input:focus,textarea:focus{
  outline: 1px solid var(--yellow);
}
</style>
