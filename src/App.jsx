import hotBg from './assets/sunny_weather.jpeg'
import coldBg from './assets/snowy_weather.jpg'
import Descriptions from './components/Descriptions'
import { useEffect,useState } from 'react'
import { getWeatherData } from './weatherService'

function App() {

  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState('metric')
  const [city, setCity] = useState('Kolkata')
  const [bg, setBg] = useState(hotBg)
  useEffect(() => {
    const fetchMe=async()=>{
      const data=await getWeatherData(city,units)
      setWeather(data)
      const threshold=units==='metric'?'20':'60'
  
      if(data.temp<=threshold) setBg(coldBg)
      else setBg(hotBg)
    }
    fetchMe()


  }, [units,city])
  
  const onClickHandler=()=>{
    setUnits(units==='metric'?'imperial':'metric')
  }

  const enterKeyPressed=(e)=>{
    if(e.keyCode===13){
      setCity(e.currentTarget.value)
      e.currentTarget.blur()
    }
  }

  return (
    <>
      <div className="app" style={{backgroundImage:`url(${bg})`,backgroundRepeat:'no-repeat',backgroundSize:'cover'}}>
        <div className="overlay">
          {weather && (
          <div className="container">
            <div className="section section__inputs">
              <input onKeyDown={enterKeyPressed} type="text" name='city' placeholder='Enter City'/>
              <button onClick={onClickHandler}>°{`${units==='metric'?'C':'F'}`}</button>
            </div>
            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name},${weather.country}`}</h3>
                <img src={`${weather.iconURL}`} alt="weatherIcon" />
                <h3>{`${weather.description}`}</h3>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()}°${units==='metric'?'C':'F'}`}</h1>
              </div>
            </div>
              <Descriptions weather={weather} units={units}/>
          </div>
          )}
        </div>
      </div>
    </>
  )
}

export default App
