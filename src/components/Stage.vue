<script setup>
import { ref, computed, onMounted } from 'vue'
import { useLayersStore } from '../stores/layers.js'
import { useStageStore } from '../stores/stage.js'
import Layer from './Layer.vue'

const container = ref(null)
const layersStore = useLayersStore()
const stageStore = useStageStore()

const stageSize = computed(() => {
  const widths = layersStore.layers.map((l) => l.width)
  const heights = layersStore.layers.map((l) => l.height)
  return { width: Math.max(...widths), height: Math.max(...heights) }
})

onMounted(() => {
  const rect = container.value.getBoundingClientRect()
  const containScale = Math.min(
    rect.width / stageSize.value.width,
    rect.height / stageSize.value.height,
  )
  const minScale = containScale * 0.5
  stageStore.setContainScale(containScale)
  stageStore.setMinScale(minScale)
  stageStore.setScale(containScale)
  stageStore.setOffset({
    x: (rect.width - stageSize.value.width * containScale) / 2,
    y: (rect.height - stageSize.value.height * containScale) / 2,
  })
})

function onWheel(e) {
  const rect = container.value.getBoundingClientRect()
  if (e.ctrlKey) {
    e.preventDefault()
    const delta = -e.deltaY * 0.001
    const point = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    stageStore.zoom(delta, point, rect, stageSize.value)
  } else {
    stageStore.pan(-e.deltaX, -e.deltaY, rect, stageSize.value)
  }
}
</script>

<template>
  <div ref="container" class="w-full h-full overflow-hidden bg-gray-100" @wheel="onWheel">
    <svg
      class="w-full h-full"
      :style="{ transform: `translate(${stageStore.offset.x}px, ${stageStore.offset.y}px) scale(${stageStore.scale})` }"
    >
      <Layer v-for="layer in layersStore.layers" :key="layer.id" :layer="layer" />
    </svg>
  </div>
</template>
