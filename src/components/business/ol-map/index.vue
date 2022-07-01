<template>
	<div id="map-container"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { Map, View } from 'ol'
import { Vector as VectorLayer, Tile } from 'ol/layer'
import { OSM, Vector as VectorSource, TileArcGISRest } from 'ol/source'

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
	console.log('🚀 ~ map', map)
})
</script>

<style scoped lang="scss">
#map-container {
	width: 100%;
	height: 100%;
}
</style>
