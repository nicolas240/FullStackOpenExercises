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

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(newName!==''){
      persons.some( person=>person.name===newName )?
      showAlert(`${newName} is already added to phonebook`):newPerson()
    }else{
      showAlert('Field void')
    }
  }
  const newPerson =()=>{
    const newPerson ={
      name: newName
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