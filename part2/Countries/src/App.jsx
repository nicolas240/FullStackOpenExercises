/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import countriesService from './services/countries'
import Filter from './components/Filter'
import Country from './components/Country'

const App = () => {
  const [countries, setCountries] = useState([])
  const [countriesFilter, setCountriesFilter] = useState([])
  const [showContries,setShowContries]=useState([])//booleans to show countries
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
    }
  }

  const handleShow =(e,index)=>{
    e.preventDefault()
    setShowContries(showContries.map((c,i)=>i===index?!c:c))
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
                {c.name.common} <button onClick={(e)=>handleShow(e,i)}>
                  show
                </button>
                <Country country={c} show={showContries[i]}/>
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