<script lang="ts" setup>
const searchText = ref('')
const show = ref(false)
const input = ref<HTMLInputElement>()
const selectIndex = ref(0)
const router = useRouter()

const { data, refresh, pending } = useAsyncData(async () => {
  const temp: Array<{ link: string; title: string; type: string }> = []
  selectIndex.value = 0
  if (searchText.value.trim().length === 0)
    return temp
  const res = await search({ title: searchText.value.trim() })
  res.data.note.forEach((i) => {
    temp.push({
      link: `/notes/${i.id}`,
      type: '说说',
      title: i.title,
    })
  })
  res.data.post.forEach((i) => {
    temp.push({
      link: `/posts/${i.id}`,
      title: i.title,
      type: i.categoryName,
    })
  })
  return temp
})

function handleClose() {
  show.value = false
  // searchText.value = ''
}
watch(searchText, useDebounceFn((curr, pre) => {
  refresh()
}, 300))
useRouter().afterEach(() => {
  handleClose()
})

function handleKeyDown(e: KeyboardEvent) {
  const { code } = e
  if (!data.value!.length)
    return
  switch (code) {
    case 'ArrowDown':
      e.preventDefault()
      selectIndex.value = (selectIndex.value + 1) % data.value!.length
      break
    case 'ArrowUp':
      e.preventDefault()
      if (selectIndex.value === 0) {
        selectIndex.value = data.value!.length - 1
        break
      }
      selectIndex.value = (selectIndex.value - 1) % data.value!.length
      break
    case 'Enter':
      router.push(data.value![selectIndex.value].link)
  }
}

function showModal() {
  show.value = true
  nextTick(() => {
    input.value?.focus()
  })
}
</script>

<template>
  <slot>
    <button class="button" @click="showModal">
      <div i-carbon:search />
    </button>
  </slot>
  <CommonModal v-model="show" @close="handleClose">
    <div class="search-container" @keydown="handleKeyDown">
      <div class="input-box">
        <input ref="input" v-model="searchText" type="text" placeholder="Search..">
      </div>
      <div class="content">
        <CommonEmpty v-if="!data?.length" h-full />
        <div v-else>
          <NuxtLink v-for="i, idx in data" :key="i" :class="{ 'bg-gray-2': selectIndex === idx }" :to="i.link">
            <div class="title">
              {{ i.title }}
            </div>
            <div class="category">
              {{ i.type }}
            </div>
          </NuxtLink>
        </div>
      </div>
    </div>
  </CommonModal>
</template>

<style scoped lang="postcss">
.button{
  color: var(--light-color);
  padding: .74rem;
  background-color: white;
  border-radius: 9999px;
  box-shadow: 0 0 10px #7878781a, 0 5px 20px #78787833;
}
.search-container{
  color: rgb(53,53,53);
  height: 600px;
  max-height: 60vh;
  max-width: 80vw;
  width: 800px;
  background-color: rgba(255,255,255,0.9);
  border-radius: .75rem;
  display: flex;
  flex-direction: column;
  min-height: 12.5rem;
  backdrop-filter: blur(10px);
  .input-box{
    border-bottom: 1px solid #2333;
    padding: 0 1rem;
    input{
      width: 100%;
      line-height: 3em;
      background: none;
      &:focus{
        outline: none;
      }
    }

  }
  .content{
    padding: 0.5rem;
    height: 100%;
    overflow-y: scroll;
    a{
      padding: 0.8rem;
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      transition: background .3s;
      border-radius: 0.65rem;
      .category{
        color: rgb(174,174,174);
      }
      &:hover{
        background-color: rgba(100,100,100,0.1);
      }
    }
  }
}
</style>
