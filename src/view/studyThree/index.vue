<template>
	<div ref="threeRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
	Scene,
	PerspectiveCamera,
	AxesHelper,
	WebGLRenderer,
	BoxGeometry,
	MeshBasicMaterial,
	Mesh,
	PointLight,
	PlaneGeometry
} from 'three'
const threeRef = ref()

// 初始化场景
const init = () => {
	const scene = new Scene()
	const camera = new PerspectiveCamera(
		45,
		window.innerWidth / window.innerHeight,
		0.1,
		1000
	)
	camera.position.x = -30
	camera.position.y = 40
	camera.position.z = 30
	camera.lookAt(scene.position)

	const axes = new AxesHelper(20)
	scene.add(axes)

	const light = new PointLight(0xff0000, 1, 100)
	light.position.set(100, 100, 100)
	scene.add(light)

	const planeGeometry = new PlaneGeometry(60, 40)
	const planeMaterial = new MeshBasicMaterial({ color: 0xaaaaaa })
	const plane = new Mesh(planeGeometry, planeMaterial)
	plane.rotation.x = -0.5 * Math.PI
	plane.position.x = 0
	plane.position.y = 0
	plane.position.z = 0
	scene.add(plane)

	const geometry = new BoxGeometry(10, 20, 30)
	const material = new MeshBasicMaterial({ color: 0x0f8189 })
	const cube = new Mesh(geometry, material)
	scene.add(cube)

	const renderer = new WebGLRenderer()
	renderer.setSize(window.innerWidth * 0.6, window.innerHeight * 0.6)
	threeRef.value.appendChild(renderer.domElement)

	const animationId = ref<null | number>(null)
	const render = () => {
		animationId.value = requestAnimationFrame(render)
		// cube.rotation.x += 0.01
		// cube.rotation.y += 0.01
		cube.rotation.z += 0.01
		renderer.render(scene, camera)
	}
	render()
	setTimeout(() => {
		// cancelAnimationFrame(animationId.value!)
	}, 3000)
}
onMounted(() => {
	init()
})
</script>

<style scoped lang="scss"></style>
