<template>
  <div v-if="card.forecast" class="card">
    <div class="card__location">
      <h1 class="card__location-name main-text">{{ card.location.name }}</h1>
      <time :datetime="dateSelected" class="card__location-time secondary-text"
        >Дата: {{ dateSelected }}</time
      >
    </div>
    <div class="card__history">
      <p class="card__history-temp main-text">
        от {{ minTemp }}° до {{ maxTemp }}°
      </p>
      <img
        class="card__history-img"
        :src="card.forecast.forecastday[0].day.condition.icon"
        alt="condition"
      />
      <div class="card__condition">
        <p>{{ card.forecast.forecastday[0].day.condition.text }}</p>
      </div>
    </div>
    <div class="card__facts">
      <div class="card__facts-item">
        <img
          class="card__facts-image"
          src="data:image/svg+xml;charset=utf-8,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22%3E %3Cg fill=%22%23FFF%22 fill-rule=%22nonzero%22%3E %3Cpath d=%22M6 11.5h5.688a3.75 3.75 0 1 0-1.95-6.954.75.75 0 0 0 .781 1.28A2.25 2.25 0 1 1 11.688 10L6 10.001a.75.75 0 1 0 0 1.5zM2 15h9.966a1.5 1.5 0 1 1-.779 2.782.75.75 0 0 0-.78 1.281 3 3 0 1 0 1.56-5.563H1.999A.75.75 0 1 0 2 15zM16.667 13h2.251a3 3 0 1 0-1.56-5.563.75.75 0 0 0 .781 1.28 1.5 1.5 0 1 1 .779 2.782l-2.251.001a.75.75 0 1 0 0 1.5z%22/%3E %3C/g%3E %3C/svg%3E"
          alt="wind"
        />
        <p class="card__facts-wind">до {{ maxWindSpeed }} м/c</p>
      </div>
      <div class="card__facts-item">
        <img
          class="card__facts-image"
          src="data:image/svg+xml;charset=utf-8,%3Csvg width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E %3Cg%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M17.5487 8.0001C16.7829 6.74175 15.1271 4.67011 12.5637 1.75476C12.2645 1.41448 11.7342 1.41518 11.4359 1.75625C8.88065 4.67783 7.22597 6.74805 6.45489 7.99571C3.91532 12.1049 3.72409 15.9389 6.56528 18.751C9.63862 21.793 14.3621 21.792 17.4355 18.7512C20.2743 15.9425 20.0858 12.169 17.5487 8.0001ZM7.73087 8.78429C8.39019 7.71747 9.8183 5.91206 12.0019 3.39071C14.1889 5.90415 15.6153 7.70851 16.2673 8.77991C18.4829 12.4205 18.6344 15.4548 16.3805 17.6849C13.8915 20.1475 10.1092 20.1483 7.62047 17.685C5.36463 15.4522 5.51867 12.3638 7.73087 8.78429Z%22 fill=%22white%22/%3E %3Cpath d=%22M12.7366 17.2967C14.3588 16.7579 15.4749 15.2362 15.4749 13.5C15.4749 13.0858 15.1391 12.75 14.7249 12.75C14.3107 12.75 13.9749 13.0858 13.9749 13.5C13.9749 14.5852 13.277 15.5366 12.2638 15.8732C11.8707 16.0038 11.6579 16.4283 11.7884 16.8214C11.919 17.2145 12.3436 17.4273 12.7366 17.2967Z%22 fill=%22white%22/%3E %3C/g%3E %3C/svg%3E"
          alt="drop"
        />
        <p>{{ card.forecast.forecastday[0].day.avghumidity }}%</p>
      </div>
      <div class="card__facts-item">
        <img
          class="card__facts-image"
          src="data:image/svg+xml;charset=utf-8,%3Csvg width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22 fill=%22none%22 xmlns=%22http://www.w3.org/2000/svg%22%3E %3Cg%3E %3Cpath d=%22M14.1314 2.22778C14.5361 2.31569 14.793 2.71509 14.7051 3.11986C14.6172 3.52464 14.2178 3.78152 13.813 3.69362C13.2222 3.56532 12.6156 3.5 12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 16.6944 7.30558 20.5 12 20.5C16.6944 20.5 20.5 16.6944 20.5 12C20.5 11.4103 20.4401 10.8289 20.3222 10.2616C20.238 9.85608 20.4985 9.45902 20.904 9.37478C21.3096 9.29054 21.7067 9.55101 21.7909 9.95657C21.9295 10.624 22 11.3077 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.7228 2 13.4361 2.07681 14.1314 2.22778Z%22 fill=%22white%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M13.348 10.6533C13.6409 10.9461 14.1158 10.946 14.4086 10.6531L18.0304 7.03025C18.3233 6.73732 18.3232 6.26244 18.0303 5.96959C17.7373 5.67674 17.2624 5.67681 16.9696 5.96975L13.3478 9.59259C13.055 9.88553 13.055 10.3604 13.348 10.6533ZM8.21961 15.7803C8.51248 16.0732 8.98735 16.0732 9.28028 15.7804L10.5308 14.5301C10.8237 14.2373 10.8238 13.7624 10.5309 13.4695C10.238 13.1766 9.76315 13.1765 9.47023 13.4694L8.21972 14.7196C7.9268 15.0125 7.92675 15.4874 8.21961 15.7803Z%22 fill=%22white%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M14.75 5.75C14.75 5.33579 15.0858 5 15.5 5H18.25C18.6642 5 19 5.33579 19 5.75C19 6.16421 18.6642 6.5 18.25 6.5H15.5C15.0858 6.5 14.75 6.16421 14.75 5.75Z%22 fill=%22white%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M17.5 5.75C17.5 5.33579 17.8358 5 18.25 5C18.6642 5 19 5.33579 19 5.75V8.5C19 8.91421 18.6642 9.25 18.25 9.25C17.8358 9.25 17.5 8.91421 17.5 8.5V5.75Z%22 fill=%22white%22/%3E %3Cpath fill-rule=%22evenodd%22 clip-rule=%22evenodd%22 d=%22M9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12ZM13.5 12C13.5 12.8284 12.8284 13.5 12 13.5C11.1716 13.5 10.5 12.8284 10.5 12C10.5 11.1716 11.1716 10.5 12 10.5C12.8284 10.5 13.5 11.1716 13.5 12Z%22 fill=%22white%22/%3E %3C/g%3E %3C/svg%3E"
          alt="compass"
        />
        <p>до {{ card.forecast.forecastday[0].day.totalprecip_mm }} мм</p>
      </div>
    </div>
    <div class="card__line"></div>
    <hour-forecast-carousel :card="card" />
  </div>
