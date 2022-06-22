<template>
  <div class="inner-wrapper--wide">
    <div class="inner-wrapper">
      <my-header @findWeatherInCity="fetchWeather" />
    </div>
  </div>
  <div class="inner-wrapper">
    <nav-breadcrumbs :card="card" />
    <day-forecast :card="card" />
  </div>
</template>

<script setup>
import MyHeader from "@/components/MyHeader";
import NavBreadcrumbs from "@/components/NavBreadcrumbs";
import DayForecast from "@/components/DayForecast";
import { loadWeather } from "@/plugins/api.js";
import { ref } from 'vue';

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
  }
</script>

<style lang="sass" scoped></style>
