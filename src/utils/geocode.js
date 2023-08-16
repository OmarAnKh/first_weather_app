const req = require('postman-request');
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib21hcmFua2giLCJhIjoiY2xsNHd0N3owMGJraDNrbGFxaWJoM2wzZCJ9.by_2A7C0maKUnMuMu-TMBQ&limit=1'
    req({ url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to locationm services!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, {
                latitude: response.body.features[0].geometry.coordinates[1],
                longitude: response.body.features[0].geometry.coordinates[0],
                location: response.body.features[0].place_name,
            })
        }
    })
}

module.exports = geocode