<template>
  <div ref="threeRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Scene, PerspectiveCamera, WebGLRenderer, BoxGeometry, MeshBasicMaterial, Mesh} from 'three'
const threeRef = ref('threeRef')

// 初始化场景
const init = () => {
  const scene = new Scene()
  const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)
  // camera.position.x = -30
  // camera.position.y = 40
  camera.position.z = 5
  const renderer = new WebGLRenderer()
  renderer.setSize(window.innerWidth, window.innerHeight)
  document.body.appendChild(renderer.domElement)
  const geometry = new BoxGeometry(1, 1, 1)
  const material = new MeshBasicMaterial({ color: 0x00ff00 })
  const cube = new Mesh(geometry, material)
  scene.add(cube)
  const render = () => {
    requestAnimationFrame(render)
    cube.rotation.x += 0.1
    cube.rotation.y += 0.1
    renderer.render(scene, camera)
  }
  render()
}
onMounted(() => {
  init()
})
</script>

<style scoped lang="scss">

</style>