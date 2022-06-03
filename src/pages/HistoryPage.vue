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
      <!-- <current-card
        :card="card"
        :hours="hours"
      /> -->
    </div>
	</div>
</template>

<script>
import axios from 'axios';
import MyHeader from '@/components/MyHeader';
import NavBreadcrumbs from '@/components/NavBreadcrumbs';
import CurrentCard from '@/components/CurrentCard'
import MyCalendar from '@/components/MyCalendar'
import MapCard from '@/components/MapCard'

	export default {
		components: {
    MyHeader,
		NavBreadcrumbs,
		CurrentCard,
		MyCalendar,
    MapCard,
  },

	data() {
    return {
      dateValue: '',
      card: {
        current: {
          condition: {
          }
        },
        location: {
          name: '',
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
      hours: [],
      days: [],
    }
  },

  methods: {  
    async fetchWeather(card) {
      this.card = card
      this.hours = []
      try {
        const res = await axios({
          methods: 'GET',
          url: 'http://api.weatherapi.com/v1/forecast.json',
          params: {
            key: 'e7048f0fbd8c4cb8853125913221403',
            q: this.card.location.name,
            lang: 'ru',

          }
        })
        console.log(res)
        this.card = res.data
        this.hours = this.card.forecast.forecastday[0].hour
        for (let i = 0; i < this.hours.length; i++) {
          this.hours[i].time = this.hours[i].time.split('').slice(11).join('')
          this.hours[i].temp_c = Math.round(this.hours[i].temp_c)
        }
      } catch(e) {
        console.log(e)
      }
    },
    
    async fetchHistory(dateValue) {
      this.dateValue = dateValue
      this.hours = []
      try {
        const res  = await axios ({
          methods: 'GET',
          url: 'http://api.weatherapi.com/v1/history.json',
          params: {
            key: 'e7048f0fbd8c4cb8853125913221403',
            q: this.card.location.name,
            lang: 'ru',
            dt: this.dateValue,
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