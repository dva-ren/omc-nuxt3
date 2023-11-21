<template>
  <div
    min-h-2
    min-w-2
    class="skeleton"
    v-bind="$attrs"
  ></div>
</template>

<style scoped lang="postcss">
.skeleton {
  --n-bezier: cubic-bezier(.4, 0, .2, 1);
  --n-color-start: #eee;
  --n-color-end: #ddd;
  transition: --n-color-start .3s var(--n-bezier), --n-color-end .3s var(--n-bezier), background-color .3s var(--n-bezier);
  animation: 2s skeleton-loading infinite cubic-bezier(0.36, 0, 0.64, 1);
}

@keyframes skeleton-loading{
  0% {
    background: var(--n-color-start);
  }
  40% {
    background: var(--n-color-end);
  }
  80% {
    background: var(--n-color-start);
  }
  100% {
    background: var(--n-color-start);
  }
}
</style>
