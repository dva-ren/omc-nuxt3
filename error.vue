<script setup>
const props = defineProps({
  error: Object,
})
const error = useError()
const handleError = () => clearError({ redirect: '/' })
</script>

<template>
  <div p-10>
    <p>{{ error.url }}</p>
    <p>{{ error.statusCode }}</p>
    <p>{{ error.message }}</p>
    <p>{{ error.stack }}</p>
    <button btn @click="handleError">
      Clear errors
    </button>
  </div>
</template>
