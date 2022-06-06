<template>
	<div 
		v-if="card.location"
		class="map"
		ref="myMap"
	>
		<!-- <strong>Map will be here soon ...</strong>
		<div>Lon: {{ card.location.lon }} </div>
		<div>Lat: {{ card.location.lat }} </div> -->
		
	</div>
</template>

<script>
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import 'ol/ol.css'
import { fromLonLat } from 'ol/proj';

	export default {
		props: {
			card: {
				type: Object, 
				required: true
			},
		},

		data() {
			return {
				lat: 0,
				lon: 0,
			}
		},
		
		methods: {
			createMap() {
				return new Map({
					target: this.$refs.myMap,
					layers: [
						new TileLayer({
							source: new OSM()
						}),
					],
					view: new View({
						zoom: 10,
						center: fromLonLat(this.myCoordinates),
						constrainResolution: true
					}),
      	})
			},

		},

		computed: {
			myCoordinates() {
				return [
					Number(this.card.location.lon), Number(this.card.location.lat),
				]
			}
		},

		mounted() {
			this.createMap()

		}


			
	}
</script>

<style lang="sass" scoped>
@import "@/styles/variables.sass"

.map
	width: 700px
	height: 450px
	font-size: $small
	border-radius: $default
	// background: $main
	border: solid black 1px
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center

</style>