import { defineStore } from 'pinia'

export const useStageStore = defineStore('stage', {
  state: () => ({
    scale: 1,
    offset: { x: 0, y: 0 },
  }),
  actions: {
    zoom(delta) {
      this.scale = Math.min(5, Math.max(0.1, this.scale + delta))
    },
    pan(dx, dy) {
      this.offset.x += dx
      this.offset.y += dy
    },
    setScale(scale) {
      this.scale = scale
    },
    setOffset(offset) {
      this.offset = offset
    },
  },
})
