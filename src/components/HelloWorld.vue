<script setup>
import { useCounterStore } from '../stores/counter.js'

defineProps({
  msg: String,
})

const counter = useCounterStore()
</script>

<template>
  <h1 class="text-3xl font-bold mb-4">{{ msg }}</h1>

  <div class="card space-y-2">
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded"
      type="button"
      @click="counter.increment()"
    >
      count is {{ counter.count }}
    </button>
    <p>double is {{ counter.doubleCount }}</p>
  </div>
</template>

<style scoped>
/* no additional styles */
</style>
