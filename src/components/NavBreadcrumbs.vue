<template>
  <div class="breadcrumbs">
    <div v-if="card.location" class="breadcrumbs-true">
      <a class="breadcrumbs-link" href="#">{{ card.location.country }}</a>
      <a class="breadcrumbs-link" href="#">{{ card.location.region }}</a>
      <p class="breadcrumbs-link">{{ card.location.name }}</p>
    </div>
    <div v-else class="breadcrumbs-false">
      <a class="breadcrumbs-link" href="#">Country</a>
      <a class="breadcrumbs-link" href="#">Region</a>
      <p class="breadcrumbs-link">City</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="sass" scoped>

.breadcrumbs
	padding: 15px 0

	&-link
		font-size: $small
		color: black

		&:not(:last-child):hover
			color: rgb(90, 199, 144)

		&:not(:last-child)::after
			content: '\203A'
			margin: 0 5px 0 5px

		&:last-child
			opacity: 0.7

	&-true,
	&-false
		display: flex
		align-items: center
</style>
