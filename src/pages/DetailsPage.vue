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
      :days="days"
    />
	</div>
</template>

<script>
import axios from 'axios';
import MyHeader from '@/components/MyHeader'
import NavBreadcrumbs from '@/components/NavBreadcrumbs'
import DayForecast from '@/components/DayForecast'

	export default {
		components: {
			MyHeader,
			NavBreadcrumbs,
			DayForecast,
  	},

		data() {
			return {
				card: {},
				days: [],
			}
		},

		methods: {
			async fetchWeather(name) {
				try {
					const res = await axios({
						methods: 'GET',
						url: 'http://api.weatherapi.com/v1/forecast.json',
						params: {
							key: 'e7048f0fbd8c4cb8853125913221403',
							q: name,
							lang: 'ru',
							days: '3',
						}
					})
					this.card = res.data
					this.days = this.card.forecast.forecastday
					for (let i = 0; i < this.days.length; i++) {
						for (let j = 0; j < this.days[i].hour.length; j++) {
							this.days[i].hour[j].time = this.days[i].hour[j].time.split('').slice(11).join('')
							this.days[i].hour[j].temp_c = Math.round(this.days[i].hour[j].temp_c)
						}
					}
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