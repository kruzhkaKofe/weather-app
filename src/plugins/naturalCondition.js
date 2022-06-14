export const windDirection = (dir) => {
	if (dir === 'N') {
		return ['transform: rotate(0deg)', 'С']
	}
	if (dir === 'NNE' || dir === 'NE' || dir === 'ENE') {
		return ['transform: rotate(45deg)', 'СВ']
	}
	if (dir === 'NNW' || dir === 'NW' || dir === 'WNW') {
		return ['transform: rotate(-45deg)', 'СЗ']
	}
	 if (dir === 'S') {
		return ['transform: rotate(180deg)', 'Ю']
	}
	if (dir === 'SSE' || dir === 'SE' || dir === 'ESE') {
		return ['transform: rotate(135deg)', 'ЮВ']
	}
	if (dir === 'SSW' || dir === 'SW' || dir === 'WSW') {
		return ['transform: rotate(-135deg)', 'ЮЗ']
	}
	if (dir === 'E') {
		return ['transform: rotate(90deg)', 'В']
	}
	 if (dir === 'W') {
		return ['transform: rotate(-90deg)', 'З']
	}
}

export const windSpeedFormated = (speed) => {
	return (speed * 1000 / 3600).toFixed(1)
}

export const averageWindSpeed = (arrayOfWindSpeed) => {
	let myArr = []
	const windArr = arrayOfWindSpeed
	windArr.forEach(h => {
		myArr.push(Math.floor(h.wind_kph))
	})
	myArr.sort((a, b) => a - b).splice(1, 22)
	return `${myArr[0]} - ${myArr[1]}`
}

export const mmPressure = (mbPressure) => {
 return	Math.round(mbPressure * 0.75006156)
}

export const timeWithoutData = (time) => {
	const minutes = (new Date(time).getMinutes()).toString().padStart(2, '0')
	const hours = (new Date(time).getHours()).toString().padStart(2, '0')
	return`${hours}:${minutes}`
}

export const filteredHours = (hour) => {
	return hour.filter(obj => obj.time === '00:00' || obj.time === '06:00' || obj.time === '12:00' || obj.time === '18:00')
}

export const dayPart = (time) => {
	switch(time) {
		case '00:00':
			return 'Ночью';
		case '06:00':
			return 'Утром';
		case '12:00':
			return 'Днем';
		case '18:00':
			return 'Вечером';
	}
}
