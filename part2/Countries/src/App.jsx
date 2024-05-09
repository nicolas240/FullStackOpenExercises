/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import weatherService from './services/ninjaApi'
import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesFilter, setCountriesFilter] = useState([])
  const [showContries,setShowContries]=useState([])//booleans to show countries
  const [weatherData,setWeatherData]=useState([])
  const [filter, setFilter] = useState('')

  useEffect(()=>{
    countriesService.getAll()
      .then(response => {
        setCountries(response)
      })
  },[])
  
  const handleFilterChange =(e)=>{
    setFilter(e.target.value)
    let newFilter=e.target.value
    if(newFilter!==''){
      let filtered=countries.filter(
        c=>c.name.common.toUpperCase()
          .includes(newFilter.toUpperCase())
      )
      setCountriesFilter(
        filtered
      )
      setShowContries(
        Array.from(
          {length:filtered.length},
          (_,index)=>false)
      )
      setWeatherData(
        Array.from(
          {length:filtered.length},
          (_,index)=>{})
      )
    }
  }

  const handleShow =(e,index,country,city)=>{
    e.preventDefault()
    console.log('country,city::: ', country,city);
    setShowContries(showContries.map((c,i)=>i===index?!c:c))
    weatherService.getWeather(country,city)
    .then(response => {
      setWeatherData(weatherData.map((w,i)=>i===index?response:w))
    })
    console.log('country,city::: ', country,city);
  }

  const getCountriesView=()=>{
    if(countries.length>0){
      let nCountries=countriesFilter.length
      if(nCountries>10 || nCountries===0)
        return <><p>Too many matches, specify another filter</p></>
      else{
        if(nCountries>1){
          return <>
            {countriesFilter.map((c,i)=>
              <div key={c.idd.suffixes[0]}>
                {c.name.common} <button onClick={(e)=>handleShow(e,i,c.name.common,c.capital[0])}>
                  show
                </button>
                <Country country={c} show={showContries[i]} weatherData={weatherData[i]}/>
              </div>
            )}
          </>
        }else{
          return <>
            {countriesFilter.map(c=><Country key={c.idd.suffixes[0]} country={c}/>)}
          </>
        }
      }
    }
    return <></>
  }
  return (
    <div>
      <Filter
        filter={filter}
        control={handleFilterChange}
      />
      {getCountriesView()}
    </div>
  )
}

export default App