<template>
	<swiper
	 	class="carousel"
	 	:slidesPerView="8"
		:spaceBetween="0"
		:navigation="true" 
		:modules="modules"
	>
		<swiper-slide 
			class="carousel-slide" 
			v-for="(hour, i) of hours" 
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
	</swiper>

	<!-- <button @click="hourTime">testSlider</button> -->
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

		data() {
			return {
				modules: [Navigation],
			}
		},

		props: {
      hours: {
				type: Array,
				required: true
			}
    },

	}
</script>

<style lang="sass" scoped>
@import "@/styles/variables.sass"

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