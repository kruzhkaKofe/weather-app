<template>
	<div class="inner-wrapper--wide">
		<div class="inner-wrapper">
			<my-header @findWeatherInCity="fetchWeather"/>
		</div>
	</div>
  <div 
    v-if="card.forecast"
    class="inner-wrapper"
  >
    <nav-breadcrumbs :card="card"/>
    <div class="card-wrapper">
      <facts-card
        v-for="(n, idx) in 2"
        :key="idx"
      >
        {{ facts(n) }}
      </facts-card>
		  <current-card 
			  :card="card"
			  :hours="hours"
		  />
		  <!-- <map-card :card="card"/> -->
    </div>
    <day-forecast-carousel
      :days="days"
    />
    <div class="some-cards">
      <sun-card 
        :card="card"
      />
      <div class="some-cards__div">
        some content...
      </div>
    </div>
    <day-forecast 
      :days="days"
    />
  </div>
</template>

<script>
import MyHeader from '@/components/MyHeader';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';
import FactsCard from '@/components/FactsCard'
import CurrentCard from '@/components/CurrentCard'
import MapCard from '@/components/MapCard'
import DayForecastCarousel from '@/components/DayForecastCarousel';
import SunCard from '@/components/SunCard';
import DayForecast from '@/components/DayForecast';
import { weatherLoader } from '@/plugins/api.js'

export default {
  components: {
    MyHeader,
    NavBreadcrumbs,
    FactsCard,
    CurrentCard,
    MapCard,
    DayForecastCarousel,
    SunCard,
    DayForecast,
  },

  data() {
    return {
      card: {},
      hours: [],
      days: [],
    }
  },

  methods: {  
    async fetchWeather(name)  {
      try {
        const res = await weatherLoader(name);
        this.card = res.data
        this.days = this.card.forecast.forecastday
        this.days.forEach(day => {
          day.hour.forEach(field => {
            field.time = field.time.split('').slice(11).join('')
            field.temp_c = Math.round(field.temp_c)
          })
        })
        this.hours = this.card.forecast.forecastday[0].hour
        console.log(this.card)
      } catch(e) {
        console.log(e)
      }
    },

    minTemp(dayNum) {
      const minT = Math.round(this.card.forecast.forecastday[dayNum].day.mintemp_c)
      return minT > 0 ? `+${minT}` : `${minT}`
    }, 

     maxTemp(dayNum) {
      let maxT = Math.round(this.card.forecast.forecastday[dayNum].day.maxtemp_c)
      return maxT > 0 ? `+${maxT}` : `${maxT}`
    },

    windSpeed(dayNum) {
      let myArr = []
      const windArr = this.card.forecast.forecastday[dayNum].hour
      windArr.forEach(f => {
        myArr.push(Math.floor(f.wind_kph))
      })
      myArr.sort((a, b) => a - b).splice(1, 22)
      return `${myArr[0]} - ${myArr[1]}`
    },

    facts(dayNum) {
      const min = this.minTemp(dayNum)
      const max = this.maxTemp(dayNum)
      const wind = this.windSpeed(dayNum)
      return  dayNum === 0 
        ? `Сегодня: ${min}...${max}°; ветер ${wind} м/с;`
        : `Завтра: ${min}...${max}°; ветер ${wind} м/с;`
    }

  },

}
</script>

<style lang="sass" scoped>
@import "@/styles/variables.sass"

.inner-wrapper
  max-width: 1440px
  width: 100%

  &--wide
    display: flex
    justify-content: center
    width: 100%
    background: $main

.card-wrapper
  display: flex
  justify-content: space-between
  flex-wrap: wrap

.some-cards
  display: flex
  justify-content: space-between
  height: 360px
  margin-bottom: 40px

  &__div
    background-color: $main
    min-height: 300px
    height: 360px
    width: 860px
    border-radius: $default
    display: flex
    align-items: center
    justify-content: center
    font-size: $medium

.secondary-text
  opacity: 0.7

</style>