<template>
	<div class="inner-wrapper--wide">
		<div class="inner-wrapper">
			<my-header @findWeatherInCity="fetchWeather"/>
		</div>
	</div>
  <div class="inner-wrapper">
    <nav-breadcrumbs :card="card"/>
    <div class="card-wrapper">
      <today-facts :card="card"/>
		  <tomorrow-facts :card="card"/>
      <!-- <facts-card 
        :days="days"
      /> -->
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
import TodayFacts from '@/components/TodayFacts'
import TomorrowFacts from '@/components/TomorrowFacts'
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
		TodayFacts,
		TomorrowFacts,
    FactsCard
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

  mounted() {
    this.fetchWeather('Izhevsk')
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