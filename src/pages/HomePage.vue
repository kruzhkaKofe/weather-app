<template>
  <div class="inner-wrapper--wide">
    <div class="inner-wrapper">
      <my-header @findWeatherInCity="fetchWeather" />
    </div>
  </div>
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
      <div class="some-cards__div">some content...</div>
    </div>
    <day-forecast :card="card" />
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import NavBreadcrumbs from "@/components/NavBreadcrumbs";
import FactsCard from "@/components/FactsCard";
import CurrentCard from "@/components/CurrentCard";
import MapCard from "@/components/MapCard";
import DayForecastCarousel from "@/components/DayForecastCarousel";
import SunCard from "@/components/SunCard";
import DayForecast from "@/components/DayForecast";
import { loadWeather } from "@/plugins/api.js";
import { averageWindSpeed } from "@/plugins/naturalCondition";
import { ref } from "vue";

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

  setup() {
    const card = ref({});

    const fetchWeather = async (name) => {
      try {
        const res = await loadWeather(name);
        card.value = res.data;
        card.value.forecast.forecastday.forEach((day) => {
          day.hour.forEach((field) => {
            field.time = field.time.split("").slice(11).join("");
            field.temp_c = Math.round(field.temp_c);
          });
        });
        console.log(card.value);
      } catch (e) {
        console.log(e);
      }
    };

    function minTemp(dayNum) {
      const minT = Math.round(
        card.value.forecast.forecastday[dayNum].day.mintemp_c
      );
      return minT > 0 ? `+${minT}` : `${minT}`;
    }

    function maxTemp(dayNum) {
      let maxT = Math.round(
        card.value.forecast.forecastday[dayNum].day.maxtemp_c
      );
      return maxT > 0 ? `+${maxT}` : `${maxT}`;
    }

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

    return {
      card,
      fetchWeather,
      facts,
    };
  },
};
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
