<template>
  <div v-if="card.forecast" class="forecast">
    <article
      class="forecast-item"
      v-for="(day, i) in card.forecast.forecastday"
      :key="i"
      :id="dateOfDay(day)"
    >
      <div class="forecast-date" :style="weekendCheck(day)">
        <p class="forecast-date-num">{{ dateOfDay(day) }}</p>
        <p class="forecast-date-month">{{ monthOfDay(day) }}</p>
        <p class="forecast-date-day">{{ dayOfDay(day) }}</p>
      </div>
      <table class="forecast-table">
        <thead class="forecast-table__head">
          <tr class="forecast-table__head-row">
            <th class="forecast-table__head-cell" colspan="3"></th>
            <th
              class="forecast-table__head-cell forecast-table__head-cell-pressure"
            >
              Давление,
              <br />
              мм рт. ст.
            </th>
            <th
              class="forecast-table__head-cell forecast-table__head-cell-humidity"
            >
              Влажность
            </th>
            <th
              class="forecast-table__head-cell forecast-table__head-cell-wind"
            >
              Ветер, м/с
            </th>
            <th
              class="forecast-table__head-cell orecast-table__head-cell-feelslike"
            >
              Ощущается как
            </th>
          </tr>
        </thead>
        <tbody class="forecast-table__body">
          <tr
            class="forecast-table__body-row"
            v-for="(n, index) in filteredHours(day.hour)"
            :key="index"
          >
            <th
              class="forecast-table__body-cell forecast-table__body-cell-daypart"
            >
              <p class="forecast-table__body-cell--not-bold">
                {{ dayPart(n.time) }}
              </p>
              <br />
              <span>{{ n.temp_c > 0 ? `+${n.temp_c}` : n.temp_c }}</span>
            </th>
            <th
              class="forecast-table__body-cell forecast-table__body-cell-icon"
            >
              <img
                class="forecast-table__body-cell-icon-img"
                :src="n.condition.icon"
                alt="condtion"
              />
            </th>
            <th
              class="forecast-table__body-cell forecast-table__body-cell-condition"
            >
              {{ n.condition.text }}
            </th>
            <th
              class="forecast-table__body-cell forecast-table__body-cell-pressure"
            >
              {{ pressure(n) }}
            </th>
            <th
              class="forecast-table__body-cell forecast-table__body-cell-humidity"
            >
              {{ n.humidity }}%
            </th>
            <th
              class="forecast-table__body-cell forecast-table__body-cell-wind"
            >
              {{ windSpeedFormated(n.wind_kph) }} м/с
              <img
                :style="windDirImage(n)"
                class="forecast-table__body-cell-wind-direction-icon"
                src="https://yandex-pogoda.static-storage.net/1nZ7g6572/cfeea7iuq/xXAlVRFcwMYO59kTa1ajgf-3R6jvCcSfAO-X8LZcdEDWPpBr73JmFom9v09-OcLVnIWnfUiCz37yJt1I9ONCalx0gRktQCTnnp95yj8CDx3vDwP1u-jgyywDjnTWENwotn6sv3e_gk55GVMfEp3aLXSJt0XU5sPCDhptaVRzXkqxrNXNHUiwL5JPAWpvDmPNM6fL9QM4QNcE397canA0qNL-uFeLN56auUFzb2axBoGY-d_dxC4nulI-ccEQp8IKkcANOV1UTKOqu61aD8anJcvH9z3DEGSrwGeChKokOPiaCkh_-9OaepXt4_vyGfa1uFEH0fhmny5GmsH9CDdS8oVsMbURGEzPIteJRjOmq1GTh_vBF7ykT4D75mw21KQwWs6Y03Pz2rpNrSMDVtXWHTjBt-nUmic-VpqJQfSb9pqV3PmdgUBQx5aHdZZ3Vpvdxw_jURe4qMuctw7IapwE3J5qWAsbfxL6_TV7O0I16glIJTft8OLnTi4GFcFEd7bGBbQ50clEcCOCF30Gsx5vwRv_G73XdMCH_JcKLBZ05Bhq5jh7oxtSUmXxb-eeVe59hEG3pThiy-qSIn2RdMMG3snMgY2pVDCvjh9Z_vNqZzGH34PFcxTc4_xfPkj2tCj4yiIkt-_P2nqJtYevdiX2PRiNW8Hcpg8uEq4pZWxPGq7lqP01WZjIb77TyX5TtqNRyxsHJQ8IoKM4d8aY2pi4WE6OhMvPG2ZmTfXrB3a1wgEsAaPROJ7vUqIq1bkId8LSsXh9mQWQ4JOKV2VG09J_qQu7S6EfAHSXtI8aENJQHDSiUoiLkwtyQsXFjyNWmcadhBEzLeQGf_4anlXtmJ_SXjkULU0RgHjvKheZJmduVxkDcwtBk8jAF-hzHqjaMFhkKk68P7cPCh75uSvj_oUijSQtk-ngFq-2_oJp5VyDsooprMlttcykky4PmXY3SrsJh89HZRckTIs0s8IIInSMHL7iwD-v78aeTcnvYyIVRo0EdZv5uKKLzuLmYTFUmzqSEexxtY0cAIMGj8V2-4bvbTePd3VH4DxHkIcCnOrUdMDW9pTzb8MG3p0Jo6tOnW6R-B3Lodgy67KWmvF95AsKvrkw0Q0RiPjjBstBZreusykr3w9d6-j8q-THRmQ6SJCc4posY6_rmmJVhWMTdqUSoQTRx01AirNC4gqJDXS_MvJtWOVhCWxU1yo_xRZjhvvRI4PvRfc0RIt876pAulz4sNamPHMjw2qObSXrk3ZhZh2IFT9dhPJvSg4uXf34v6KiCZTNmalQDFvSc-l-88KXJReP-6HLSFRbRGeKlI6cFBje4ghXN3d-4p2Jp2PGcZL5HMVfvUAaf6LOvn3hiONSkmV4YTnxtCybVkORomMyv92Xr1dp48goX_CfOlzuNKhEou7ge__Dgr45QScbpmFinfQF3_Gsqhe2lpZ9JdCbcpLJ1GGdhaAkH5YLffrHLl9BF3PnvTfkkP-075rEmigE4NaSiDMTk-4awZmbl8YFzi1k8RdVZDJjQkKi5SUcNyIaucCBqT3U9CsGzx3qs-LjJfOvR3mbzECjtMtunPasZOSq4hQ_uxu2jhVBT--mbc4BJN1DOeCep6Kahp1teOe6DnVIwaFdqHT3mgdJBoOGK93784N9OzSsT2gPjgx2zHyogtqgd6tLtkJtlQN7vvESCYDh5_W4CpO6BrrR9VhvxvZl4MEdjSCkby6X6ZaHjovRc7fLOeMcNCOwU7KAkqRg2OLuTMM7S9r-mbnbGx6BYomoKbv9dFoA"
                alt="Направление ветра"
              />
              {{ windDirName(n) }}
            </th>
            <th
              class="forecast-table__body-cell forecast-table__body-cell-feelslike"
            >
              {{ feelslikeTemp(n) }}
            </th>
          </tr>
        </tbody>
      </table>
      <div class="forecast-right-column">
        <div class="forecast-right-column__sunrise-sunset">
          <div class="forecast-right-column__sunrise-sunset-icon"></div>
          <div class="forecast-right-column__day-duration">
            <h3
              class="forecast-right-column__day-duration-label"
              aria-label="Световой день"
            >
              Световой день
            </h3>
            <div class="forecast-right-column__day-duration-value">
              {{ dayLong(day) }}
            </div>
          </div>
          <div class="forecast-right-column__sunrise-sunset-info-wrapper">
            <div
              class="forecast-right-column__sunrise-sunset-info forecast-right-column__sunrise-sunset-info-rise-time"
            >
              <p>
                <strong>{{ sunrise(day) }}</strong>
              </p>
            </div>
            <div
              class="forecast-right-column__sunrise-sunset-info forecast-right-column__sunrise-sunset-info-set-time"
            >
              <p>
                <strong>{{ sunset(day) }}</strong>
              </p>
            </div>
          </div>
        </div>
        <div class="forecast-right-column__text-info">
          <p class="forecast-right-column__text-info-item">
            <img
              :style="'margin-right: 5px'"
              :src="moonImage(day)"
              alt="фаза луны"
            />
            {{ phaseOfMoon(day) }}
          </p>
          <p class="forecast-right-column__text-info-item">
            {{ uvIndex(day) }}
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script setup>
import { moonPhases, indexUV, daylong } from "@/plugins/celestialBody";
import {
  windDirection,
  windSpeedFormated,
  mmPressure,
  dayPart,
  filteredHours,
  formatedTemperature,
} from "@/plugins/naturalCondition";
import {
  week,
  numOfDay,
  dateOfDay,
  dayOfDay,
  monthOfDay,
} from "@/plugins/forecastDate";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const sunrise = (day) => daylong(day.astro.sunrise, day.astro.sunset)[0];
const sunset = (day) => daylong(day.astro.sunrise, day.astro.sunset)[1];
const dayLong = (day) => daylong(day.astro.sunrise, day.astro.sunset)[2];
const moonImage = (day) => moonPhases(day.astro.moon_phase)[2];
const phaseOfMoon = (day) => moonPhases(day.astro.moon_phase)[0];
const uvIndex = (day) => indexUV(day.day.uv);
const pressure = (hour) => mmPressure(hour.pressure_mb);
const windDirImage = (hour) => windDirection(hour.wind_dir)[0];
const windDirName = (hour) => windDirection(hour.wind_dir)[1];
const feelslikeTemp = (hour) => formatedTemperature(hour.feelslike_c);

