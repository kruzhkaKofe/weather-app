<template>
  <div class="inner-wrapper--wide">
    <div class="inner-wrapper">
      <my-header @findWeatherInCity="fetchHistory"/>
    </div>
  </div>
  <div class="inner-wrapper">
    <nav-breadcrumbs :card="card" />
    <div class="card-wrapper">
      <my-calendar :card="card" @fetchHistoryOfWeather="fetchHistory"/>
      <history-card :card="card" />
    </div>
  </div>
</template>

<script setup>
import MyHeader from "@/components/MyHeader";
import NavBreadcrumbs from "@/components/NavBreadcrumbs";
import MyCalendar from "@/components/MyCalendar";
import HistoryCard from "@/components/HistoryCard";
import { loadHistory } from "@/plugins/api.js";
import { ref } from 'vue';

  const card = ref({})

  const fetchHistory = async (name, date) => {
    try {
      const res = await loadHistory(name, date);
      card.value = res.data;
      card.value.forecast.forecastday[0].hour.forEach((h) => {
        h.time = h.time.split("").slice(11).join("");
        h.temp_c = Math.round(h.temp_c);
      });
      console.log(card.value);
    } catch (e) {
      console.log(e);
    }
  }
</script>

<style lang="sass" scoped>
.card-wrapper
  display: flex
  justify-content: space-between
  flex-wrap: wrap
</style>
