<script setup>
import { useLayersStore } from '../stores/layers.js'
import { useStageStore } from '../stores/stage.js'
import Layer from './Layer.vue'

const layersStore = useLayersStore()
const stageStore = useStageStore()

function onWheel(e) {
  if (e.ctrlKey) {
    e.preventDefault()
    const delta = -e.deltaY * 0.001
    stageStore.zoom(delta)
  } else {
    stageStore.pan(-e.deltaX, -e.deltaY)
  }
}
</script>

<template>
  <div class="w-full h-full overflow-hidden bg-gray-100" @wheel="onWheel">
    <svg
      class="w-full h-full"
      :style="{ transform: `translate(${stageStore.offset.x}px, ${stageStore.offset.y}px) scale(${stageStore.scale})` }"
    >
      <Layer v-for="layer in layersStore.layers" :key="layer.id" :layer="layer" />
    </svg>
  </div>
</template>
