const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=12108875fe2077d06b8f9cdf3e6045b0&query=' + latitude + ',' + longitude 
    request({url, json: true}, (error, { body }) => {                       // old version without destructuring: request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to connect to the location service', undefined)
        } else if(body.error){                                           // old version without destructuring will have response before body
            callback('Unable to find the location by weather API', undefined)
        } else {
            callback(undefined,'It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.') // old version without destructuring will have response before body
        }
    })
}

module.exports = forecast