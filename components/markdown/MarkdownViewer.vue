<script lang="ts" setup>
import type { BytemdPlugin } from 'bytemd'
import { Viewer } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import math from '@bytemd/plugin-math'
import highlight from '@bytemd/plugin-highlight-ssr'
import gemoji from '@bytemd/plugin-gemoji'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import codeCopy from '@uvdream/bytemd-plugin-code-copy'
import lazyload from './plugin-lazyload'
import 'highlight.js/styles/atom-one-light.css'
import './styles/figure.css'
import { clearEffect, init } from './looper'
import Message from '~/composables/message'
import notice from './plugin-notice'


const { value } = defineProps<{ value: string }>()

const plugins:BytemdPlugin[] = [
  gfm(),
  highlight(),
  mediumZoom(),
  math(),
  gemoji(),
  notice(),
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
