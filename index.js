const apiKey = '1e5ebb6e690bffb4ffb0e5f3a78ea449'
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

const searchInput = document.querySelector('.search input')
const searchButton = document.querySelector('.search button')
const weatherIcon = document.querySelector('.weather-icon')

async function checkWeather(city) {
	const response = await fetch(apiUrl + city + `&appid=${apiKey}`)

	// Checking if the city name is valid
	if (!response.ok) {
		document.querySelector('.error').style.display = 'block'
		document.querySelector('.weather').style.display = 'none'
		return
	} else {
		document.querySelector('.error').style.display = 'none'
	}

	let data = await response.json()

	// Changing text
	document.querySelector('.city').innerHTML = data.name
	document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°'
	document.querySelector('.humidity').innerHTML = data.main.humidity + '%'
	document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h'

	// Changing image
	if (data.weather[0].main == 'Clouds') {
		weatherIcon.src = 'images/clouds.png'
	} else if (data.weather[0].main == 'Clear') {
		weatherIcon.src = 'images/clear.png'
	} else if (data.weather[0].main == 'Rain') {
		weatherIcon.src = 'images/rain.png'
	} else if (data.weather[0].main == 'Drizzle') {
		weatherIcon.src = 'images/drizzle.png'
	} else if (data.weather[0].main == 'Mist') {
		weatherIcon.src = 'images/mist.png'
	} else if (data.weather[0].main == 'Snow') {
		weatherIcon.src = 'images/snow.png'
	}

	document.querySelector('.weather').style.display = 'block'
}

// Checking for search button click
searchButton.addEventListener('click', () => {
	checkWeather(searchInput.value)
})
