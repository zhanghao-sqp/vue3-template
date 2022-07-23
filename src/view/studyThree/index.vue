<template>
	<div ref="statsRef" style="position: absolute; top: 20px; right: 100px"></div>
	<el-button @click="move" :disabled="moveFlag">动起来</el-button>
	<el-button @click="stop" :disabled="!moveFlag">停下</el-button>
	<label>速度</label>
	<el-slider
		v-model="speed"
		:format-tooltip="(v:number)=>v"
		:show-tooltip="false"
	/>
	<br />
	<!-- <label>cameraX</label>
	<el-slider
		v-model="cameraPosition.x"
		:min="-100"
		:max="100"
		:format-tooltip="(v:number)=>v"
		@input="cameraPositionChange"
	/>
	<br />
	<label>cameraY</label>
	<el-slider
		v-model="cameraPosition.y"
		:min="-100"
		:max="100"
		:format-tooltip="(v:number)=>v"
		@input="cameraPositionChange"
	/>
	<br />
	<label>cameraZ</label>
	<el-slider
		v-model="cameraPosition.z"
		:min="-1000"
		:max="1000"
		:format-tooltip="(v:number)=>v"
		@input="cameraPositionChange"
	/> -->
	<div ref="threeRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import {
	Scene,
	PerspectiveCamera,
	AxesHelper,
	WebGLRenderer,
	BoxGeometry,
	MeshBasicMaterial,
	MeshLambertMaterial,
	Mesh,
	SpotLight,
	PlaneGeometry,
	CircleGeometry,
	AmbientLight,
	SphereGeometry,
	Raycaster,
	Points,
	PolyhedronGeometry,
	TextureLoader,
	SpriteMaterial,
	Sprite,
	Group,
	BufferGeometry,
} from 'three'
// import { OrbitControls } from '@three-ts/orbit-controls';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'stats.js'


const threeRef = ref()
const statsRef = ref()
const moveFlag = ref(true)
const animationId = ref<null | number>(null)
let render: Function
const speed = ref(1)
const move = () => {
	moveFlag.value = true
	render()
}
const stop = () => {
	moveFlag.value = false
	cancelAnimationFrame(animationId.value!)
}

const cameraPosition = reactive({
	x: -20,
	y: 100,
	z: 100
})
const camera = new PerspectiveCamera(
	45,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)
const cameraPositionChange = () => {
	camera.position.x = cameraPosition.x
	camera.position.y = cameraPosition.y
	camera.position.z = cameraPosition.z
}
const rainGroup = new Group()

