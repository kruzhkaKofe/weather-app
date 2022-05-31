<template>
	<div class="today-card">
		<div class="today-card__item">Сегодня: {{ minTemp }}...{{ maxTemp }}°; ветер {{ todayWindSpeed }} м/с; </div>
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

		methods: {
			test(card) {
				
			}
		},

		computed: {
			minTemp() {
				const minT = Math.round(this.card.forecast.forecastday[0].day.mintemp_c)
				return minT > 0 ? '+' + minT : minT
			},

			maxTemp() {
				const maxT = Math.round(this.card.forecast.forecastday[0].day.maxtemp_c)
				return maxT > 0 ? '+' + maxT : maxT
			},

			todayWindSpeed() {
				let myArr = []
				const windArr  = this.card.forecast.forecastday[0].hour
				for (let i = 0; i < windArr.length; i++) {
					myArr.push(Math.floor(windArr[i].wind_kph))
				}
				myArr.sort((a, b) => a - b).splice(1, 22)
				return myArr[0] + '-' + myArr[1]
			}

		}
	}
</script>

<style lang="sass" scoped>
@import "@/styles/variables.sass"

.today-card
	width: 700px
	height: 50px
	padding: 10px 30px
	background-color: $main
	font-size: $small
	border-radius: $default
	margin-bottom: 20px
	display: flex
	align-items: center

	&__item
		display: flex
		align-items: center

</style>