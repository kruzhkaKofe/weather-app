<template>
	<div 
		v-if="card.location"
		class="calendar"
	>
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
				>
				<label class="calendar-month__item-label" :for="i">{{ month }}</label>
			</div>
		</div>
		<div class="calendar-days">
			<div
				v-for="(n, i) in quantityDays"
				:key="i"
				class="calendar-days__day-wrapper"
			>	
				<time 
					class="calendar-days__day-item"
					:class="{
						'previous': isToday(n) === false,
						'today': isToday(n),
						'choised': dateValue === dateTime(n),
					}"
					:datetime="dateTime(n)"
					@click="findHistory(n)"
				>
					{{ n }}
				</time>
			</div>
		</div>
	</div>
	<!-- <button @click="test">test</button> -->

</template>

<script>
	export default {
		props: {
			card: {
				type: Object,
				required: true
			},
		},

		data() {
			return {
				dateValue: '',
				monthName: ['Янв.', 'Фефр.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'],
				choisedMonth: null,
			}
		},

		methods: {
			isToday(n) {
				if (n === this.currentDate.getDate() && this.choisedMonth === this.monthName[this.numOfMonth]) {
					return true
				}
				if (new Date(this.dateTime(n)).getTime() < this.currentDate.getTime()) {
					return false
				}
			},

			dateTime(n) {
				const year = this.currentDate.getFullYear()
				const month = (this.monthName.indexOf(this.choisedMonth) + 1).toString().padStart(2, '0')
				const day = n.toString().padStart(2, '0')
				return `${year}-${month}-${day}`
			},

			findHistory(n) {
				this.dateValue = this.dateTime(n)
				if (new Date(this.dateValue).getTime() <= this.currentDate) {
					this.$emit('fetchHistoryOfWeather', this.dateValue)
					console.log(this.dateValue)
				}
			},

			chooseMonth() {
				this.choisedMonth = this.monthName[this.numOfMonth];
			}

		},

		mounted() {
			this.chooseMonth()
		},

		computed: {
			currentDate() {
				return new Date()
			},

			numOfMonth() {
				return this.currentDate.getMonth()
			},

			currentMonth() {
				return this.monthName.filter(m => this.monthName.indexOf(m) <= this.numOfMonth)
			},

			checkedMonth() {
				if (this.monthName[this.numOfMonth]) {
					return true
				}
			},

			quantityDays() {
				if (this.choisedMonth === 'Февр.' && (this.currentDate.getFullYear()) % 4 === 0) {
					return 29;
				} else {
					switch(this.choisedMonth) {
						case 'Апр.':
						case 'Июнь':
						case 'Сент.':
						case 'Нояб.':
							return 30;
						case 'Фефр.':
							return 28;
						default: 
							return 31;
					}
				}
			},

		},

	}
</script>

<style lang="sass" scoped>
@import "@/styles/variables.sass"

.previous-month,
.previous
	background-color: hsl(0, 0%, 85%)

.today
	background-color: #fff

.choised
	background-color: pink
	
.calendar
	width: 700px
	height: 450px
	padding: 20px
	border-radius: $default
	background-color: $main
	display: inline-block
	overflow: hidden
	font-size: $x-small

	&-month 
		display: flex
		justify-content: center

		&__item
			display: inline-block
			float: left
			margin-bottom: 40px

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
				height: 65px
			
			&-item
				display: flex
				align-items: center
				justify-content: center
				height: 60px
				width: 60px
				border: 1px solid black
				border-radius: 50%
				font-size: $small
				font-weight: 700

				&:hover
					cursor: pointer
					transition: 0.4s
					background-color: pink

</style>