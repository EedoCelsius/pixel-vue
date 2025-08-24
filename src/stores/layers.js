import { defineStore } from 'pinia'

const width = 64
const height = 64
const size = width * height
const words = Math.ceil(size / 32)

function createPixels() {
  return Array(words).fill(0)
}

function setPixel(pixels, x, y) {
  const index = x + y * width
  const wordIndex = Math.floor(index / 32)
  const bit = index % 32
  pixels[wordIndex] |= 1 << bit
}

const layer1Pixels = createPixels()
for (let y = 10; y < 20; y++) {
  for (let x = 10; x < 20; x++) {
    setPixel(layer1Pixels, x, y)
  }
}

const layer2Pixels = createPixels()
for (let y = 40; y < 50; y++) {
  for (let x = 40; x < 50; x++) {
    setPixel(layer2Pixels, x, y)
  }
}

export const useLayersStore = defineStore('layers', {
  state: () => ({
    layers: [
      { id: 1, color: '#ff0000', width, height, pixels: layer1Pixels },
      { id: 2, color: '#00ff00', width, height, pixels: layer2Pixels },
    ],
  }),
  actions: {
    addLayer(color, w = width, h = height) {
      const size = w * h
      const words = Math.ceil(size / 32)
      const pixels = Array(words).fill(0)
      this.layers.push({ id: Date.now(), color, width: w, height: h, pixels })
    },
    setPixel(id, x, y) {
      const layer = this.layers.find((l) => l.id === id)
      if (!layer) return
      const index = x + y * layer.width
      const wordIndex = Math.floor(index / 32)
      const bit = index % 32
      layer.pixels[wordIndex] |= 1 << bit
    },
  },
})
