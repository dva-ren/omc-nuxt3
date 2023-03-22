<script lang="ts" setup>
import { genSpringKeyframes } from '~/composables/spring'

const up_name = 'bottom-up-spring'
const down_name = 'bottom-down-spring'

const transitionStyles = {
  entering: { opacity: 0 },
  entered: { animation: `${up_name} 1000ms linear both`, opacity: 1 },
  exiting: { animation: `${down_name} 1000ms linear both`, opacity: 1 },
  exited: { opacity: 0 },
}
const s1 = genSpringKeyframes(
  up_name,
  { translateY: '3em', opacity: 0 },
  { translateY: '0em', opacity: 1 },
)

const s2 = genSpringKeyframes(
  down_name,
  { translateY: '0em', opacity: 1 },
  { translateY: '3em', opacity: 0 },
)
console.log('s1', s1)
console.log('s2', s2)
</script>

<template>
  <div>111</div>
</template>