const weekendCheck = (day) => {
  if (week[numOfDay(day)] === week[0] || week[numOfDay(day)] === week[6]) {
    return "color: red";
  }
};
</script>

<style lang="sass" scoped>

.forecast
	height: 1000px
	font-size: $small

	&-item
		position: relative
		height: 450px
		background-color: $main
		padding: 30px
		border-radius: $default
		display: flex
		align-items: center
		margin-bottom: 20px

	&-date
		width: 140px
		padding-right: 30px
		text-align: center
		border-right: 2px solid rgba(0, 0, 0, 0.2)
		height: 100%
		display: flex
		align-items: center
		flex-direction: column
		justify-content: center

		&-num
			font-size: $large
			font-weight: bold

	&-table
		border-collapse: collapse
		width: 950px
		text-align: center
		vertical-align: middle
		border-bottom: 2px solid rgba(0, 0, 0, 0.2)

		&__head

			&-cell
				font-weight: normal
				padding-bottom: 10px
				padding-right: 15px
				border-bottom: 2px solid rgba(0, 0, 0, 0.2)

		&__body

			&-cell

				&--not-bold
					font-weight: normal
					margin-bottom: -20px

				&-daypart
					text-align: center
					width: 80px

				&-icon
					padding-left: 15px

					&-img
						@include condition-icon

				&-condition
					width: 260px
					font-weight: normal

				&-wind
					text-align: left
					padding-left: 15px

					&-direction-icon
						@include wind-dir-icon
						margin-left: 5px

	&-right-column
		display: flex
		flex-direction: column
		justify-content: center
		height: 100%
		padding-left: 30px
		border-left: 2px solid rgba(0, 0, 0, 0.2)

		&__sunrise-sunset
			position: relative
			height: 50%
			display: flex
			flex-direction: column
			justify-content: flex-end
			align-items: center

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
				font-size: $small

			&-value
				font-weight: bold
				font-size: $small

		&__text-info
			margin-top: 15px
			padding: 0 25px 20px
			font-size: $small
			line-height: 20px
			text-align: center

			&-item
				display: flex
				justify-content: center
				align-items: center

				& + &
					margin-top: 5px
</style>
