const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoicG9rZWh1eTExIiwiYSI6ImNrbjR0d2NlbDFrb2Yyb3FpZHRmN3B2eWoifQ.b0kItQWpj7wVkPp1xYdoqw'
    request({url, json: true}, (error, { body }) => {                        //old version without destructuring: request({url: url, json: true}, (error, response) => {  
        if(error){        
            callback('Unable to connect to the location service!', undefined)
        } else if (body.features.length === 0){                      //old version without destructuring: } else if (response.body.features.length === 0){
            callback('Unable to find the location by mapbox API', undefined)
        } else {
            callback(undefined,{                                      // old version without destructuring:
                place: body.features[0].place_name,                   // place: response.body.features[0].place_name, 
                longitude: body.features[0].center[0],                // longitude: response.body.features[0].center[0],
                latitude: body.features[0].center[1]                  // latitude: response.body.features[0].center[1]
            })
        }
    })
}
/* //1.way to code callback function
const print = (error, data) => {
    console.log('Error ', error)
    console.log('Data ', data)
}

geocode('Hanoi', print)

// short way to write a callback function

geocode ('Hanoi', (error, data) => {
    console.log('Error ', error)
    console.log('Data ', data)
})

*/

module.exports = geocode
