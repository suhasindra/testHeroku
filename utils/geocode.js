const request = require('postman-request')

const geocode = (location, callback)=>{
    const urlMapBox = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ location + '.json?access_token=pk.eyJ1Ijoic3VoYXNpbmRyYSIsImEiOiJja212cDZudHAwN2QyMnJxc2RrMHVwNDV5In0.v5wpp990GO4sjZgbHu8EhQ'
    request({url:urlMapBox,json:true},(error, response)=>{
        if(error) {
            callback('Error connecting to server', undefined)
        }
        else if(response.body.features.length === 0) {
            callback('Error getting the address. Try another search!', undefined)
        }
        else {
            callback(undefined, {lat: response.body.features[0].center[1], long: response.body.features[0].center[0], place: response.body.features[0].place_name})
        }
    })
}
module.exports=geocode