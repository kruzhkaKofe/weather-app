<template>
	<div class="map" id="map">



	</div>
</template>

<script>
// import { ref } from 'vue'

	// export default {
	// 	props: {
	// 		card: {
	// 			type: Object, 
	// 			required: true
	// 		},
	// 	},

	// 	setup(props) {
	// 		const lat = props.card.location.lat
	// 		const lon = props.card.location.lon


	// 		ymaps.ready(init)

	// 		function init() {
	// 			const  myMap = new ymaps.Map("map", {
	// 				center: [lat, lon],
	// 				zoom: 9
	// 			});
  //   	}			

	// 		return {
	// 			// lon,
	// 			// lat,
	// 		}

	// 	},
			
	// }
</script>

<style lang="sass" scoped>

.map
	width: 700px
	height: 450px
	border-radius: $default
	border: solid $main 3px
	overflow: hidden

</style>