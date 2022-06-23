<template>
	<div v-if="error" class="inner-wrapper error">
		<h1>Ooops! Something went wrong.</h1>
	</div>
</template>

<script setup>

const props = defineProps({
  error: {
    type: Boolean,
		default: false
  },
});

</script>

<style lang="sass" scoped>
.error
  display: flex
  justify-content: center
  align-items: center
  margin-top: 250px
</style>