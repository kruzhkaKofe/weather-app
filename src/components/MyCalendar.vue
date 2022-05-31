<template>
	<div class="calendar">
		<div class="calendar-month">
			<div 
				class="calendar-month__item"
				v-for="(month, i) in monthName"
				:key="i"
			>
				<input 
					:checked="checkedMonth(month)"
					:disabled="disabledMonth(month)"
					class="calendar-month__item-radio" 
					type="radio" 
					name="months" 
					:id="i" 
				>
				<label class="calendar-month__item-label" :for="i">{{ month }}</label>
			</div>
		</div>
		<div class="calendar-days">
			<div class="calendar-days">

			</div>
		</div>
		<button @click="test">test</button>
		<p>{{ card.location.name }}</p>
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
				isChecked: false,
				isDisabled: true,
			}
		},

		methods: {
			checkedMonth(month) {
				const months = ['Янв.', 'Фефр.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.']
				const numOfMonth =  new Date(this.card.location.localtime).getMonth()
				if (months[numOfMonth] === month) {
					return true
				}
    	},

			disabledMonth(month) {
				const months = ['Янв.', 'Фефр.', 'Март', 'Апр.', 'Май', 'Июнь', 'Июль', 'Авг.', 'Сент.', 'Окт.', 'Нояб.', 'Дек.']
				const numOfMonth =  new Date(this.card.location.localtime).getMonth()
				for (let i = 0; i < months; i++) {
					if (numOfMonth > i) {
						return true
					} 					 
				}
			},

		},

		computed: {
			
		}

	}
</script>

<style lang="sass" scoped>
@import "@/styles/variables.sass"

.calendar
	height: 600px
	padding: 20px
	font-size: $small
	border-radius: $default
	background: $main
	display: flex
	flex-direction: column
	// justify-content: center
	align-items: center

	&-month
		display: inline-block
		overflow: hidden
		border-radius: 6px
		font-size: $small

		&__item
			display: inline-block
			float: left

			&:first-child label
				border-radius: 6px 0 0 6px
				
			&:last-child label
				border-radius: 0 6px 6px 0
				border-right: 1px solid rgba(0, 0, 0, 0.2)
				
			&-radio
				display: none

				&:checked + label
					background: #fff

			&-label
				display: inline-block
				cursor: pointer
				padding: 0px 15px
				line-height: 40px
				border: 1px solid #999
				border-right: none
				user-select: none




</style>