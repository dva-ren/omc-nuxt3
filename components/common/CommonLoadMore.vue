<script lang="ts" setup>
const props = defineProps<{
  loading?: boolean
}>()
const emits = defineEmits(['loadMore'])

function handleClick() {
  emits('loadMore')
}
</script>

<template>
  <button class="loadmore-btn" @click="handleClick">
    <svg v-if="props.loading" xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" viewBox="0 0 24 24"><path fill="currentColor" d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"><animateTransform attributeName="transform" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12" /></path></svg>
    <div v-if="props.loading">
      加载中
    </div>
    <div v-else>
      <slot>
        加载更多
      </slot>
    </div>
  </button>
</template>

<style scoped lang="postcss">
.loadmore-btn{
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 1rem;
  border-radius: 999px;
  background-color: var(--green);
  font-size: 0.875rem;
  color: white;
  margin: 0 auto;
  transition: transform 0.2s;
}
.loadmore-btn:hover{
  transform: scale(1.1);
}
</style>
