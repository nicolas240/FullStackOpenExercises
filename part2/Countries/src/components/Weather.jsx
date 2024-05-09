
const Header = ({ header }) => <h2>{header}</h2>
const WeatherData =({data})=>{
  return <div>
    <p>temperature: {data.temp} </p>
    <p>max temperature: {data.max_temp} </p>
    <p>min temperature: {data.min_temp} </p>
    <p>wind speed: {data.wind_speed} </p>
    <p>wind degrees: {data.wind_degrees} </p>
    <p>humidity: {data.humidity} </p>
  </div>
}

const  Weather = ({ capital, weatherData}) => {
  if(capital && weatherData){
    return (
      <>
        <div>
          <Header header={`Weather in ${capital}`}></Header>
          <WeatherData data={weatherData}
          ></WeatherData>
        </div>
      </>
    )
  }
  return <></>
}

export default Weather