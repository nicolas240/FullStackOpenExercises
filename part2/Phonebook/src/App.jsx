import { useState } from 'react'
import Persons from './components/Persons'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
    setPersons(persons.concat(newPerson))
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