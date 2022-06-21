<template>
  <header class="header">
    <div class="header__logo">
      <router-link class="header__logo-link" to="/">
        <img
          class="header__logo-img"
          src="@/assets/icons/main-logo.png"
          alt="main-logo"
        />
        forecast.
      </router-link>
    </div>
    <router-link class="header__history" to="/history">
    История погоды
    </router-link>
    <search-form @findWeatherInCity="findWeather" />
  </header>
</template>

<script>
import SearchForm from "@/components/SearchForm";

export default {
  components: {
    SearchForm,
  },

  setup(_, { emit }) {
    const findWeather = (name, date) => {
      emit("findWeatherInCity", name, date);
    };

    return {
      findWeather,
    };
  },
};
</script>

<style lang="sass" scoped>

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

	&__history
		padding: 5px 15px
		font-size: $small
		color: black
		background: white
		opacity: 0.7
		border-radius: 5px
</style>