// 初始化场景
const init = () => {
	const scene = new Scene()
	camera.position.x = cameraPosition.x
	camera.position.y = cameraPosition.y
	camera.position.z = cameraPosition.z
	camera.lookAt(scene.position)

	const axes = new AxesHelper(50)
	scene.add(axes)

	//点光源
	const spotLight = new SpotLight(0xffffff)
	spotLight.castShadow = true
	spotLight.position.set(0, 800, 0) //点光源位置
	scene.add(spotLight) //点光源添加到场景中
	//环境光
	const ambient = new AmbientLight(0x444444)
	scene.add(ambient)
	// 平面
	// const planeGeometry = new PlaneGeometry(60, 40)
	const planeGeometry = new CircleGeometry(60, 40)
	const planeMaterial = new MeshLambertMaterial({ color: 0x888888, side: 2 })
	const plane = new Mesh(planeGeometry, planeMaterial)
	plane.receiveShadow = false
	plane.rotation.x = -0.5 * Math.PI
	plane.position.x = 0
	plane.position.y = 0
	plane.position.z = 0
	scene.add(plane)
	// 几何体
	const geometry = new BoxGeometry(10, 20, 30)
	const material = new MeshLambertMaterial({ color: 0x0f8189, fog: true })
	const cube = new Mesh(geometry, material)
	cube.position.y = 30
	cube.castShadow = true
	scene.add(cube)
	// 球体
	const sphereGeometry = new SphereGeometry(10, 60, 60)
	const sphereMaterial = new MeshLambertMaterial({
		color: 0xcc8455
	})
	console.log(sphereGeometry)
	const sphere = new Mesh(sphereGeometry, sphereMaterial)
	sphere.position.x = 20
	sphere.position.y = 20
	sphere.position.z = 0
	sphere.castShadow = true
	scene.add(sphere)
	// 圆
	const circleGeometry = new CircleGeometry(5, 32)
	const circleMaterial = new MeshBasicMaterial({
		color: 0xf30000,
		wireframe: true
	})
	const circle = new Mesh(circleGeometry, circleMaterial)
	circle.position.x = -20
	circle.position.y = 20
	circle.position.z = 0
	scene.add(circle)

	// 点
	const point = new Points(
		new SphereGeometry(5, 32, 32),
		new MeshBasicMaterial({ color: 0xffffff })
	)
	point.position.x = -20
	point.position.y = 20
	point.position.z = 0
	scene.add(point)
	// 立方体顶点位置坐标
	const vertices = [
			-1,-1,-1,    1,-1,-1,    1, 1,-1,    -1, 1,-1,
			-1,-1, 1,    1,-1, 1,    1, 1, 1,    -1, 1, 1,
	];
	// 立方体顶点索引，三个顶点定义一个三角面
	const indices = [
		2,1,0,    0,3,2,
		0,4,7,    7,3,0,
		0,1,5,    5,4,0,
		1,2,6,    6,5,1,
		2,3,7,    7,6,2,
		4,5,6,    6,7,4
	]
	const polyhedron = new PolyhedronGeometry(vertices, indices, 5)
	const polyhedronMaterial = new MeshBasicMaterial({
		color: 0x425a2e
	})
	const polyhedronMesh = new Mesh(polyhedron, polyhedronMaterial)
	polyhedronMesh.position.x = -20
	polyhedronMesh.position.y = -20
	polyhedronMesh.position.z = 0
	scene.add(polyhedronMesh)

	// 	// 精灵模型Sprite
	// 	const texture = new TextureLoader().load("rain.png");
	// // 创建精灵材质对象SpriteMaterial
	// 	const spriteMaterial = new SpriteMaterial({
	// 		// color:0xff00ff,//设置精灵矩形区域颜色
	// 		// rotation:Math.PI/4,//旋转精灵对象45度，弧度值
	// 		map: texture,//设置精灵纹理贴图
	// 	});
	// 	// 创建精灵模型对象，不需要几何体geometry参数
	// 	const sprite = new Sprite(spriteMaterial);
	// 	scene.add(sprite);
	// 	// 控制精灵大小，比如可视化中精灵大小表征数据大小
	// 	sprite.scale.set(5, 5, 1); //// 只需要设置x、y两个分量就可以
	// 加载雨滴理贴图
	
	const textureTree = new TextureLoader().load('rain.png')
	// 批量创建表示雨滴的精灵模型
	for (let i = 0; i < 1000; i++) {
		const spriteMaterial = new SpriteMaterial({
			map: textureTree //设置精灵纹理贴图
		})
		// 创建精灵模型对象
		const sprite = new Sprite(spriteMaterial)
		rainGroup.add(sprite)
		// 控制精灵大小,
		sprite.scale.set(.7, .7, .7) //// 只需要设置x、y两个分量就可以
		const k1 = Math.random() - 0.5
		const k2 = Math.random() - 0.5
		const k3 = Math.random() - 0.5
		// 设置精灵模型位置，在整个空间上上随机分布
		sprite.position.set(120 * k1, 200 * k3, 120 * k2)
	}
	scene.add(rainGroup)

	const renderer = new WebGLRenderer()
	renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8)
	renderer.setClearColor(0x000000, 1) //设置背景颜色
	renderer.shadowMap.enabled = true //开启阴影
	threeRef.value.appendChild(renderer.domElement)

	const raycaster = new Raycaster()
	// console.log('🚀 ~ raycaster', raycaster)
	// 帧率监听
	const stats = new Stats()
	stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
	stats.dom.style.position = 'absolute'
	statsRef.value.appendChild(stats.dom)

	render = () => {
		stats.begin()
		animationId.value = requestAnimationFrame(render as FrameRequestCallback)

		rainGroup.children.forEach(sprite => {
			// 雨滴的y坐标每次减1
			sprite.position.y -= speed.value / 10;
			if (sprite.position.y < 0) {
				// 如果雨滴落到地面，重置y，从新下落
				sprite.position.y = 100;
			}
		});
		cube.rotation.z += speed.value / 100
		sphere.rotateZ(speed.value / 100)
		circle.rotation.x -= speed.value / 200
		renderer.render(scene, camera)
		stats.end()
	}
	render()
	// 使用鼠标操作三维场景
	const controls = new OrbitControls(camera, renderer.domElement)
	//监听控制器的鼠标事件，执行渲染内容
	controls.addEventListener('change', () => {
		renderer.render(scene, camera)
	})
}
onMounted(() => {
	init()
})
</script>

<style scoped lang="scss">
.el-slider {
	display: inline-block;
	width: 300px;
	vertical-align: middle;
	:deep(.el-slider__runway) {
		margin-left: 16px;
		margin-top: 16px;
		transform: translateY(-50%);
	}
}
</style>
