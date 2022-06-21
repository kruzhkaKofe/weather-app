<template>
	<swiper
	 	class="carousel"
	 	:slidesPerView="8"
		:spaceBetween="0"
		:modules="modules"
		:navigation="{
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		}"
	>
		<swiper-slide 
			class="carousel-slide" 
			v-for="(hour, i) in card.forecast.forecastday[0].hour" 
			:key="i" 
		>
			<p class="carousel-slide__time secondary-text" >
				{{ hour.time }}
			</p>
			<img 
				class="carousel-slide__image" 
				:src="hour.condition.icon" 
				alt="weather-condition"
			>
			<p 
				v-if="hour.temp_c > 0"
				class="carousel-slide__temp"
			>
				<strong>+{{ hour.temp_c }}</strong>
			</p>
			<p 
				v-else 
				class="carousel-slide__temp"
			>
				<strong>{{ hour.temp_c }}</strong>
			</p>
		</swiper-slide>
		<div class="swiper-button-next"></div>
		<div class="swiper-button-prev"></div>
	</swiper>
</template>

<script>
	import { Swiper, SwiperSlide } from "swiper/vue";
	import { Navigation } from "swiper";
	import 'swiper/css';
	import "swiper/css/navigation";

	export default {
		components: {
			Swiper,
			SwiperSlide,
		},

		props: {
			card: {
				type: Object,
				required: true
			}
    },

		setup() {
			const modules = [Navigation]

			return {
				modules
			}
		},
	}
</script>

<style lang="sass" scoped>

.swiper-button-next,
.swiper-button-prev
	color: black
	background-color: rgba(255, 255, 255, 0.5)
	width: 50px
	height: 50px
	border-radius: 50%

	&::after
		font-size: $medium

.carousel
	height: 150px
	width: 100%

	&-slide
		padding: 10px
		padding-right: 15px
		padding-left: 15px
		display: flex
		flex-direction: column
		align-items: center

		&__image
			@include condition-icon
			margin-top: 10px
			margin-bottom: 10px

		&__temp::after 
			content: '\00B0'
</style>