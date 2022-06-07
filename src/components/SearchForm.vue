<template>
	<form @submit.prevent>
		<input
			v-model="name"
			type="text" 
			placeholder="Название города (eng)...">
		<button @click="findWeather">Найти</button>
	</form>
</template>

<script>
	export default {

		data() {
			return {
				name: '',
    	}
  	},
		
		methods: {
			findWeather() {
				this.$emit('findWeatherInCity', this.name);
				this.name = '';
			},

		},
		
		mounted() {
			this.name = 'Izhevsk'
			this.findWeather()
		}

	}
</script>

<style lang="sass" scoped>

input
	padding: 5px 15px
	font-size: $small
	background: white
	border: none
	border-right: 1px solid rgba(0, 0, 0, 0.8)
	opacity: 0.7
	border-radius: 5px 0 0 5px

button
	padding: 5px 15px
	font-size: $small
	border: none
	background: white
	opacity: 0.7
	border-radius: 0 5px 5px 0
	cursor: pointer

</style>