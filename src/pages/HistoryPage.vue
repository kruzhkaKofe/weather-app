<template>
  <div class="inner-wrapper--wide">
    <div class="inner-wrapper">
      <my-header @findWeatherInCity="fetchHistory" />
    </div>
  </div>
  <div class="inner-wrapper">
    <nav-breadcrumbs :card="card" />
    <div class="card-wrapper">
      <my-calendar :card="card" @fetchHistoryOfWeather="fetchHistory" />
      <history-card :card="card" />
    </div>
  </div>
</template>

<script>
import MyHeader from "@/components/MyHeader";
import NavBreadcrumbs from "@/components/NavBreadcrumbs";
import MyCalendar from "@/components/MyCalendar";
import HistoryCard from "@/components/HistoryCard";
import { loadHistory } from "@/plugins/api.js";

export default {
  components: {
    MyHeader,
    NavBreadcrumbs,
    MyCalendar,
    HistoryCard,
  },

  data() {
    return {
      card: {},
    };
  },

  methods: {
    async fetchHistory(name, date) {
      try {
        const res = await loadHistory(name, date);
        this.card = res.data;
        this.card.forecast.forecastday[0].hour.forEach((h) => {
          h.time = h.time.split("").slice(11).join("");
          h.temp_c = Math.round(h.temp_c);
        });
        console.log(this.card);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style lang="sass" scoped>
.card-wrapper
  display: flex
  justify-content: space-between
  flex-wrap: wrap
</style>
