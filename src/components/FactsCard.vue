<template>
  <div class="facts-card">
    <slot></slot>
  </div>
</template>

<script></script>

<style lang="sass" scoped>

.facts-card
	width: 700px
	height: 50px
	padding: 10px 30px
	background-color: $main
	font-size: $small
	border-radius: $default
	margin-bottom: 20px
	display: flex
	align-items: center
</style>
