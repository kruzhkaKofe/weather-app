<template>
  <div class="calendar">
    <div class="calendar-month">
      <div
        class="calendar-month__item"
        v-for="(month, i) in currentMonth"
        :key="i"
      >
        <input
          class="calendar-month__item-radio"
          type="radio"
          :id="i"
          name="months"
          :checked="checkedMonth"
          :value="month"
          v-model="choisedMonth"
        />
        <label class="calendar-month__item-label" :for="i">{{ month }}</label>
      </div>
    </div>
    <div class="week">
      <span class="week__day secondary-text" v-for="day in week" :key="day">{{
        day
      }}</span>
    </div>
    <div class="calendar-days">
      <div
        class="calendar-days__day-wrapper"
        v-for="n in offset"
        :key="n"
      ></div>
      <div
        v-for="n in quantityDays"
        :key="dateTime(n)"
        class="calendar-days__day-wrapper"
      >
        <time
          class="calendar-days__day-item"
          :class="{
            previous: isToday(n) === false,
            today: isToday(n),
            choised: date === dateTime(n),
          }"
          :datetime="dateTime(n)"
          @click="findHistory(n)"
        >
          {{ n }}
        </time>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["fetchHistoryOfWeather"]);

const date = ref("");
const choisedMonth = ref(null);

const week = ["ПН", "ВТ", "СР", "ЧТ", "ПТ", "СБ", "ВС"];
const monthName = [
  "Янв.",
  "Фефр.",
  "Март",
  "Апр.",
  "Май",
  "Июнь",
  "Июль",
  "Авг.",
  "Сент.",
  "Окт.",
  "Нояб.",
  "Дек.",
];

const currentDate = new Date();
const numOfMonth = currentDate.getMonth();

const currentMonth = computed(() =>
  monthName.filter((m) => monthName.indexOf(m) <= numOfMonth)
);

const checkedMonth = computed(() => {
  if (monthName[numOfMonth]) {
    return true;
  }
});

const quantityDays = computed(() => {
  if (choisedMonth.value === "Февр." && currentDate.getFullYear() % 4 === 0) {
    return 29;
  } else {
    switch (choisedMonth.value) {
      case "Апр.":
      case "Июнь":
      case "Сент.":
      case "Нояб.":
        return 30;
      case "Фефр.":
        return 28;
      default:
        return 31;
    }
  }
});

const offset = computed(() => {
  const vol = new Date(dateTime(1)).getDay();
  return vol > 0 ? vol - 1 : vol + 6;
});

const defaultDate = () => {
  choisedMonth.value = monthName[numOfMonth];
  date.value = dateTime(currentDate.getDate());
};

const dateTime = (n) => {
  const year = currentDate.getFullYear();
  const month = (monthName.indexOf(choisedMonth.value) + 1)
    .toString()
    .padStart(2, "0");
  const day = n.toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const isToday = (n) => {
  if (
    n === currentDate.getDate() &&
    choisedMonth.value === monthName[numOfMonth]
  ) {
    return true;
  }
  if (new Date(dateTime(n)).getTime() < currentDate.getTime()) {
    return false;
  }
};

const findHistory = (n) => {
  if (new Date(dateTime(n)).getTime() > currentDate) {
    return;
  }
  if (date.value === dateTime(n)) {
    return;
  }
  date.value = dateTime(n);
  if (new Date(date.value) <= currentDate) {
    emit("fetchHistoryOfWeather", props.card.location.name, date.value);
  }
};

onMounted(() => {
  defaultDate();
});
</script>

<style lang="sass" scoped>

.previous
	background-color: hsl(0, 0%, 80%)

.today
	background-color: #fff

.choised
	background-color: yellow

.calendar
	width: 700px
	height: 450px
	padding: 20px
	border-radius: $default
	background-color: $main
	display: flex
	flex-direction: column
	align-items: center
	overflow: hidden
	font-size: $x-small

	&-month
		display: flex
		justify-content: center

		&__item
			display: inline-block
			float: left
			margin-bottom: 25px

			&:first-child label
				border-radius: 6px 0 0 6px

			&:last-child label
				border-radius: 0 6px 6px 0
				border-right: 1px solid rgba(0, 0, 0)

			&-radio
				display: none

				&:checked + label
					background: #fff

			&-label
				display: inline-block
				cursor: pointer
				padding: 0px 9px
				line-height: 40px
				border: 1px solid #000
				border-right: none
				user-select: none

	&-days
		width: 100%
		display: flex
		align-items: center
		flex-wrap: wrap

		&__day

			&-wrapper
				display: flex
				align-items: center
				justify-content: center
				width: calc(100%/7)
				height: 50px

			&-item
				display: flex
				align-items: center
				justify-content: center
				height: 47px
				width: 90%
				border: 1px solid black
				border-radius: 6px
				font-size: $small
				font-weight: 700

				&:hover
					cursor: pointer
					transition: 0.4s
					background-color: yellow

.week
	display: flex
	align-items: center
	width: 100%
	margin-bottom: 15px

	&__day
		display: block
		text-align: center
		width: calc(100%/7)
		font-weight: bold
</style>
