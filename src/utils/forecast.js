const req = require('postman-request');
const forecast = ({ latitude, longitude }, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=c3b0495c21674667dfda5d37b816ac4e&query=' + encodeURIComponent(latitude) + ',' + encodeURIComponent(longitude)
    req({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to the server!', undefined);
        } else if (response.body.error) {
            callback('Unable to find location!', undefined);
        } else {
            callback(undefined, response.body);
        }
    })
}
module.exports = forecast;