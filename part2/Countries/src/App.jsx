/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import countries from './services/countries'
import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countrie, setCountrie] = useState({})
  const [filter, setFilter] = useState('')
  const [messageAction, setMessageAction] = useState({mess:null,style:null})

  useEffect(()=>{
    countriesService.getAll()
      .then(response => {
        setCountries(response)
      })
  },[])
  
  const handleFilterChange =(e)=>{
    setFilter(e.target.value)
  }

  const getCountriesView=()=>{
    if(countries.length>0){
      let toShow=countries.filter(
        c=>c.name.common.toUpperCase()
          .includes(filter.toUpperCase())
      )
      let nCountries=toShow.length
      console.log('cantidad de filtrados::: ', toShow.length)
      if(nCountries>10)
        return <><p>Too many matches, specify another filter</p></>
      else{
        if(nCountries>1){
          return <>
            {toShow.map(c=><p key={c.idd.suffixes[0]}>{c.name.common}</p>)}
          </>
        }else{
          return <>
            {toShow.map(c=><Country key={c.idd.suffixes[0]} country={c}/>)}
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