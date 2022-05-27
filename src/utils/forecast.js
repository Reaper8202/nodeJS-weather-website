const request = require('postman-request')

const forecast = (longitude, latitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=7e42ef9833e3b315124668c1c10b3c76&query='+latitude+", "+ longitude
    
    request({url, json:true}, (error, {body})=>{
        if (error){
            callback("Unable to connect to weather services", undefined)
        }else if(body.error){
            callback("Unable to find location", undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] +". It is currently "+body.current.temperature+" degrees outisde, but feels like " + body.current.feelslike + " degrees outside")
        }

    })    

}

module.exports = forecast