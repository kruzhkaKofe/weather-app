<template>
  <form @submit.prevent>
    <input v-model="name" type="text" placeholder="Название города (eng)..." />
    <button @click="findWeather">Найти</button>
  </form>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup(_, { emit }) {
    const name = ref("");
    const date = ref("");

    const currentDate = () => {
      const year = new Date().getFullYear();
      const month = (new Date().getMonth() + 1).toString().padStart(2, "0");
      const date = new Date().getDate().toString().padStart(2, "0");
      return `${date}.${month}.${year}`;
    };

    const findWeather = () => {
      emit("findWeatherInCity", name.value, date.value);
      name.value = "";
    };

    onMounted(() => {
      name.value = "Izhevsk";
      date.value = currentDate();
      findWeather();
    });

    return {
      name,
      findWeather,
    };
  },
};
</script>

<style lang="sass" scoped>

input
	padding: 5px 15px
	font-size: $small
	background: white
	border: none
	border-right: 1px solid rgba(0, 0, 0, 0.8)
	opacity: 0.7
	border-radius: 5px 0 0 5px

button
	padding: 5px 15px
	font-size: $small
	border: none
	background: white
	opacity: 0.7
	border-radius: 0 5px 5px 0
	cursor: pointer
</style>
