<script lang="ts" setup>
import { queryPictures } from '~~/utils/api'

const { data, pending } = useAsyncData(async () => {
  const res = await queryPictures()
  return res.data.list
})
</script>

<template>
  <div v-if="!pending">
    <div flex justify-center>
      <div v-for="i in 6" :key="i" class="category" :class="{ active: i === 1 }">
        {{ i }}
      </div>
    </div>
    <div mt-8>
      <div v-for="i in data" :key="i.id" class="img-item">
        <img :src="i.url">
        <div>
          <div i-carbon:location-filled />
        </div>
        <div>
          {{ i.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.category{
  width: 4rem;
  height: 2rem;
  line-height: 2rem;
  border-radius: 1rem;
  text-align: center;
  transition: all 0.2s;
  cursor: pointer;
  user-select: none;
}
.category:hover{
  background-color: var(--yellow);
  color: white;
}
.active{
  color: white;
  background-color: #8076a3;
}
.img-item{
  width: 220px;
  border: 1px solid gray;
  border-radius: 10px;
}
.img-item img{
  object-fit: cover;
}
</style>
