<template>
  <div class="inner-wrapper--wide">
    <div class="inner-wrapper">
      <my-header @findWeatherInCity="fetchWeather" />
    </div>
  </div>
  <error-catcher :error="error" />
  <div v-if="card.forecast" class="inner-wrapper">
    <nav-breadcrumbs :card="card" />
    <day-forecast :card="card" />
  </div>
</template>

<script setup>
import ErrorCatcher from "@/components/ErrorCatcher";
import MyHeader from "@/components/MyHeader";
import NavBreadcrumbs from "@/components/NavBreadcrumbs";
import DayForecast from "@/components/DayForecast";
import { loadWeather } from "@/plugins/api.js";
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
</script>

<style lang="sass" scoped></style>
