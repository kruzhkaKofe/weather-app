<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>

</script>

<style lang="sass">
@import "@/styles/variables.sass"

*
  margin: 0
  padding: 0
  box-sizing: border-box

a
  display: block
  text-decoration: none
  cursor: pointer

body
  background-color: $body

.app
  display: flex
  flex-direction: column
  justify-content: center
  align-items: center
  
.inner-wrapper
  max-width: 1440px
  width: 100%

  &--wide
    display: flex
    justify-content: center
    width: 100%
    background: $main

.secondary-text
  opacity: 0.7

</style>
