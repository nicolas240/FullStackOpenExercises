import { useState, useEffect } from 'react'
import personsService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

useEffect(()=>{
  personsService.getAll()
    .then(response => {
      setPersons(response)
    })
},[])

  const handleNameChange =(e)=>{
    setNewName(e.target.value)
  }

  const handleNumberChange =(e)=>{
    setNewNumber(e.target.value)
  }
  
  const handleFilterChange =(e)=>{
    setFilter(e.target.value)
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(newName!=='' & newNumber!==''){
      persons.some( person=>person.name===newName )?
      showAlert(`${newName} is already added to phonebook`):newPerson()
    }else{
      showAlert('Empty field')
    }
  }
  const newPerson =()=>{
    const newPerson ={
      name: newName,
      number: newNumber
    }
    personsService.create(newPerson)
      .then(res =>{
        setPersons(persons.concat(res))
      })
    //setPersons(persons.concat(newPerson))
  }

  const showAlert=(text)=>{
    alert(text)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter control={handleFilterChange} filter={filter}
      />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />
      <Persons  numbers={persons.filter(
        person=> person.name.toLowerCase().includes(filter.toLowerCase())
      )}/>
    </div>
  )
}

export default App