import { defineStore } from 'pinia'

export const useStageStore = defineStore('stage', {
  state: () => ({
    scale: 1,
    offset: { x: 0, y: 0 },
    minScale: 0.1,
    containScale: 1,
  }),
  actions: {
    zoom(delta, point, rect, stageSize) {
      const newScale = Math.min(5, Math.max(this.minScale, this.scale + delta))
      const scaleFactor = newScale / this.scale
      this.offset.x = point.x - scaleFactor * (point.x - this.offset.x)
      this.offset.y = point.y - scaleFactor * (point.y - this.offset.y)
      this.scale = newScale
      this._keepInBounds(rect, stageSize)
    },
    pan(dx, dy, rect, stageSize) {
      this.offset.x += dx
      this.offset.y += dy
      this._keepInBounds(rect, stageSize)
    },
    setScale(scale) {
      this.scale = scale
    },
    setOffset(offset) {
      this.offset = offset
    },
    setMinScale(scale) {
      this.minScale = scale
    },
    setContainScale(scale) {
      this.containScale = scale
    },
    _keepInBounds(rect, stageSize) {
      const stageWidth = stageSize.width * this.scale
      const stageHeight = stageSize.height * this.scale
      let x = this.offset.x
      let y = this.offset.y

      if (stageWidth >= rect.width) {
        const minX = rect.width - stageWidth
        const maxX = 0
        x = Math.min(maxX, Math.max(minX, x))
      }
      if (stageHeight >= rect.height) {
        const minY = rect.height - stageHeight
        const maxY = 0
        y = Math.min(maxY, Math.max(minY, y))
      }

      const centerX = (rect.width - stageWidth) / 2
      const centerY = (rect.height - stageHeight) / 2
      const range = this.containScale - this.minScale
      const t = range > 0 ? Math.min(1, Math.max(0, (this.scale - this.minScale) / range)) : 1
      x = x * t + centerX * (1 - t)
      y = y * t + centerY * (1 - t)

      this.offset = { x, y }
    },
  },
})
