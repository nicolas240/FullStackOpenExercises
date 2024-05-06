import { useState } from 'react'
import Numbers from './components/Numbers'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameCHange =(e)=>{
    setNewName(e.target.value)
  }

  const newPerson =(e)=>{
    e.preventDefault()
    const newPerson ={
      name: newName
    }
    setPersons(persons.concat(newPerson))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={newPerson}>
        <div>
          name: 
          <input value={newName}
            onChange={handleNameCHange}
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