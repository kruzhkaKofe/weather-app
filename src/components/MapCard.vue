<template>
  <div class="map" id="map"></div>
</template>

<script setup>
import { watch, isRef, toRefs, toRef } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const lat = toRef(props.card.location.lat);
const lon = toRef(props.card.location.lon);

function init() {
  const myMap = new ymaps.Map("map", {
    center: [lat._object, lon._object],
    zoom: 9,
  });

  const marker = new ymaps.Placemark(
    [lat._object, lon._object],
    {},
    { preset: "islands#redDotIcon" }
  );

  myMap.geoObjects.add(marker);
}

ymaps.ready(init);

watch(
  lat,
  (lat, prevLat) => {
    // ymaps.ready(init);
    console.log(lat);
  },
  { deep: true }
);
</script>

<style lang="sass" scoped>
.map
	width: 700px
	height: 450px
	border-radius: $default
	overflow: hidden
</style>
