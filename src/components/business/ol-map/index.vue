<template>
	<div id="map-container"></div>
</template>

<script setup lang="ts" name="ol-map">
import { onMounted } from 'vue'
import { Map, View } from 'ol'
import { Vector as VectorLayer, Tile } from 'ol/layer'
import { OSM, Vector as VectorSource, TileArcGISRest } from 'ol/source'
import { getCurrentInstance } from 'vue'


const proxy = getCurrentInstance()
onMounted(() => {
	const map = new Map({
		target: 'map-container',
		view: new View({
			// projection: 'EPSG:4326',
			center: [0, 0],
			zoom: 7
		}),
		layers: [
			new Tile({
				source: new OSM()
			})
		]
	})
})
</script>

<style scoped lang="scss">
#map-container {
	width: 100%;
	height: 100%;
}
</style>