</template>

<script setup>
import HourForecastCarousel from "@/components/HourForecastCarousel";
import {
  formatedTemperature,
  windSpeedFormated,
} from "@/plugins/naturalCondition";
import { computed } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const maxTemp = computed(() =>
  formatedTemperature(props.card.forecast.forecastday[0].day.maxtemp_c)
);
const minTemp = computed(() =>
  formatedTemperature(props.card.forecast.forecastday[0].day.mintemp_c)
);
const maxWindSpeed = computed(() =>
  windSpeedFormated(props.card.forecast.forecastday[0].day.maxwind_kph)
);
const dateSelected = computed(() => {
  const year = new Date(props.card.forecast.forecastday[0].date).getFullYear();
  const month = (
    new Date(props.card.forecast.forecastday[0].date).getMonth() + 1
  )
    .toString()
    .padStart(2, "0");
  const date = new Date(props.card.forecast.forecastday[0].date)
    .getDate()
    .toString()
    .padStart(2, "0");
  return `${date}.${month}.${year}`;
});
</script>

<style lang="sass" scoped>

.main-text
	font-size: $medium
	font-weight: bold

.card
	width: 700px
	height: 450px
	padding: 30px
	font-size: $small
	border-radius: $default
	background-color: $main

	&__history
		display: flex
		align-items: center
		margin-bottom: 25px

		&-img
			@include condition-icon
			margin-left: 15px
			margin-right: 15px

	&__condition
		max-width: 280px
		text-align: center

	&__facts
		display: flex
		justify-content: space-between
		width: 400px
		margin-bottom: 30px

		&-item
			display: flex
			justify-content: center
			align-items: center

		&-image
			@include facts-icon
			margin-right: 5px

		&-wind
			display: flex
			align-items: center

	&__line
		width: 100%
		height: 2px
		background-color: rgba(0, 0, 0, 0.2)
		margin-bottom: 20px
</style>
