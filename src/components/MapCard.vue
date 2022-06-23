<template>
  <div class="map" id="map"></div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const lat = props.card.location.lat;
const lon = props.card.location.lon;

function init() {
  const myMap = new ymaps.Map("map", {
    center: [lat, lon],
    zoom: 9,
  });

  const marker = new ymaps.Placemark(
    [lat, lon],
    {},
    { preset: "islands#redDotIcon" }
  );

  myMap.geoObjects.add(marker);
}

ymaps.ready(init);

</script>

<style lang="sass" scoped>
.map
	width: 700px
	height: 450px
	border-radius: $default
	border: solid $main 3px
	overflow: hidden
</style>
