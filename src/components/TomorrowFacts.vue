<template>
	<div 
		v-if="card.forecast"
		class="tomorrow-card">
		Завтра: {{ minTemp }}...{{ maxTemp }}°; ветер {{ tomorrowWindSpeed }} м/с;
	</div>
</template>

<script>
	export default {
		props: {
			card: {
				type: Object,
				required: true
			}
		},

		computed: {
			minTemp() {
				const minT = Math.round(this.card.forecast.forecastday[1].day.mintemp_c)
				return minT > 0 ? '+' + minT : minT
			},

			maxTemp() {
				const maxT = Math.round(this.card.forecast.forecastday[1].day.maxtemp_c)
				return maxT > 0 ? '+' + maxT : maxT
			},

			tomorrowWindSpeed() {
				let myArr = []
				const windArr  = this.card.forecast.forecastday[1].hour
				for (let i = 0; i < windArr.length; i++) {
					myArr.push(Math.floor(windArr[i].wind_kph))
				}
				myArr.sort((a, b) => a - b).splice(1, 22)
				return `${myArr[0]} - ${myArr[1]}`
			}
		}
	}
</script>

<style lang="sass" scoped>
@import "@/styles/variables.sass"

.tomorrow-card
	width: 700px
	height: 50px
	padding: 10px 30px
	background-color: $main
	font-size: $small
	border-radius: $default
	margin-bottom: 20px
	display: flex
	align-items: center

</style>