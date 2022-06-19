const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря']

const dateDay = (day) => {
	return new Date(day.date)
}

export const week = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота']

export const numOfDay = (day) => {
	return dateDay(day).getDay()
}

export const dateOfDay = (day) => {
	return dateDay(day).getDate()
}

export const dayOfDay = (day) => {
	return new Date().getDay() === numOfDay(day) ? 'сегодня' : week[numOfDay(day)]
}

export const monthOfDay = (day) => {
	return month[dateDay(day).getMonth()]
}