
const request = require('postman-request')

const forecast = (lat,long, callback)=>{
    const url = "http://api.weatherstack.com/current?access_key=585617b836440c4c0d66dda8bff5f36d&query="+ lat+ ','+long +"&units=m"
    request({url:url, json: true}, (error, response)=>{
        if(error){
            callback("Unable to connect to server", undefined)
        }
        else if(response.body.error) {
            console.log(error)
            callback("Unable to parse the weather", undefined)
        }
        else {
            const data = response.body.current
            callback(undefined, data.temperature + " but feels like " + data.feelslike)
        }
    })
}
module.exports=forecast