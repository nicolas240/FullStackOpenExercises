import { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'040-1234567' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const handleNameChange =(e)=>{
    setNewName(e.target.value)
  }

  const handleNumberChange =(e)=>{
    setNewNumber(e.target.value)
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
      <form onSubmit={handleSubmit}>
        <div>
          name: 
          <input value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <Numbers numbers={persons} />
    </div>
  )
}

export default App