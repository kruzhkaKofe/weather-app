<template>
	<form @submit.prevent>
		<input
			v-model="card.location.name"
			type="text" 
			placeholder="Название города (eng)...">
		<button @click="findWeather">Найти</button>
	</form>
</template>

<script>
	export default {

		data() {
			return {
				card: {
        	current: {
          	condition: {
          	}
        	},
        	location: {
          	name: 'Izhevsk',
						localtime: '',
						lon: '',
          	lat: '',
        	},
        	forecast: {
          	forecastday: [
							{
								astro: {
									sunrise: '',
									sunset: '',
								},

								day: {
                	mintemp_c: '',
                	maxtemp_c: '',
              	},
              	hour: {
									wind_kph: '',
									condition: {
										text: '',
										icon: '',
                	}
              	}
							},
							{
								day: {
									mintemp_c: '',
									maxtemp_c: '',
								},
								hour: {
									wind_kph: ''
              }
            }
						],
        	}
      	},
    	}
  	},
		
		methods: {
			findWeather() {
				this.$emit('findWeatherInCity', this.card);
				this.card.location.name = '';
			},

		},
		
		mounted() {
			this.findWeather(this.card)
		}

	}
</script>

<style lang="sass" scoped>
@import "@/styles/variables.sass"

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