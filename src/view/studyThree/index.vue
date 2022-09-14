<template>
	<div
		ref="statsRef"
		style="position: absolute; top: 100px; right: 100px"
	></div>
	<el-button @click="move" :disabled="moveFlag">动起来</el-button>
	<el-button @click="stop" :disabled="!moveFlag">停下</el-button>
	<label>速度</label>
	<el-slider
		v-model="speed"
		:format-tooltip="(v:number)=>v"
		:show-tooltip="false"
	/>
	<el-button type="primary" @click="getGeometry">查看元素</el-button>
	<br />
	<label>cameraX</label>
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
	/>
	<div ref="threeRef"></div>
</template> 

<script lang="ts" name="three" setup>
import { ref, onMounted, reactive, defineComponent } from 'vue'
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
	Color,
	ExtrudeGeometry,
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
	TorusGeometry,
	TorusBufferGeometry,
	MeshMatcapMaterial,
	Vector3,
	LineCurve,
	LineCurve3,
	Vector2,
	LineBasicMaterial,
	Line,
	BufferAttribute
} from 'three'
import {
	TextBufferGeometry,
	TextGeometry
} from 'three/examples/jsm/geometries/textGeometry'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'stats.js'
import * as dat from 'dat.gui'

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

const scene = new Scene()

