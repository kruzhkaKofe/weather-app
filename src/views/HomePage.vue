<template>
  <div class="inner-wrapper--wide">
    <div class="inner-wrapper">
      <my-header @findWeatherInCity="fetchWeather" />
    </div>
  </div>
  <error-catcher :error="error" />
  <div v-if="card.location" class="inner-wrapper">
    <nav-breadcrumbs :card="card" />
    <div class="card-wrapper">
      <facts-card v-for="(n, idx) in 2" :key="idx">
        {{ facts(n) }}
      </facts-card>
      <current-card :card="card" />
      <map-card :card="card" />
    </div>
    <day-forecast-carousel :card="card" />
    <div class="some-cards">
      <sun-card :card="card" />
      <div class="some-cards__div">Какой-то контент...</div>
    </div>
    <day-forecast :card="card" />
  </div>
</template>

<script setup>
import MyHeader from "@/components/MyHeader";
import NavBreadcrumbs from "@/components/NavBreadcrumbs";
import FactsCard from "@/components/FactsCard";
import CurrentCard from "@/components/CurrentCard";
import MapCard from "@/components/MapCard";
import DayForecastCarousel from "@/components/DayForecastCarousel";
import SunCard from "@/components/SunCard";
import DayForecast from "@/components/DayForecast";
import ErrorCatcher from "@/components/ErrorCatcher";
import { loadWeather } from "@/plugins/api.js";
import {
  averageWindSpeed,
  formatedTemperature,
} from "@/plugins/naturalCondition";
import { ref } from "vue";

const card = ref({});
const error = ref(false);

const fetchWeather = async (name) => {
  try {
    error.value = false;
    const res = await loadWeather(name);
    card.value = res.data;
    card.value.forecast.forecastday.forEach((day) => {
      day.hour.forEach((field) => {
        field.time = field.time.split("").slice(11).join("");
        field.temp_c = Math.round(field.temp_c);
      });
    });
    console.log(card.value);
  } catch {
    error.value = true;
    card.value = {};
  }
};

const minTemp = (dayNum) => {
  return formatedTemperature(
    card.value.forecast.forecastday[dayNum].day.mintemp_c
  );
};

const maxTemp = (dayNum) => {
  return formatedTemperature(
    card.value.forecast.forecastday[dayNum].day.maxtemp_c
  );
};

function avgWindSpeed(dayNum) {
  return averageWindSpeed(card.value.forecast.forecastday[dayNum].hour);
}

function facts(dayNum) {
  const min = minTemp(dayNum);
  const max = maxTemp(dayNum);
  const wind = avgWindSpeed(dayNum);
  return dayNum === 0
    ? `Сегодня: ${min}...${max}°; ветер ${wind} м/с;`
    : `Завтра: ${min}...${max}°; ветер ${wind} м/с;`;
}
</script>

<style lang="sass" scoped>

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
