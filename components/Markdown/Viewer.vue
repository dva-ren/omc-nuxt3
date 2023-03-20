<script lang="ts" setup>
import { Viewer } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import math from '@bytemd/plugin-math'
import highlight from '@bytemd/plugin-highlight-ssr'
import gemoji from '@bytemd/plugin-gemoji'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import codeCopy from '@uvdream/bytemd-plugin-code-copy'
import Message from '../Message'
import lazyload from './plugin-lazyload'
import 'highlight.js/styles/atom-one-light.css'
import './styles/figure.css'
import { clearEffect, init } from './looper'

const { value } = defineProps<{ value: string }>()

const plugins = [
  gfm(),
  highlight(),
  mediumZoom(),
  math(),
  gemoji(),
  codeCopy({
    // 拷贝按钮文字
    copyText: 'COPY',
    copyIcon: 'copyLight',
    copySuccess: (text: string) => {
      Message.success('COPIED')
      return text
    },
    copyError: () => {
      Message.error('COPY ERROR')
      return {}
    },
  }),
  lazyload(),
]
onMounted(() => {
  init()
})
onBeforeUnmount(() => {
  clearEffect()
})
</script>

<template>
  <div v-bind="$attrs">
    <Viewer :value="value" w-full :plugins="plugins" />
  </div>
</template>

<style>
.bytemd {
  height: calc(100vh - 200px);
}
</style>