// 初始化场景
const init = () => {
	window.addEventListener('resize', () => {
		camera.aspect = window.innerWidth / window.innerHeight
		camera.updateProjectionMatrix()
		renderer.setSize(window.innerWidth * 0.8, window.innerHeight)
	})
	camera.position.x = cameraPosition.x
	camera.position.y = cameraPosition.y
	camera.position.z = cameraPosition.z
	camera.lookAt(scene.position)

	const axes = new AxesHelper(50)
	axes.setColors(
		new Color('#ffffff'),
		new Color('#ffffff'),
		new Color('#ffffff')
	)
	scene.add(axes)

	//点光源
	const spotLight = new SpotLight(0xffffff)
	spotLight.castShadow = true
	spotLight.visible = true
	spotLight.position.set(50, 100, 0) //点光源位置
	scene.add(spotLight) //点光源添加到场景中
	//环境光
	const ambient = new AmbientLight(0x444444)
	scene.add(ambient)
	// 平面
	const planeGeometry = new PlaneGeometry(120, 120)
	// const planeGeometry = new CircleGeometry(60, 40)
	const planeMaterial = new MeshLambertMaterial({ color: 0x888888, side: 2 })
	const plane = new Mesh(planeGeometry, planeMaterial)
	// plane.castShadow = true
	plane.receiveShadow = true
	plane.rotation.x = -0.5 * Math.PI
	plane.position.y = 0
	plane.position.z = 0
	scene.add(plane)
	// 几何体
	const geometry = new BoxGeometry(10, 20, 30)
	// console.log(geometry.attributes.position)
	const material = new MeshLambertMaterial({ color: 0x0f8189, fog: true })
	const cube = new Mesh(geometry, material)
	cube.position.y = 30
	cube.castShadow = true
	scene.add(cube)
	// 球体
	const sphereGeometry = new SphereGeometry(10, 60, 60)
	const sphereMaterial = new MeshLambertMaterial({
		color: 0xcc8455,
		fog: true,
		wireframe: false
	})
	// console.log(sphereGeometry)
	const sphere = new Mesh(sphereGeometry, sphereMaterial)
	sphere.name = 'qiuti'
	sphere.position.x = 20
	sphere.position.y = 20
	sphere.position.z = 0
	sphere.castShadow = true
	scene.add(sphere)
	scene.updateMatrixWorld(true)
	console.log('世界坐标', sphere.getWorldPosition(new Vector3()))
	console.log('本地坐标', sphere.position)
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

	// 方式一：使用顶点坐标和索引创建几何体
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
		color: 0x409eff,
		side: 2
	})
	const polyhedronMesh = new Mesh(polyhedron, polyhedronMaterial)
	polyhedronMesh.position.x = -20
	polyhedronMesh.position.y = -20
	polyhedronMesh.position.z = 0
	scene.add(polyhedronMesh)

	// 方式二:使用顶点坐标创建几何体
	const polyhedronGeometry = new BufferGeometry()
	const vertices2 = new Float32Array([
		-1, -1, -1, 1, -1, -1, 1, 1, -1, -1, 1, -1, -1, -1, 1, 1, -1, 1, 1, 1, 1,
		-1, 1, 1
	])
	const bufferAttribute = new BufferAttribute(vertices2, 3, false)
	polyhedronGeometry.setAttribute('position', bufferAttribute)
	// 设置顶点颜色
	const colors = new Float32Array([
		1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
		0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1,
		1, 0, 1, 1, 0, 1, 1, 0, 1, 1
	])
	const bufferAttribute2 = new BufferAttribute(colors, 3, true)
	polyhedronGeometry.setAttribute('color', bufferAttribute2)
	const polyhedron2 = new Mesh(
		polyhedronGeometry,
		new MeshBasicMaterial({
			vertexColors: true,
			side: 2
		})
	)
	polyhedron2.position.x = 20
	polyhedron2.position.y = -20
	polyhedron2.position.z = 0
	scene.add(polyhedron2)
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
		sprite.scale.set(0.7, 0.7, 0.7) //// 只需要设置x、y两个分量就可以
		const k1 = Math.random() - 0.5
		const k2 = Math.random()
		const k3 = Math.random() - 0.5
		// 设置精灵模型位置，在整个空间上上随机分布
		sprite.position.set(120 * k1, 100 * k2, 120 * k3)
	}
	scene.add(rainGroup)

	// 环状三维体
	for (let i = 0; i < 1000; i++) {
		const torusBufferGeometry = new TorusBufferGeometry(1, 0.5, 50, 50)
		const material = new MeshLambertMaterial({ color: 0xa40d0d })
		const mesh = new Mesh(torusBufferGeometry, material)
		mesh.name = 'cell'
		mesh.castShadow = true
		mesh.position.x = (Math.random() - 0.5) * 80
		mesh.position.y = Math.random() * 20
		mesh.position.z = (Math.random() - 0.5) * 80
		mesh.rotation.x = Math.random() * Math.PI
		mesh.rotation.y = Math.random() * Math.PI
		let random = Math.random()
		mesh.scale.set(random, random, random)
		scene.add(mesh)
	}
	const lineGeometry = new ExtrudeGeometry() //声明一个几何体对象Geometry
	const p1 = new Vector3(50, 0, 0) //顶点1坐标
	const p2 = new Vector3(0, 70, 0) //顶点2坐标
	// 三维直线LineCurve3
	const lineCurve = new LineCurve3(p1, p2)
	const pointArr = lineCurve.getPoints(100) //获取直线上的点数组
	lineGeometry.setFromPoints(pointArr)
	console.log(lineGeometry.getAttribute('')) //获取几何体的长度
	const lineMaterial = new LineBasicMaterial({ color: 0x333333 })
	const line = new Line(lineGeometry, lineMaterial)
	scene.add(line)

	const renderer = new WebGLRenderer()
	renderer.setSize(window.innerWidth * 0.8, window.innerHeight)
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
			sprite.position.y -= speed.value / 10
			if (sprite.position.y < 0) {
				// 如果雨滴落到地面，重置y，从新下落
				sprite.position.y = 100
			}
		})
		scene.traverse(obj => {
			if (obj.name === 'cell') {
				obj.rotation.x += speed.value / 100
				obj.rotation.y += speed.value / 100
				obj.rotation.z += speed.value / 100
			}
		})
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

	const newCubeGroup = new Group()
	newCubeGroup.name = 'newCubeGroup'
	scene.add(newCubeGroup)
	// if (document.querySelector('.dg')) {
	// 	document.querySelector('.dg')?.remove()
	// }
	const gui = new dat.GUI()

	const control = {
		addCube: () => {
			const cubeGeometry = new BoxGeometry(10, 10, 10)
			cubeGeometry.name = 'newCube'
			const cubeMaterial = new MeshLambertMaterial({
				color: 0xff0000
			})
			const cube = new Mesh(cubeGeometry, cubeMaterial)
			cube.name = 'newCube'
			cube.position.x = Math.random() * 100 - 50
			cube.position.y = Math.random() * 100
			cube.position.z = Math.random() * 100 - 50
			cube.castShadow = true
			newCubeGroup.add(cube)
		},
		removeCube: () => {
			console.log('🚀 ~ scene.children', scene.children)
			const groups: Group = scene.children.find(
				child => child.name === 'newCubeGroup'
			) as Group
			scene.remove(groups)
			// groups.remove(groups.children[groups.children.length - 1])
		}
	}
	gui.add(control, 'addCube')
	gui.add(control, 'removeCube')
}
const getGeometry = () => {
	// console.log(scene.children)
	const sphere = scene.children.find(v => v.name === 'qiuti')
	// const copySphere = sphere!.clone()
	// copySphere.position.x = 100
	// copySphere.position.y = 100
	// copySphere.position.z = 100
	// scene.add(copySphere)
	sphere?.scale.set(0.5, 0.5, 0.5)
	console.log(sphere?.rotation.z)
	scene.traverse(obj => {
		console.log(obj)
	})
	// console.log(scene.getObjectByName('newCube')) // 返回第一个匹配的对象
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
