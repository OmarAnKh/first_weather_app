document.addEventListener('DOMContentLoaded', () => {
    const first = document.getElementById('first')
    const seconed = document.getElementById('seconed')
    const theered = document.getElementById('theered')

    const city = document.getElementById('input')
    document.getElementById('search').addEventListener('click', (e) => {
        e.preventDefault();
        fetch('http://localhost:3000/weather?address=' + city.value).then((response) => {

            response.json().then((data) => {
                if (data.error) {
                    first.textContent = 'Error reading the address you provide'
                    seconed.textContent = ''
                    theered.textContent = ''
                } else {
                    first.textContent = 'The temperature is: ' + data.current.temperature
                    seconed.textContent = 'Your location is: ' + data.location.country + ',' + data.location.name
                    theered.textContent = 'the date and time is: ' + data.location.localtime
                }

            })
        })
    })
})
