const express = require('express')
const path = require('path')
const fs = require('fs');
const hbs = require('hbs');
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')



const app = express()
const port = process.env.PORT || 3000


const publicPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.use(express.static(publicPath))
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialsPath)



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Omar'
    })
})




app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        name: 'Omar khalili'
    })
})

app.get('/about', (req, res) => {
    res.render('About', {
        title: "About me",
        name: "Omar Khalili"
    })

})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address term'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(data, (error, forecastData) => {
            if (error) {
                return res.send({
                    error
                })
            }
            const JSONdata = JSON.stringify(forecastData)
            fs.writeFileSync('./src/forecast.json', JSONdata);
            res.send(forecastData)
        })
    })
})


app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    const obj = fs.readFileSync('./src/forecast.json');
    const JSONdata = obj.toString();
    const data = JSON.parse(JSONdata)
    res.send(data)
})



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "Help article not found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: "404"
    })
})

app.listen(port, () => {
    console.log('server is up on port ' + port)
})