<script setup>
import { computed } from 'vue'

const props = defineProps({
  layer: {
    type: Object,
    required: true,
  },
})

const rects = computed(() => {
  const r = []
  const { width, pixels } = props.layer
  for (let wordIndex = 0; wordIndex < pixels.length; wordIndex++) {
    let word = pixels[wordIndex]
    if (!word) continue
    for (let bit = 0; bit < 32; bit++) {
      if (word & (1 << bit)) {
        const index = wordIndex * 32 + bit
        const x = index % width
        const y = Math.floor(index / width)
        r.push({ x, y })
      }
    }
  }
  return r
})
</script>

<template>
  <g :fill="layer.color">
    <rect
      v-for="(p, i) in rects"
      :key="i"
      :x="p.x"
      :y="p.y"
      width="1"
      height="1"
    />
  </g>
</template>
