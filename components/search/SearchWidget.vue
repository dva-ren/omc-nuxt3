<script lang="ts" setup>
const searchText = ref('')
const show = ref(false)
const { data, refresh, pending } = useAsyncData(async () => {
  if (searchText.value.trim().length === 0)
    return
  const res = await search({ title: searchText.value.trim() })
  return res.data
})

function handleClose() {
  show.value = false
  searchText.value = ''
}

watch(searchText, useDebounceFn((curr, pre) => {
  console.log(curr, pre)
  refresh()
}, 300))
useRouter().afterEach(() => {
  handleClose()
})
</script>

<template>
  <slot>
    <button class="button" @click="show = !show">
      <div i-carbon:search />
    </button>
  </slot>
  <CommonModal v-if="show" v-model="show" @close="handleClose">
    <div class="search-container">
      <div class="input-box">
        <input v-model="searchText" autofocus type="text" placeholder="Search..">
      </div>
      <div class="content">
        <NuxtLink v-for="i in data?.post" :key="i" :to="`/posts/${i.id}`">
          <div class="title">
            {{ i.title }}
          </div>
          <div class="category">
            {{ i.categoryName }}
          </div>
        </NuxtLink>
        <NuxtLink v-for="i in data?.note" :key="i.id" :to="`/notes/${i.id}`">
          <div class="title">
            {{ i.title }}
          </div>
          <div class="category">
            说说
          </div>
        </NuxtLink>
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
  overflow-y: scroll;
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
