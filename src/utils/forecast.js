const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const url=`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&units=metric&appid=b3a9be93b58644756f18026ad5bcd544`;
    request({url, json:true}, (error, response) => {
        if(error){
            callback('Unable to connect to weather Services!', undefined)
        }else if(response.body.error){
            callback('Unable to find Loaction. Try another search', undefined)
        }else{
            callback(undefined, {
                temperature:response.body.current.temp,
                humidity:response.body.current.humidity
            })
        }
    })
}

module.exports = forecast