<template>
	<header class="header">
		<div class="header__logo">
			<a 
				class="header__logo-link"
				@click="$router.push('/')"
			>
				<img class="header__logo-img" src="@/assets/icons/main-logo.png" alt="main-logo">
				forecast.
			</a>
		</div>
		<button class="header__btn" @click="$router.push('/history')">История погоды</button>
		<search-form
			@findWeatherInCity="findWeather"
		/>
	</header>
</template>

<script>
import SearchForm from '@/components/SearchForm'

	export default {
  	components: {
			SearchForm,
		},

		data() {
			return {
				name: '',
			}
		},

		methods: {
			findWeather(name) {
				this.name = name
				this.$emit('findWeatherInCity', this.name)
			}
		}
		
	}
</script>

<style lang="sass" scoped>
@import "@/styles/variables.sass"

.header
	display: flex
	align-items: center
	justify-content: space-between
	padding: 15px 0

	&__logo

		&-link
			display: flex
			align-items: center
			font-size: $medium
			font-weight: bold
			color: black

		&-img
			@include logo-icon
			margin-right: 10px

	&__btn
		padding: 5px 15px
		font-size: $small
		border: none
		background: white
		opacity: 0.7
		border-radius: 5px
		cursor: pointer
</style>