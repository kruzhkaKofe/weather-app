<template>
	<div class="cards-list">
		<today-facts :card="card"/>
		<tomorrow-facts :card="card"/>
		<current-card 
			:card="card"
			:hours="hours"
		/>
		<map-card :card="card"/>
	</div>
</template>

<script>
import CurrentCard from '@/components/CurrentCard'
import MapCard from '@/components/MapCard'
import TodayFacts from '@/components/TodayFacts'
import TomorrowFacts from '@/components/TomorrowFacts'

	export default {
		components: {
    CurrentCard,
    MapCard,
		TodayFacts,
		TomorrowFacts,
	},

		props: {
			card: {
				type: Object,
				required: true
			},
			hours: {
				type: Array,
				required: true
			}
		}
		
	}
</script>

<style lang="sass" scoped>
@import "@/styles/variables.sass"

.cards-list	
	display: flex
	justify-content: space-between
	flex-wrap: wrap

</style>