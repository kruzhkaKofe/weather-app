import axios from 'axios'

const API_KEY = 'e7048f0fbd8c4cb8853125913221403'

export const weatherLoader = (name) => axios.request({
	method: 'GET',
	url: 'http://api.weatherapi.com/v1/forecast.json',
	params: {
		key: API_KEY,
		q: name,
		lang: 'ru',
		days: '3',
	},
})

