<template>
  <div v-if="card.location" class="sun-card">
    <div class="sun-card__planet">
      <div class="sun-card__sun-circle"></div>
      <div class="sun-card__earth">
        <div class="sun-card__earth-icon"></div>
      </div>
      <div class="sun-card__moon" :style="orbitRotate">
        <div class="sun-card__moon-icon" :style="moonBackground"></div>
      </div>
    </div>
    <div class="sun-card__info">
      <div class="sun-card__sunrise-sunset">
        <div class="sun-card__sunrise-sunset-icon"></div>
        <div class="sun-card__day-duration">
          <h3 class="sun-card__day-duration-label" aria-label="Световой день">
            Световой день
          </h3>
          <div class="sun-card__day-duration-value">{{ dayLong }}</div>
        </div>
        <div class="sun-card__sunrise-sunset-info-wrapper">
          <div
            class="sun-card__sunrise-sunset-info sun-card__sunrise-sunset-info-rise-time"
          >
            <p>
              <strong>{{ sunrise }}</strong>
            </p>
          </div>
          <div
            class="sun-card__sunrise-sunset-info sun-card__sunrise-sunset-info-set-time"
          >
            <p>
              <strong>{{ sunset }}</strong>
            </p>
          </div>
        </div>
      </div>
      <div class="sun-card__text-info">
        <p class="sun-card__text-info-item">{{ moonPhase }}</p>
        <p class="sun-card__text-info-item">{{ uvIndex }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { moonPhases, indexUV, daylong } from "@/plugins/celestialBody";
import { computed } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const sunrise = computed(
  () =>
    daylong(
      props.card.forecast.forecastday[0].astro.sunrise,
      props.card.forecast.forecastday[0].astro.sunset
    )[0]
);
const sunset = computed(
  () =>
    daylong(
      props.card.forecast.forecastday[0].astro.sunrise,
      props.card.forecast.forecastday[0].astro.sunset
    )[1]
);
const dayLong = computed(
  () =>
    daylong(
      props.card.forecast.forecastday[0].astro.sunrise,
      props.card.forecast.forecastday[0].astro.sunset
    )[2]
);
const moonPhase = computed(
  () => moonPhases(props.card.forecast.forecastday[0].astro.moon_phase)[0]
);
const orbitRotate = computed(
  () => moonPhases(props.card.forecast.forecastday[0].astro.moon_phase)[1]
);

const moonBackground = computed(() => {
  return `background-image: url('${
    moonPhases(props.card.forecast.forecastday[0].astro.moon_phase)[2]
  }')`;
});

const uvIndex = computed(() =>
  indexUV(props.card.forecast.forecastday[0].day.uv)
);
</script>

<style lang="sass" scoped>

.sun-card
	margin-bottom: 40px
	position: relative
	display: flex
	min-width: 300px
	min-height: 300px
	border-radius: $default
	width: 540px
	height: 360px
	overflow: hidden
	background-color: #fff

	&__planet
		position: relative
		display: flex
		width: 130px
		height: 130px
		margin: auto

	&__sun-circle
		position: absolute
		width: 420px
		height: 420px
		top: 50%
		margin-top: -210px
		right: 50%
		margin-right: -12px

		&::before
			z-index: 3
			display: block
			content: ''
			width: 420px
			height: 420px
			opacity: 0.15
			background-color: #ffc700
			position: absolute
			border-radius: 50%

		&::after
			display: block
			content: ''
			width: 248px
			height: 248px
			margin: 84px
			opacity: 0.12
			background-color: #ffc700
			position: absolute
			border-radius: 50%

	&__earth
		z-index: 2
		margin: 20px auto

		&-icon
			width: 90px
			height: 90px
			background-position: center
			background-repeat: no-repeat
			background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iOTAiIGhlaWdodD0iOTEiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNDUiIGN5PSI0NS41NDEiIHI9IjQzIiBmaWxsPSJ1cmwoI3BhaW50MF9saW5lYXIpIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zNS4wMzcgMjMuNTk5YzEuNzI2IDAgMS42MjQtMS4yOTYuMzMtMy4yODgtLjI1Ny0uMzk1LTEuMTM2LS40MDUtMi4wNjEtLjQxNS0uODctLjAxLTEuNzgyLS4wMTktMi4yNTQtLjM1MS0uNzgtLjU1LjgzOS0yLjcwNSAxLjgwNi0yLjc2N2E3MS44NCA3MS44NCAwIDAxMS4yMTYtLjA2M2MzLjAxOC0uMTQgNi4zNi0uMjk3IDMuODc0LTIuNzI4LTEuMzU5LTEuMzMtNC41MjYuODY0LTYuNjI0IDIuMzk3LS40MjMuMzEtLjc3Ljc1Mi0xLjExMSAxLjE4Ny0uNTY5LjcyNC0xLjEyMiAxLjQzLTEuOTg2IDEuNDcyLS43NjQuMDM4LTEuNjI1LTEuOTE0LTIuMjExLTMuMjQyLS4yNjgtLjYwNy0uNDc4LTEuMDg0LS41OTYtMS4xODItLjIyNS0uMTg3LTEuMjQzLjE5MS0xLjEwNi45MzEuMDM0LjE4My4zMTMuNTg3LjU5Ljk4Ny4zNjkuNTMzLjczNCAxLjA2Mi41MTYgMS4wNjItLjI3NSAwLS4zOTMuMTk0LS41MTcuMzk4LS4wNzcuMTI3LS4xNTYuMjU3LS4yNzYuMzQ2LS4xMDYuMDc4LS4yMzItLjI5LS4zODEtLjcyNC0uMTMyLS4zODQtLjI4Mi0uODItLjQ1MS0xLjA0Ni0xLjI0OC0xLjY2Ni0xLjk5OC0xLjM2NS0yLjY4NS0xLjA4OC0uMS4wNC0uMi4wOC0uMy4xMTQtMS4wODguMzYyLTEuNTM0Ljg3Mi0yLjE2MyAxLjU5LS4yMzguMjczLS41MDIuNTc1LS44MzcuOTEtMSAxLTMgMS41ODYtNC41IDEuNS0uNTUtLjAzMi4xMjctMi4xOTIgMS0zLjUuMTk3LS4yOTYuNTQ1LS40NjguOTkzLS42OS4zODUtLjE5Ljg0NC0uNDE3IDEuMzQ0LS43OWwuNjE4LS40NjVjMS44MTktMS4zNzcgNC4yNDctMy4yMTQgNy4wNDktNC4wNTYuNjE2LS4xODQgMS42ODgtLjQyNiAyLjgzOS0uNjg2IDIuMjUtLjUwNyA0Ljc5NS0xLjA4MiA0Ljc5NS0xLjQyNSAwLS4zOS0xLjA3Ni0uMjY1LTIuMjgzLS4xMjYtLjQwMy4wNDYtLjgyLjA5NC0xLjIxNy4xMjYtMS40MTcuMTEyLTEuNjg3LS4xMTgtMS0xIC42MS0uNzgzIDIuOTE2LTEuMDg0IDQuNjkyLTEuMzE1LjQ5My0uMDY0Ljk0NC0uMTIzIDEuMzA4LS4xODUgMS45NDMtLjMzNCA0Ljg5LS42OTkgNi41LS41IDIuNDg5LjMwNyA5LjI4NS0uMzIgOS41LTIgLjA4LS42MjQgMTEuMjc2Ljk5NSAxNy44NjIgNS4xMTEgOCA1IDExIDguNSAxNC41IDE1IDEuMzY4IDIuNTQxLjM3NSAzLjcxOC0uODY2IDUuMTg2LS41NTkuNjYyLTEuMTY4IDEuMzgzLTEuNjM0IDIuMzE1LS41NDUgMS4wOS4yNCAyLjY3NS45NzQgNC4xNTQuODggMS43NzIgMS42ODIgMy4zOS4wMjYgMy44MjMtMS4zMjcuMzQ3LTIuNzkxLTEuNDgzLTQuNDEyLTMuNTA2LS44MjItMS4wMjctMS42ODMtMi4xMDQtMi41ODgtMi45NzEtLjQ2LS40NDEtLjc5Mi0uOTU3LTEuMTAyLTEuNDM3LS42MTgtLjk1Ny0xLjE0NC0xLjc3MS0yLjM5OC0xLjU2My0yLjUwNy40MTUtNC41IDQtNC41IDggMCAuNjc1LTEuMTU2IDIuOTE2LTIgMi0uNzA2LS43NjctMS4yNTItMi4xNTMtMS44NjctMy43MTItMS4yMDgtMy4wNjItMi42NzgtNi43OS02LjEzMy03Ljc4OC0yLjQ3NC0uNzE2LTMuODAyLS44NTQtNS4wMDEtLjk4LS45MjItLjA5Ni0xLjc2Ny0uMTg0LTIuOTk5LS41Mi0uMzQ1LS4wOTUtLjc0Ni0uMjYzLTEuMTQtLjQyOC0uOTUtLjM5OC0xLjg2LS43OC0xLjg2LS4wNzIgMCAuODQxLjUgMiAxLjUgMi41LjY3My4zMzYgMS42Ny4yNCAyLjYwNi4xNDkgMS4wNi0uMTAzIDIuMDQ0LS4xOTggMi4zOTQuMzUgMi4wNDggMy4yMTItNi4zMjkgNy4xNzItMTAgNy0yLjExNS0uMDk4LTMuNTMtMy41NjMtNC42ODYtNi4zOTItLjM4Ni0uOTQ1LS43NDItMS44MTktMS4wODctMi40NzItLjMwMy0uNTc2LTEuNDA0LS4xNDUtMS4yMjcuMzY0LjE3LjQ4OC4zMzYgMS4wMTEuNTEgMS41NTcuOTk2IDMuMTMgMi4yMjMgNi45ODYgNS40OSA4Ljk0NC40My4yNTcgMS4zMi4yMyAyLjI2My4yMDMgMS42MjktLjA0OCAzLjQxMi0uMTAxIDMuMjM3IDEuMjk3LS4yMjUgMS43OTgtMi42NDcgNC41OS02IDcuNS0yLjE1NiAxLjg3LTEuNTIgNS4zNjUtMSA4IC4zNzggMS45MTItLjYwMSAyLjg0Ny0xLjYzOSAzLjgzOC0uNzU4LjcyMy0xLjU0NyAxLjQ3Ny0xLjg2IDIuNjYyLTEuMTIxIDQuMjIzLTMuMDY1IDkuMjUzLTcuMjcxIDkuMjUzLTMuMDIgMC02LjY2Ni02LjkyNy03LjczLTEwLjI1NC0uMzgtMS4xODYtLjUyOC0yLjY2Ni0uNjg0LTQuMjItLjIxNi0yLjE0Ni0uNDQ2LTQuNDMxLTEuMzE2LTYuMjgtLjQzLS45MTItLjU3LTEuOTAzLS43MDUtMi44Ni0uMjA0LTEuNDM1LS4zOTYtMi43OTItMS41MzMtMy42OTItLjc5NS0uNjI5LTEuNzM4LS42MjMtMi45MTItLjYxNy0xLjI5OS4wMDctMi44NzkuMDE2LTQuODUtLjgzLTIuNDU2LTEuMDU2LTIuODg4LTUuMTE5LTEuNzk2LTEwIDEuMzUyLTYuMDQ0IDUuODE3LTEwLjUgMTEuNzk2LTEyLjA1NCAyLjU2Mi0uNjY2IDMuNTY1LjE0OSA0LjY0MiAxLjAyNC42MDUuNDkxIDEuMjM0IDEuMDAxIDIuMTc1IDEuMjc5LjkyNC4yNzMgMS43MS41OCAyLjQ0My44NjYuOTQuMzY4IDEuNzkzLjcwMSAyLjc0Ljg4NSAxLjI4NC4yNDggMi4xNDQuMTggMy4xOC4wOThhMjQuMTUzIDI0LjE1MyAwIDAxMi4wNDctLjA5OHptOC40ODUtOC45MjlsLS4wMTMtLjA4M2MtLjA1LS4zMjktLjExNC0uNzU5LjAxMy0xLjAxNC4xMzctLjI3OC45OS4xNjMgMS4zMy42NjhsLjEzNy4yYy41MDQuNzM2IDEuNTg1IDIuMzEgMS41ODUgMy4yNDYgMCAuNzQ0LS45MSAxLjIyNy0xLjQ4NS42OTMtLjU1LS41MTItMS40LTIuNTY3LTEuNTY3LTMuNzF6bTM5LjkyNiAyOS44MTdjLS4yODgtLjg2NC0uMDc4LTEuMzk3LjE1MS0xLjk4LjE3LS40MjguMzQ5LS44ODQuMzQ5LTEuNTIgMC0xLjUuNjY3LTEgMSAwIC4zMzMgMSAuNSAyIC41IDMgMCAuNS0xLjUgMi0yIC41em0wIDE0Yy0xLjUgMS41LTMgNC0zIDYuNSAwIDEgLjIgMyAxIDMgMSAwIDUtOC41IDUtMTEgMC0xLjUtMS41NDIuMDQyLTMgMS41em0tMzkuOTM1IDQuNjMyYy0xLjA3NyAyLjIyNS0yLjM2MyAxLjkzNC0zLjI3OC45OTUtLjkxMi0uOTM2IDIuOTYyLTguOTA0IDMuMjc4LTguNjI3Ljc2NC42NjkuODYxIDUuODUyIDAgNy42MzJ6IiBmaWxsPSJ1cmwoI3BhaW50MV9saW5lYXIpIi8+PHBhdGggb3BhY2l0eT0iLjUiIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNNTMuMTI5IDMuMTk4YTIxMC4wNTQgMjEwLjA1NCAwIDAxMy4zMDggMjQuODU0IDUuOTggNS45OCAwIDAwLTEuMTI3LS40NTNjLTIuNDc0LS43MTYtMy44MDItLjg1NC01LjAwMS0uOTgtLjkyMi0uMDk2LTEuNzY3LS4xODQtMi45OTktLjUyLS4zNDUtLjA5NS0uNzQ2LS4yNjMtMS4xNC0uNDI4LS45NS0uMzk4LTEuODYtLjc4LTEuODYtLjA3MiAwIC44NDEuNSAyIDEuNSAyLjUuNjczLjMzNiAxLjY3LjI0IDIuNjA2LjE0OSAxLjA2LS4xMDMgMi4wNDQtLjE5OCAyLjM5NC4zNSAyLjA0OCAzLjIxMi02LjMyOSA3LjE3Mi0xMCA3LTIuMTE1LS4wOTgtMy41My0zLjU2My00LjY4Ni02LjM5Mi0uMzg2LS45NDUtLjc0Mi0xLjgxOS0xLjA4Ny0yLjQ3Mi0uMzAzLS41NzYtMS40MDQtLjE0NS0xLjIyNy4zNjQuMTcuNDg4LjMzNiAxLjAxMS41MSAxLjU1Ny45OTYgMy4xMyAyLjIyMyA2Ljk4NiA1LjQ5IDguOTQ0LjQzLjI1NyAxLjMyLjIzIDIuMjYzLjIwMyAxLjYyOS0uMDQ4IDMuNDEyLS4xMDEgMy4yMzcgMS4yOTctLjIyNSAxLjc5OC0yLjY0NyA0LjU5LTYgNy41LTIuMTU2IDEuODctMS41MiA1LjM2NS0xIDggLjM3OCAxLjkxMi0uNjAxIDIuODQ3LTEuNjM5IDMuODM4LS43NTguNzIzLTEuNTQ3IDEuNDc3LTEuODYgMi42NjItMS4xMjEgNC4yMjMtMy4wNjUgOS4yNTMtNy4yNzEgOS4yNTMtMy4wMiAwLTYuNjY2LTYuOTI3LTcuNzMtMTAuMjU0LS4zOC0xLjE4Ni0uNTI4LTIuNjY2LS42ODQtNC4yMi0uMjE2LTIuMTQ2LS40NDYtNC40MzEtMS4zMTYtNi4yOC0uNDMtLjkxMi0uNTctMS45MDMtLjcwNS0yLjg2LS4yMDQtMS40MzUtLjM5Ni0yLjc5Mi0xLjUzMy0zLjY5Mi0uNzk1LS42MjktMS43MzgtLjYyMy0yLjkxMi0uNjE3LTEuMjk5LjAwNy0yLjg3OS4wMTYtNC44NS0uODMtMi40NTYtMS4wNTYtMi44ODgtNS4xMTktMS43OTYtMTAgMS4zNTItNi4wNDQgNS44MTctMTAuNSAxMS43OTYtMTIuMDU0IDIuNTYyLS42NjYgMy41NjUuMTQ5IDQuNjQyIDEuMDI0LjYwNS40OTEgMS4yMzQgMS4wMDEgMi4xNzUgMS4yNzkuOTI0LjI3MyAxLjcxLjU4IDIuNDQzLjg2Ni45NC4zNjggMS43OTMuNzAxIDIuNzQuODg1IDEuMjg0LjI0OCAyLjE0NC4xOCAzLjE4LjA5OGEyNC4xNTMgMjQuMTUzIDAgMDEyLjA0Ny0uMDk4YzEuNzI2IDAgMS42MjQtMS4yOTYuMzMtMy4yODgtLjI1Ny0uMzk1LTEuMTM2LS40MDUtMi4wNjEtLjQxNS0uODctLjAxLTEuNzgyLS4wMTktMi4yNTQtLjM1MS0uNzgtLjU1LjgzOS0yLjcwNSAxLjgwNi0yLjc2N2E3MS44NCA3MS44NCAwIDAxMS4yMTYtLjA2M2MzLjAxOC0uMTQgNi4zNi0uMjk3IDMuODc0LTIuNzI4LTEuMzU5LTEuMzMtNC41MjYuODY0LTYuNjI0IDIuMzk3LS40MjMuMzEtLjc3Ljc1Mi0xLjExMSAxLjE4Ny0uNTY5LjcyNC0xLjEyMiAxLjQzLTEuOTg2IDEuNDcyLS43NjQuMDM4LTEuNjI1LTEuOTE0LTIuMjExLTMuMjQyLS4yNjgtLjYwNy0uNDc4LTEuMDg0LS41OTYtMS4xODItLjIyNS0uMTg3LTEuMjQzLjE5MS0xLjEwNi45MzEuMDM0LjE4My4zMTMuNTg3LjU5Ljk4Ny4zNjkuNTMzLjczNCAxLjA2Mi41MTYgMS4wNjItLjI3NSAwLS4zOTMuMTk0LS41MTcuMzk4LS4wNzcuMTI3LS4xNTYuMjU3LS4yNzYuMzQ2LS4xMDYuMDc4LS4yMzItLjI5LS4zODEtLjcyNC0uMTMyLS4zODQtLjI4Mi0uODItLjQ1MS0xLjA0Ni0xLjI0OC0xLjY2Ni0xLjk5OC0xLjM2NS0yLjY4NS0xLjA4OC0uMS4wNC0uMi4wOC0uMy4xMTQtMS4wODguMzYyLTEuNTM0Ljg3Mi0yLjE2MyAxLjU5LS4yMzguMjczLS41MDIuNTc1LS44MzcuOTEtMSAxLTMgMS41ODYtNC41IDEuNS0uNTUtLjAzMi4xMjctMi4xOTIgMS0zLjUuMTk3LS4yOTYuNTQ1LS40NjguOTkzLS42OS4zODUtLjE5Ljg0NC0uNDE3IDEuMzQ0LS43OWwuNjE4LS40NjVjMS44MTktMS4zNzcgNC4yNDctMy4yMTQgNy4wNDktNC4wNTYuNjE2LS4xODQgMS42ODgtLjQyNiAyLjgzOS0uNjg2IDIuMjUtLjUwNyA0Ljc5NS0xLjA4MiA0Ljc5NS0xLjQyNSAwLS4zOS0xLjA3Ni0uMjY1LTIuMjgzLS4xMjYtLjQwMy4wNDYtLjgyLjA5NC0xLjIxNy4xMjYtMS40MTcuMTEyLTEuNjg3LS4xMTgtMS0xIC42MS0uNzgzIDIuOTE2LTEuMDg0IDQuNjkyLTEuMzE1LjQ5My0uMDY0Ljk0NC0uMTIzIDEuMzA4LS4xODUgMS45NDMtLjMzNCA0Ljg5LS42OTkgNi41LS41IDIuNDg5LjMwNyA5LjI4NS0uMzIgOS41LTIgLjAyOS0uMjI1IDEuNS0uMTU4IDMuNjguMjExem0tOS42MiAxMS4zODlsLjAxMy4wODNjLjE2NyAxLjE0MyAxLjAxNyAzLjE5OCAxLjU2NyAzLjcxLjU3NC41MzQgMS40ODUuMDUxIDEuNDg1LS42OTMgMC0uOTM1LTEuMDgtMi41MS0xLjU4NS0zLjI0NWwtLjEzOC0uMjAxYy0uMzQtLjUwNS0xLjE5Mi0uOTQ2LTEuMzMtLjY2OC0uMTI2LjI1NS0uMDYxLjY4NS0uMDEyIDEuMDE0em0tMy4yNzQgNDkuNTI3Yy45MTUuOTM5IDIuMiAxLjIzIDMuMjc4LS45OTUuODYxLTEuNzguNzY0LTYuOTYzIDAtNy42MzItLjMxNi0uMjc2LTQuMTkgNy42OS0zLjI3OCA4LjYyN3oiIGZpbGw9IiM5NEUyOEQiLz48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MF9saW5lYXIiIHgxPSIyNC43OTQiIHkxPSI0MS43ODQiIHgyPSI4MC4zMjkiIHkyPSI0NS42OTYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjNjZCMUZGIi8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjMjE4OEZGIi8+PC9saW5lYXJHcmFkaWVudD48bGluZWFyR3JhZGllbnQgaWQ9InBhaW50MV9saW5lYXIiIHgxPSI3Ni4xMjkiIHkxPSIzMy4wODUiIHgyPSIxNy43NDgiIHkyPSIzNC4wMzEiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj48c3RvcCBzdG9wLWNvbG9yPSIjMzFCNDk5Ii8+PHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNTVFM0FBIi8+PC9saW5lYXJHcmFkaWVudD48L2RlZnM+PC9zdmc+")

	&__moon
		transform: rotateZ(0.5turn)
		position: absolute
		top: 0
		left: 0
		z-index: 4
		width: 130px
		height: 130px
		background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTMyIiBoZWlnaHQ9IjEzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIG9wYWNpdHk9Ii43IiBjeD0iNjYiIGN5PSI2NiIgcj0iNjUiIHN0cm9rZT0iIzkzOUNCMCIgc3Ryb2tlLW1pdGVybGltaXQ9IjE2IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1kYXNoYXJyYXk9IjUgNSIvPjwvc3ZnPg==")
		background-size: contain

		&-icon
			margin: 51px 0 0 -14px
			width: 28px
			height: 28px

	&__info
		z-index: 4
		position: absolute
		top: 0
		left: 0
		width: 100%
		height: 100%
		display: flex
		flex-direction: column
		justify-content: space-between

	&__sunrise-sunset
		position: relative
		height: 50%
		display: flex
		flex-direction: column
		justify-content: flex-end
		align-items: center
		margin-top: 23px

		&-icon
			height: 107px
			width: 270px
			background-repeat: no-repeat
			background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjcwIiBoZWlnaHQ9IjEwOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTcuODU3IDEwNC41NzFhNy4xNDMgNy4xNDMgMCAwMTE0LjI4NiAwSDcuODU3eiIgZmlsbD0iI0ZGQjcwQSIvPjxwYXRoIGQ9Ik0yMS43MTMgOTEuMTQ3bC0xLjY3OCA0LjA1MmMtLjU0NyAxLjMyLTIuNTI3LjUtMS45OC0uODJsMS42NzktNC4wNTJjLjU0Ni0xLjMyIDIuNTI2LS41IDEuOTguODJ6bTcuNTI0IDguNjg0bC00LjA1MiAxLjY3OWMtMS4zMi41NDYtMi4xNC0xLjQzMy0uODItMS45OGw0LjA1Mi0xLjY3OWMxLjMyLS41NDYgMi4xNCAxLjQzMy44MiAxLjk4em0tMjQuNDMgMS42OEwuNzU1IDk5LjgzM2MtMS4zMi0uNTQ3LS41LTIuNTI3LjgyLTEuOThsNC4wNTIgMS42NzhjMS4zMi41NDcuNSAyLjUyNy0uODIgMS45OHptNS40NDctMTEuMTg0bDEuNjc4IDQuMDUyYy41NDcgMS4zMi0xLjQzMyAyLjE0LTEuOTguODJsLTEuNjc4LTQuMDUyYy0uNTQ3LTEuMzIgMS40MzMtMi4xNCAxLjk4LS44MnpNMTMuOTI5IDc4LjV2NS43MTRhMS4wNzEgMS4wNzEgMCAwMDIuMTQyIDBWNzguNWExLjA3MSAxLjA3MSAwIDEwLTIuMTQyIDB6IiBmaWxsPSIjRkZCNzBBIi8+PHBhdGggZD0iTTE2LjM4NSA3OS45NzJhMS4wNzEgMS4wNzEgMCAwMDEuNTE1LTEuNTE1bC0yLjE0Mi0yLjE0M2ExLjA3MiAxLjA3MiAwIDAwLTEuNTE2IDBMMTIuMSA3OC40NTdhMS4wNzEgMS4wNzEgMCAwMDEuNTE1IDEuNTE1TDE1IDc4LjU4N2wxLjM4NSAxLjM4NXoiIGZpbGw9IiNGRkI3MEEiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTEuNDI5IDEwNS41NzFhMSAxIDAgMDExLTFIMjcuNTdhMSAxIDAgMDExIDF2LjE0M2ExIDEgMCAwMS0xIDFIMi40M2ExIDEgMCAwMS0xLTF2LS4xNDN6IiBmaWxsPSIjRkZENzZDIi8+PHBhdGggZD0iTTI2MS43MTMgOTEuMzQybC0xLjY3OCA0LjAwMWMtLjU0NyAxLjMwNC0yLjUyNy40OTQtMS45OC0uODFsMS42NzktNGMuNTQ2LTEuMzA0IDIuNTI2LS40OTQgMS45NzkuODA5em03LjUyNSA4LjU3NmwtNC4wNTMgMS42NThjLTEuMzE5LjU0LTIuMTQtMS40MTUtLjgyLTEuOTU1bDQuMDUzLTEuNjU4YzEuMzE5LS41NCAyLjEzOSAxLjQxNS44MiAxLjk1NXptLTI0LjQzMSAxLjY1OGwtNC4wNTItMS42NTdjLTEuMzItLjU0LS41LTIuNDk1LjgyLTEuOTU1bDQuMDUyIDEuNjU3YzEuMzIuNTQuNSAyLjQ5NS0uODIgMS45NTV6bTUuNDQ2LTExLjA0NGwxLjY3OSA0LjAwMmMuNTQ3IDEuMzAzLTEuNDMzIDIuMTEzLTEuOTguODFsLTEuNjc4LTQuMDAyYy0uNTQ3LTEuMzAzIDEuNDMzLTIuMTEzIDEuOTc5LS44MXoiIGZpbGw9IiNGRkI3MEEiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI0Ny44NTcgMTA0LjU5OGMwLTMuODk1IDMuMTk4LTcuMDUzIDcuMTQzLTcuMDUzczcuMTQzIDMuMTU4IDcuMTQzIDcuMDUzaC0xNC4yODZ6IiBmaWxsPSIjRkZCNzBBIi8+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yNDEuNDI5IDEwNS41OThhMSAxIDAgMDExLTFoMjUuMTQyYTEgMSAwIDAxMSAxdi4xMTZhMSAxIDAgMDEtMSAxaC0yNS4xNDJhMSAxIDAgMDEtMS0xdi0uMTE2eiIgZmlsbD0iI0ZGRDc2QyIvPjxwYXRoIGQ9Ik0yNTMuOTI5IDc3LjA1OHY1LjY0M2MwIC41ODQuNDc5IDEuMDU4IDEuMDcxIDEuMDU4czEuMDcxLS40NzQgMS4wNzEtMS4wNTh2LTUuNjQzYzAtLjU4NC0uNDc5LTEuMDU4LTEuMDcxLTEuMDU4cy0xLjA3MS40NzQtMS4wNzEgMS4wNTh6IiBmaWxsPSIjRkZCNzBBIi8+PHBhdGggZD0iTTI1My42MTUgODEuMjQ3YTEuMDgyIDEuMDgyIDAgMDAtMS41MTYgMCAxLjA1IDEuMDUgMCAwMDAgMS40OTZsMi4xNDMgMi4xMTZhMS4wODIgMS4wODIgMCAwMDEuNTE2IDBsMi4xNDItMi4xMTZhMS4wNDggMS4wNDggMCAwMDAtMS40OTYgMS4wOCAxLjA4IDAgMDAtMS41MTUgMEwyNTUgODIuNjE1bC0xLjM4NS0xLjM2OHoiIGZpbGw9IiNGRkI3MEEiLz48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTI1NC4xNzYgNjdoLTEuMDY3Yy0uNTMtMS40MjEtMS4wODQtMi44My0xLjY2NC00LjIyN2ExIDEgMCAwMS41MzctMS4zMDZsLjA1Ni4xMy4xMzkuMzMxLjEyNy4zMDQuMDY1LjE1OGExMjYuNDMgMTI2LjQzIDAgMDExLjgwNyA0LjYxek0xNi45MDMgNjdoLTEuMDY3YTEyNi4wNiAxMjYuMDYgMCAwMTIuMTkzLTUuNTMzIDEgMSAwIDAxLjUzOCAxLjMwNkExMjUuMDY1IDEyNS4wNjUgMCAwMDE2LjkwMyA2N3pNNzEgMS4yODh2MS4xNmMtMS42Mi45NTctMy4yMTYgMS45NS00Ljc4NyAyLjk3NmExIDEgMCAwMS0xLjM4Mi0uMjg4IDEyNC4xNjQgMTI0LjE2NCAwIDAxLjgzNS0uNTVBMTI3LjEzMSAxMjcuMTMxIDAgMDE3MSAxLjI4OHptLTUwLjA4IDU2LjE2YTEgMSAwIDAxLTEuMzI2LjQ4MiAxMjQuMzIgMTI0LjMyIDAgMDEuNDIyLS45MDcgMTI2LjQzOCAxMjYuNDM4IDAgMDEzLjA5LTYuMTMzIDEgMSAwIDAxLjQxMyAxLjM1IDEyNS42MjIgMTI1LjYyMiAwIDAwLTIuNTk4IDUuMjA5em01LjQzNy0xMC4yOTFhMSAxIDAgMDEtMS4zNjYuMzU2IDEzMS41ODIgMTMxLjU4MiAwIDAxLjUwNC0uODY0IDEyNi45ODMgMTI2Ljk4MyAwIDAxMy42NDQtNS44MiAxIDEgMCAwMS4yODcgMS4zODEgMTI2LjAyMiAxMjYuMDIyIDAgMDAtMy4wNyA0Ljk0N3ptNi4zNjMtOS43NDZhMSAxIDAgMDEtMS4zOTMuMjI4IDEyNS43MzIgMTI1LjczMiAwIDAxLjU4Mi0uODEzIDEyNy40NSAxMjcuNDUgMCAwMTQuMTYzLTUuNDYgMSAxIDAgMDEuMTYgMS40MDIgMTI2LjU1IDEyNi41NSAwIDAwLTMuNTEyIDQuNjQyem03LjIzMy05LjEyYTEgMSAwIDAxLTEuNDA4LjEgMTMwLjI1NCAxMzAuMjU0IDAgMDEuNjU0LS43NTcgMTI3LjgxNyAxMjcuODE3IDAgMDE0LjY0Ny01LjA1NSAxIDEgMCAwMS4wMyAxLjQxMSAxMjYuNzE5IDEyNi43MTkgMCAwMC0zLjkyMyA0LjMwMXptOC4wNC04LjQxN2ExIDEgMCAwMS0xLjQxMi0uMDMgMTE3LjkgMTE3LjkgMCAwMS43Mi0uNjk0IDEyNy42MDcgMTI3LjYwNyAwIDAxNS4wOTItNC42MDcgMSAxIDAgMDEtLjEgMS40MDggMTI2LjgxOCAxMjYuODE4IDAgMDAtNC4zIDMuOTIzem04Ljc3Ny03LjY0NWExIDEgMCAwMS0xLjQwMy0uMTU5IDEzMC4xNCAxMzAuMTQgMCAwMS43ODItLjYyNCAxMjcuNDYzIDEyNy40NjMgMCAwMTUuNDkzLTQuMTIxIDEgMSAwIDAxLS4yMyAxLjM5MyAxMjYuNDY3IDEyNi40NjcgMCAwMC00LjY0MiAzLjUxMXptMTQyLjA4My05Ljg3NWExIDEgMCAwMS0uMzU2LTEuMzY1IDE3Ni4wMjcgMTc2LjAyNyAwIDAxLjg2My41MDQgMTI2LjQxNiAxMjYuNDE2IDAgMDE1LjgyMSAzLjY0MyAxIDEgMCAwMS0xLjM4Mi4yODggMTI1LjgwNyAxMjUuODA3IDAgMDAtNC45NDYtMy4wN3ptOS43NDYgNi4zNjRhMSAxIDAgMDEtLjIyOS0xLjM5M2wuNDA4LjI5LjQwNi4yOTFhMTI2Ljc0OCAxMjYuNzQ4IDAgMDE0LjY3OSAzLjU0bC4yNTMuMi4xMzkuMTExLjM5LjMxM2ExIDEgMCAwMS0xLjQwMy4xNiAxMjcuMDY4IDEyNy4wNjggMCAwMC00LjY0My0zLjUxMnptOS4xMiA3LjIzMmExIDEgMCAwMS0uMS0xLjQwN2wuMzc5LjMyNi4zNzcuMzI3YTEyNi44NjIgMTI2Ljg2MiAwIDAxNS4wNTYgNC42NDggMSAxIDAgMDEtMS40MTEuMDMgMTI4LjM3OCAxMjguMzc4IDAgMDAtNC4zMDEtMy45MjN6bTguNDE3IDguMDRhMSAxIDAgMDEuMDMtMS40MTEgNzguMDEgNzguMDEgMCAwMS42MDMuNjI2bC4wOS4wOTRhMTI3LjYwNyAxMjcuNjA3IDAgMDE0LjYwOCA1LjA5MiAxIDEgMCAwMS0xLjQwOC0uMSAxMjcuMDQxIDEyNy4wNDEgMCAwMC0zLjkyMy00LjMwMXptNy42NDQgOC43NzhhMSAxIDAgMDEuMTU5LTEuNDAzbC4zMTMuMzkuMzEyLjM5MWExMjYuNzY2IDEyNi43NjYgMCAwMTMuODMxIDUuMDg2bC4yOS40MDdhMSAxIDAgMDEtMS4zOTMtLjIyOSAxMjUuMjIyIDEyNS4yMjIgMCAwMC0zLjUxMi00LjY0MnptNi44MDYgOS40NDJhMSAxIDAgMDEuMjg3LTEuMzgybC4yNzYuNDE3LjI3NC40MTlhMTI2LjY0IDEyNi42NCAwIDAxMy4wOTQgNC45ODVsLjE0Ni4yNS4xMDcuMTgxLjI1MS40MzNhMSAxIDAgMDEtMS4zNjYtLjM1NiAxMjUuOTkxIDEyNS45OTEgMCAwMC0zLjA2OS00Ljk0N3ptNS45MDYgMTAuMDNhMSAxIDAgMDEuNDE0LTEuMzUgNzcuODI2IDc3LjgyNiAwIDAxLjQ3MS44ODMgMTI3LjA1MyAxMjcuMDUzIDAgMDEzLjA0MSA2LjE1NyAxIDEgMCAwMS0xLjMyNy0uNDgxIDEyNS4zNzggMTI1LjM3OCAwIDAwLTIuNTk5LTUuMjF6IiBmaWxsPSIjRkZCNzBBIi8+PC9zdmc+")

		&-info

			&-wrapper
				position: relative
				display: flex
				justify-content: space-between
				width: 270px
				height: 20px
				margin-top: 3px

			&-rise-time
				margin-left: -5px

			&-set-time
				margin-right: -5px

	&__day-duration
		position: absolute
		left: 0
		bottom: 107px
		width: 100%
		height: 40px
		display: flex
		align-items: center
		flex-direction: column

		&-label
			font-weight: normal
			// margin: 0
			font-size: $small

		&-value
			font-weight: bold
			font-size: $small

	&__text-info
		padding: 0 25px 20px
		font-weight: normal
		font-size: $small
		line-height: 20px
		text-align: center

		&-item
			& + &
				margin-top: 5px
</style>
