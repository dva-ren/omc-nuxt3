<script lang="ts" setup>
import Snow from './snow'
const canvas = ref<HTMLCanvasElement>()
let ctx: CanvasRenderingContext2D
const points: Snow[] = []

onMounted(() => {
  canvas.value!.width = document.documentElement.clientWidth
  canvas.value!.height = document.documentElement.clientHeight
  ctx = canvas.value!.getContext('2d')!
  // setup()
  // 第一帧 创建1000 个
  for (let i = 0; i < 1000; i++)
    points.push(new Snow(canvas.value!.width, canvas.value!.height, 100))
  // 后面都是更新
  // 调用每个粒子的更新函数
  const update = () => {
    requestAnimationFrame(() => {
      ctx.clearRect(0, 0, canvas.value!.width, canvas.value!.height)
      // ctx.fillStyle = 'rgba(0,128,255,1)'
      ctx.fillStyle = 'rgba(224,224,224,1)'
      ctx.fillRect(0, 0, canvas.value!.width, canvas.value!.height)
      points.forEach((point) => {
        point.draw(ctx).update()
      })
      update()
    })
  }
  update()
})

definePageMeta({
  layout: false,
})
</script>

<template>
  <div absolute>
    <canvas ref="canvas" />
  </div>
</template>
