<script lang="ts" setup>
import { generateSpringText } from '~/composables'
import { applicationFriendLink } from '~/utils/api'
import type { FriendForm } from '~/types'
import message from '~~/components/message'

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
  const res = await applicationFriendLink(friendForm)
  if (res.code === 200)
    message.success('感谢申请，请等待审核通过~')
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
    <div grid grid-cols-1 md:grid-cols-2 gap-2 mt-10>
      <template v-for="item, idx in friends" :key="item.id">
        <FriendsCard :data="item" :style="generateSpringText({ delay: 50 * idx })" />
      </template>
    </div>
    <div class="left-label text-xl pb-4">
      友链申请
    </div>
    <form action="" flex flex-col gap-2>
      <div>
        网站名称：<input v-model="friendForm.name" type="text">
      </div>
      <div>
        网站地址：<input v-model="friendForm.url" type="text">
      </div>
      <div>
        头像：<input v-model="friendForm.avatar" type="text">
      </div>
      <div>
        网站描述：<textarea v-model="friendForm.description" rows="4" />
      </div>
      <button type="submit" btn @click="handleClick">
        提交
      </button>
    </form>
  </div>
</template>

<style scoped lang="postcss">
input{
  border: 1px solid rgba(224,224,224,0.8);
}
</style>
