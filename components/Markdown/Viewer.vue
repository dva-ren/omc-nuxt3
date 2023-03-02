<script lang="ts" setup>
import type { BytemdPlugin } from 'bytemd'

import { Viewer } from '@bytemd/vue-next'
import gfm from '@bytemd/plugin-gfm'
import math from '@bytemd/plugin-math'
import highlight from '@bytemd/plugin-highlight-ssr'
import gemoji from '@bytemd/plugin-gemoji'
import mediumZoom from '@bytemd/plugin-medium-zoom'
import codeCopy from '@uvdream/bytemd-plugin-code-copy'
import flexibleContainers from 'remark-flexible-containers'
import Message from '../Message'
import lazyload from './plugin-lazyload'
import figure from './plugin-figure'
import 'highlight.js/styles/atom-one-light.css'

const { value } = defineProps<{ value: string }>()

function container(): BytemdPlugin {
  return {
    remark: processor => processor.use(flexibleContainers),
  }
}

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
      Message.success('COPYED')
      return text
    },
    copyError: () => {
      Message.error('COPY ERROR')
      return {}
    },
  }),
  figure(),
  // container(),
  lazyload(),
]
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
