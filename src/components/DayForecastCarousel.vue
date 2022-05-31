<template>
	<div class="day-forecast">
		<h2 class="day-forecast__header">Прогноз на {{ this.days.length }} дня</h2>	
		<swiper
			class="day-carousel"
			:slidesPerView="2"
			:spaceBetween="80"
			:navigation="true" 
			:modules="modules"
		>
			<swiper-slide
				class="day-carousel-slide" 
				v-for="(day, i) in days" 
				:key="i" 
			>
				<div class="day-carousel-slide__date">
					<p class="day-carousel-slide__date-num">{{ dateOfDay(day) }}</p> 
					<p class="forecast-date-month">{{ monthOfDay(day) }}</p>
					<p class="day-carousel-slide__date-day">{{ dayOfDay(day) }}</p>
				</div>
				<div class="day-carousel-slide__main">
					<div class="day-carousel-slide__average">
						<p  
							v-if="day.day.avgtemp_c > 0" 
							class="day-carousel-slide__average-temp"
						>
							+{{ averageTemp(day) }}
						</p>
						<p 
							v-else 
							class="day-carousel-slide__average-temp"
						>
							{{ averageTemp(day) }}
						</p>
						<img class="day-carousel-slide__average-img" :src="day.day.condition.icon" alt="crrnt-img">
						<div class="day-carousel-slide__condition">
							<p>{{ day.day.condition.text }}</p>
							<p
								v-if="day.day.mintemp_c > 0"
								class="day-carousel-slide__condition-feelslike secondary-text"
							>
								Минимум: +{{ minTemp(day) }}
							</p>
							<p
								v-else
								class="day-carousel-slide__condition-feelslike secondary-text"
							>
								Минимум: {{ minTemp(day) }}
							</p>
						</div>
					</div>
					<div class="day-carousel-slide__facts">
						<div class="day-carousel-slide__facts-item">
							<img class="day-carousel-slide__facts-image" src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22%3E %3Cg fill=%22%23FFF%22 fill-rule=%22nonzero%22%3E %3Cpath d=%22M6 11.5h5.688a3.75 3.75 0 1 0-1.95-6.954.75.75 0 0 0 .781 1.28A2.25 2.25 0 1 1 11.688 10L6 10.001a.75.75 0 1 0 0 1.5zM2 15h9.966a1.5 1.5 0 1 1-.779 2.782.75.75 0 0 0-.78 1.281 3 3 0 1 0 1.56-5.563H1.999A.75.75 0 1 0 2 15zM16.667 13h2.251a3 3 0 1 0-1.56-5.563.75.75 0 0 0 .781 1.28 1.5 1.5 0 1 1 .779 2.782l-2.251.001a.75.75 0 1 0 0 1.5z%22/%3E %3C/g%3E %3C/svg%3E" alt="wind">
							<p>до {{ windSpeed(day) }} м/с </p>
						</div>
						<div class="day-carousel-slide__facts-item">
							<img class="day-carousel-slide__facts-image" src="data:image/svg+xml;charset=utf-8,%3Csvg width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E %3Cg%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M17.5487 8.0001C16.7829 6.74175 15.1271 4.67011 12.5637 1.75476C12.2645 1.41448 11.7342 1.41518 11.4359 1.75625C8.88065 4.67783 7.22597 6.74805 6.45489 7.99571C3.91532 12.1049 3.72409 15.9389 6.56528 18.751C9.63862 21.793 14.3621 21.792 17.4355 18.7512C20.2743 15.9425 20.0858 12.169 17.5487 8.0001ZM7.73087 8.78429C8.39019 7.71747 9.8183 5.91206 12.0019 3.39071C14.1889 5.90415 15.6153 7.70851 16.2673 8.77991C18.4829 12.4205 18.6344 15.4548 16.3805 17.6849C13.8915 20.1475 10.1092 20.1483 7.62047 17.685C5.36463 15.4522 5.51867 12.3638 7.73087 8.78429Z%22 fill=%22white%22/%3E %3Cpath d=%22M12.7366 17.2967C14.3588 16.7579 15.4749 15.2362 15.4749 13.5C15.4749 13.0858 15.1391 12.75 14.7249 12.75C14.3107 12.75 13.9749 13.0858 13.9749 13.5C13.9749 14.5852 13.277 15.5366 12.2638 15.8732C11.8707 16.0038 11.6579 16.4283 11.7884 16.8214C11.919 17.2145 12.3436 17.4273 12.7366 17.2967Z%22 fill=%22white%22/%3E %3C/g%3E %3C/svg%3E" alt="drop">
							<p>ср. {{ day.day.avghumidity }}%</p>
						</div>
						<div class="day-carousel-slide__facts-item">
							<img class="day-carousel-slide__facts-image" src="@/assets/icons/umbrella.png" alt="осадки">
							<p class="precip">{{ day.day.totalprecip_mm }} мм</p>
						</div>
					</div>
				</div>
			</swiper-slide>
		</swiper>
	</div>
	
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation } from "swiper";
import 'swiper/scss';
import "swiper/scss/navigation";

	export default {
		components: {
			Swiper,
			SwiperSlide,
		},

		setup() {
			return {
				modules: [Navigation],
			};
  	},

		props: {
			days: {
				type: Array,
				required: true
			}
		},

		methods: {
			dateOfDay(day) {
				return new Date(day.date).getDate()
			},

			dayOfDay(day) {
				const week = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']
				const numOfDay =  new Date(day.date).getDay()
				let now = new Date 
				if (now.getDay() === numOfDay) {
					return 'сегодня'
				}
				return week[numOfDay]
			}, 

			monthOfDay(day) {
				const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']
				const numOfMonth =  new Date(day.date).getMonth()
				return month[numOfMonth]
			},

			windSpeed(day) {
        return (day.day.maxwind_kph * 1000 / 3600).toFixed(1)
      },

      pressureMercury(day){
        return Math.round(day.day.pressure_mb * 0.75006156)
      },

      averageTemp(day){ 
        return Math.round(day.day.avgtemp_c)
      },

      minTemp(day){ 
        return Math.round(day.day.mintemp_c)
      },

		},

	}
</script>

<style lang="sass" scoped>
@import "@/styles/variables.sass"

.day-forecast
	height: 350px
	margin-top: 40px
	margin-bottom: 40px
	border-radius: $default
	background-color: $main
	padding: 20px 20px

	&__header
		margin-left: 10px
		font-size: $medium

.day-carousel
	height: 280px
	padding-top: 20px	
	padding-bottom: 20px

	&-slide
		display: flex
		padding-top: 10px
		padding-bottom: 10px
		font-size: $small
		margin-left: 10px
		margin-right: 10px
		border-radius: $default

		&:hover
			box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px
			cursor: pointer

		&__date
			display: flex
			height: 100%
			border-right: 2px solid rgba(0, 0, 0, 0.2)
			flex-direction: column
			justify-content: center
			align-items: center
			padding: 20px

			&-num
				font-weight: bold
				font-size: $medium

		&__main
			height: 100%
			display: flex
			flex-direction: column
			align-items: center
			justify-content: center
			padding-left: 50px

		&__location

		&__average
			display: flex
			align-items: center
			margin-bottom: 25px

			&-temp
				font-size: $large
				font-weight: bold

				&::after
					content: '\00B0'

			&-img
				@include condition-icon
				margin-left: 15px
				margin-right: 15px

		&__condition

			&-feelslike::after
				content: '\00B0'

		&__facts
			display: flex
			justify-content: space-between
			width: 400px

			&-item 
				display: flex
				justify-content: center
				align-items: center

			&-image 
				@include facts-icon
				margin-right: 5px

</style>