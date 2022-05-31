<template>
	<div class="map">
		<strong>Map will be here soon ...</strong>
		<div>Lon: {{ card.location.lon }} </div>
		<div>Lat: {{ card.location.lat }} </div>
	</div>
</template>

<script>
	export default {
		props: {
			card: {
				type: Object, 
				required: true
			}
		}
		
	}
</script>

<style lang="sass" scoped>
@import "@/styles/variables.sass"

.map
	width: 700px
	height: 450px
	padding: 20px
	font-size: $small
	border-radius: $default
	background: $main
	display: flex
	flex-direction: column
	justify-content: center
	align-items: center

</style>