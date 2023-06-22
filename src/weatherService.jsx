const API_KEY='fd45e32565377e071e619910132c09c0'

const makeIconUrl=(iconId)=>`https://openweathermap.org/img/wn/${iconId}@2x.png`

const getWeatherData=async(city,units='metric')=>{
    const URL=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`

    const data=await fetch(URL).then(res=>res.json())

    const {
        weather,
        main:{temp,temp_min,temp_max,feels_like,pressure,humidity},
        wind:{speed},
        sys:{country},
        name
      }=data

      const{description,icon}=weather[0]

      return {
        description,
        iconURL:makeIconUrl(icon),
        temp,
        temp_min,
        temp_max,
        feels_like,
        pressure,
        humidity,
        speed,
        country,
        name
      }
}

export {getWeatherData}