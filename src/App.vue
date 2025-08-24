<script setup>
import { ref } from 'vue'
import Stage from './components/Stage.vue'
import LayerList from './components/LayerList.vue'

const container = ref(null)
const stageRatio = ref(2 / 3)
const dragging = ref(false)

function startDrag() {
  dragging.value = true
  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}

function onDrag(e) {
  if (!dragging.value || !container.value) return
  const rect = container.value.getBoundingClientRect()
  const pos = e.clientX - rect.left
  stageRatio.value = Math.min(0.9, Math.max(0.1, pos / rect.width))
}

function stopDrag() {
  dragging.value = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
}
</script>

<template>
  <div ref="container" class="flex h-screen w-screen overflow-hidden">
    <div class="h-full" :style="{ width: stageRatio * 100 + '%' }">
      <Stage />
    </div>
    <div
      class="w-1 bg-gray-300 cursor-col-resize"
      @mousedown="startDrag"
    ></div>
    <div class="h-full" :style="{ width: (1 - stageRatio) * 100 + '%' }">
      <LayerList />
    </div>
  </div>
</template>
