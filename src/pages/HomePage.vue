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
      <facts-card>Сегодня: {{ minTempToday }}...{{ maxTempToday }}°; ветер {{ todayWindSpeed }} м/с;</facts-card>
      <facts-card>Завтра: {{ minTempTomorrow }}...{{ maxTempTomorrow }}°; ветер {{ tomorrowWindSpeed }} м/с;</facts-card>
		  <current-card 
			  :card="card"
			  :hours="hours"
		  />
		  <map-card :card="card"/>
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
import axios from 'axios';
import MyHeader from '@/components/MyHeader';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';
import DayForecastCarousel from '@/components/DayForecastCarousel';
import SunCard from '@/components/SunCard';
import DayForecast from '@/components/DayForecast';
import CurrentCard from '@/components/CurrentCard'
import MapCard from '@/components/MapCard'
import FactsCard from '@/components/FactsCard'

export default {
  components: {
    MyHeader,
    NavBreadcrumbs,
    DayForecastCarousel,
    SunCard,
    DayForecast,
    CurrentCard,
    MapCard,
    FactsCard,
  },

  data() {
    return {
      card: {},
      hours: [],
      days: [],
    }
  },

  methods: {  
    async fetchWeather(name) {
      this.card = {}
      this.hours = []
      this.days = []
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
        this.hours = this.card.forecast.forecastday[0].hour
        console.log(this.card)
      } catch(e) {
        console.log(e)
      }
    },
    
  },

  computed: {
    minTempToday() {
      const minT = Math.round(this.card.forecast.forecastday[0].day.mintemp_c)
      return minT > 0 ? `+${minT}` : `${minT}`
    }, 

    maxTempToday() {
      const maxT = Math.round(this.card.forecast.forecastday[0].day.maxtemp_c)
      return maxT > 0 ? `+${maxT}` : `${maxT}`
    },

    todayWindSpeed() {
      let myArr = []
      const windArr  = this.card.forecast.forecastday[0].hour
      for (let i = 0; i < windArr.length; i++) {
        myArr.push(Math.floor(windArr[i].wind_kph))
      }
      myArr.sort((a, b) => a - b).splice(1, 22)
      return `${myArr[0]} - ${myArr[1]}`
    },

    minTempTomorrow() {
				const minT = Math.round(this.card.forecast.forecastday[1].day.mintemp_c)
				return minT > 0 ? `+${minT}` : `${minT}`
			}, 

    maxTempTomorrow() {
      const maxT = Math.round(this.card.forecast.forecastday[1].day.maxtemp_c)
      return maxT > 0 ? `+${maxT}` : `${maxT}`
    },

    tomorrowWindSpeed() {
      let myArr = []
      const windArr  = this.card.forecast.forecastday[1].hour
      for (let i = 0; i < windArr.length; i++) {
        myArr.push(Math.floor(windArr[i].wind_kph))
      }
      myArr.sort((a, b) => a - b).splice(1, 22)
      return `${myArr[0]} - ${myArr[1]}`
    },
  }

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