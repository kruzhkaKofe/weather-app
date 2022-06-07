<template>
	<div class="inner-wrapper--wide">
		<div class="inner-wrapper">
			<my-header @findWeatherInCity="fetchWeather"/>
		</div>
	</div>
	<div class="inner-wrapper">
		<nav-breadcrumbs 
			:card="card"
		/>
		<day-forecast 
      :card="card"
    />
	</div>
</template>

<script>
import MyHeader from '@/components/MyHeader'
import NavBreadcrumbs from '@/components/NavBreadcrumbs'
import DayForecast from '@/components/DayForecast'
import { weatherLoader } from '@/plugins/api.js'

	export default {
		components: {
			MyHeader,
			NavBreadcrumbs,
			DayForecast,
  	},

		data() {
			return {
				card: {},
			}
		},

		methods: {
			async fetchWeather(name) {
				try {
					const res = await weatherLoader(name);
					this.card = res.data
					this.card.forecast.forecastday.forEach(day => {
						day.hour.forEach(field => {
							field.time = field.time.split('').slice(11).join('')
							field.temp_c = Math.round(field.temp_c)
						})
					})
					console.log(this.card)
				} catch(e) {
					console.log(e)
				}
    	},

		},

	}
</script>

<style lang="sass" scoped>

</style>