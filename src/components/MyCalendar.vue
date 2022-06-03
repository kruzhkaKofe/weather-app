<template>
	<div class="calendar">
		<div class="calendar-month">
			<div 
				class="calendar-month__item"
				v-for="(month, i) in monthName"
				:key="i"
			>	
				<input
					class="calendar-month__item-radio" 
					type="radio" 
					:id="i"
					name="months" 
					:checked="checkedMonth(month)"
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
						'previous-month': isPreviousMonth(),
						'previous': isPreviousDays(n),
						'today': n === new Date().getDate() && choisedMonth === monthName[new Date().getMonth()],
						'choised': choisedDay === n,
					}"
					:datetime="dateTime(n)"
					@click="takeDay(n), findHistory()"
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
				date: '',
				dateValue: '',
				monthName: ['Янв.', 'Фефр.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'],
				choisedMonth: null,
				choisedDay: null,
			}
		},

		methods: {
			currentMonth() {
				const numOfMonth = new Date().getMonth()
				this.monthName = this.monthName.filter(m => this.monthName.indexOf(m) <= numOfMonth)
				this.choisedMonth = this.monthName[numOfMonth]
			},

			checkedMonth(month) {
				const numOfMonth = new Date().getMonth()
				if (this.monthName[numOfMonth] === month) {
					return true
				}
    	},

			isPreviousMonth(n) {
				const numOfMonth = new Date().getMonth()
				if (numOfMonth > this.monthName.indexOf(this.choisedMonth)){
					return true
				}
			},

			isPreviousDays(n) {
				const numOfMonth = new Date().getMonth()
				if (this.choisedMonth === this.monthName[numOfMonth] && n < new Date().getDate()) {
					return true
				}
			},

			dateTime(n) {
				const d = new Date()
				const year = d.getFullYear()
				const month = (this.monthName.indexOf(this.choisedMonth) + 1).toString().padStart(2, '0')
				const day = n.toString().padStart(2, '0')
				return `${year}-${month}-${day}`
			},

			takeDay(n) {
				this.choisedDay = n
				this.dateValue = this.dateTime(n)
				console.log(this.dateValue)
			}, 

			findHistory() {
				const d = new Date()
				if (new Date(this.dateValue).getTime() <= d) {
					this.$emit('fetchHistoryOfWeather', this.dateValue)
					this.dateValue = ''
				}
			}



		},
		
		mounted() {
			this.currentMonth()
		},

		computed: {
			quantityDays() {
				if (this.choisedMonth === 'Февр.' && (new Date().getYear()) % 4 === 0) {
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