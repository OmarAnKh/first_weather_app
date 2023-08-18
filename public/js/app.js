document.addEventListener('DOMContentLoaded', () => {
    const feelslike = document.getElementById('feelslike')
    const humidity = document.getElementById('humidity')
    const temperature = document.getElementById('temperature')
    const weather_descriptions = document.getElementById('weather_descriptions')
    const country = document.getElementById('country')
    const localtime = document.getElementById('localtime')
    const timezone_id = document.getElementById('timezone_id')
    const weather_icon = document.getElementById('weather-icon')
    const city = document.getElementById('weather-search')
    weather_icon.style.visibility = "hidden"
    document.getElementById('search-button').addEventListener('click', (e) => {
        e.preventDefault();
        fetch('/weather?address=' + city.value).then((response) => {

            response.json().then((data) => {
                if (data.error) {
                    feelslike.textContent = 'Error reading the address you provide'
                    humidity.textContent = ''
                    temperature.textContent = ''
                    weather_descriptions = ''
                    country = ''
                    localtime = ''
                    timezone_id = ''
                } else {
                    if (!window.matchMedia("(max-width: 600px)")) {
                        weather_icon.style.visibility = "visible"
                        weather_icon.src = data.current.weather_icons[0];
                        temperature.textContent = 'The temperature is: ' + data.current.temperature + '°'
                        feelslike.textContent = 'But it feels like : ' + data.current.feelslike + '°'
                        humidity.textContent = 'The humidity is : ' + data.current.humidity + '%'
                        weather_descriptions.textContent = 'The weather descriptions  : ' + data.current.weather_descriptions[0]
                        country.textContent = 'Your location is: ' + data.location.country + ',' + data.location.name
                        localtime.textContent = 'The time in these city : ' + data.location.localtime
                        timezone_id.textContent = 'The timezone is : ' + data.location.timezone_id
                        console.log(data)
                    } else {
                        weather_icon.src = data.current.weather_icons[0];
                        temperature.textContent = 'The temperature is: ' + data.current.temperature + '°'
                        feelslike.textContent = 'But it feels like : ' + data.current.feelslike + '°'
                        humidity.textContent = 'The humidity is : ' + data.current.humidity + '%'
                        weather_descriptions.textContent = 'The weather descriptions  : ' + data.current.weather_descriptions[0]
                        country.textContent = 'Your location is: ' + data.location.country + ',' + data.location.name
                        localtime.textContent = 'The time in these city : ' + data.location.localtime
                        timezone_id.textContent = 'The timezone is : ' + data.location.timezone_id
                        console.log(data)
                    }
                }

            })
        })
    })
})
