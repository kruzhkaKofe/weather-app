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
				<div 
					class="calendar-days__day-item"
					:class="{
						'today': choisedDay,
						'previous': 0 != 0,
					}"
					@click="takeDay(n)"
				>
					{{ n }}
				</div>
			</div>
		</div>

		
		<!-- <button @click="test">test</button> -->
	</div>

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
				monthName: ['Янв.', 'Фефр.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.'],
				choisedMonth: '',
				choisedDay: null,
			}
		},

		methods: {
			checkedMonth(month) {
				const numOfMonth = new Date(this.card.location.localtime).getMonth()
				if (this.monthName[numOfMonth] === month) {
					return true
				}
    	},

			takeDay(n) {
				this.choisedDay === new Date(this.card.location.localtime).getDate() ? this.choisedDay : this.choisedDay === n
				// this.choisedDay = n
			},

		},

		computed: {
			quantityDays() {
				if (this.choisedMonth === 'Февр.' && (new Date(this.card.location.localtime).getYear()) % 4 === 0) {
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

.today
	background-color: #fff

.previous 
	background-color: hsl(0, 0%, 85%)

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
					background-color: #fff

</style>