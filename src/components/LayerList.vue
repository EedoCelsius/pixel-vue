<script setup>
import { useLayersStore } from '../stores/layers.js'
const layersStore = useLayersStore()
</script>

<template>
  <ul class="p-2 space-y-2">
    <li
      v-for="layer in layersStore.layers"
      :key="layer.id"
      class="flex items-center space-x-2"
    >
      <span
        class="w-4 h-4 rounded"
        :style="{ background: layer.color }"
      ></span>
      <span>Layer {{ layer.id }}</span>
    </li>
  </ul>
</template>
