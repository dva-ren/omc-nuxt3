<script lang="ts" setup>
const props = defineProps({
  modelValue: {
    type: Boolean,
  },
  clickMaskClose: {
    type: Boolean,
    default: true,
  },
  beforeClose: {
    type: Function,
    required: false,
  },
})

const emits = defineEmits(['update:modelValue', 'close'])
const { disable, display } = useScrollBar()

// 关闭抽屉弹出框
const close = () => {
  emits('update:modelValue', false)
  emits('close')
}
const closeDrawer = () => {
  // 若传递了beforeClose函数，就抛出关闭函数，供外部使用
  if (props.beforeClose)
    props.beforeClose(close)
  // 没有beforeClose函数，直接关闭即可
  else
    close()
}

const clickMaskCloseFn = () => {
  if (props.clickMaskClose) {
    closeDrawer()
  }
  else {
    /* 这里要控制一下冒泡事件，注意第十行使用@click.stop
        不控制冒泡的话，点击内容区也会导致弹出框关闭 */
  }
}
const onEnter = () => {
  disable()
  // document.body.style.overflow = 'hidden'
}

const onLeave = () => {
  display()
  // document.body.style.overflow = 'auto'
}
</script>

<template>
  <!-- <Teleport to="body"> -->
  <Transition name="modal" @enter="onEnter" @leave="onLeave">
    <div v-show="modelValue" class="modal-container" z-20 bg-gray-00 bg-op-80 fixed inset-0 flex items-center justify-center dark:bg-black @click="clickMaskCloseFn">
      <div class="content" @click.stop>
        <slot />
      </div>
    </div>
  </Transition>
  <!-- </Teleport> -->
</template>

<style scoped>
.modal-container{
  background-color: rgba(55,55,55,0.3);
  backdrop-filter: blur(6px);
}
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease,backdrop-filter 0.2s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
</style>
