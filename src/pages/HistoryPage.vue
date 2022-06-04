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
    <div class="card-wrapper">
      <my-calendar
        :card="card"
        @fetchHistoryOfWeather="fetchHistory"
      />
      <history-card
        :card="card"
        :hours="hours"
      />
    </div>
	</div>
</template>

<script>
import axios from 'axios';
import MyHeader from '@/components/MyHeader';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';
import MyCalendar from '@/components/MyCalendar'
import HistoryCard from '@/components/HistoryCard'

	export default {
		components: {
    MyHeader,
		NavBreadcrumbs,
		MyCalendar,
		HistoryCard,
  },

	data() {
    return {
      dateValue: '',
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

    async fetchHistory(dateValue) {
      try {
        const res  = await axios ({
          methods: 'GET',
          url: 'http://api.weatherapi.com/v1/history.json',
          params: {
            key: 'e7048f0fbd8c4cb8853125913221403',
            q: this.card.location.name,
            lang: 'ru',
            dt: dateValue,
          }
        })
        this.card = res.data
        this.hours = this.card.forecast.forecastday[0].hour
        for (let i = 0; i < this.hours.length; i++) {
          this.hours[i].time = this.hours[i].time.split('').slice(11).join('')
          this.hours[i].temp_c = Math.round(this.hours[i].temp_c)
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
@import "@/styles/variables.sass"

.card-wrapper
  display: flex
  justify-content: space-between
  flex-wrap: wrap

</style>