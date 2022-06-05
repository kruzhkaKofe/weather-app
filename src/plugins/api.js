import axios from 'axios'

const API_KEY = 'e7048f0fbd8c4cb8853125913221403'

export default axios.create({
		methods: 'GET',
		url: 'http://api.weatherapi.com/v1/forecast.json',
		params: {
			key: API_KEY,
			lang: 'ru',
		}
})