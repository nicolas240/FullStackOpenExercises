/* eslint-disable no-unused-vars */
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
  const [messageAction, setMessageAction] = useState({mess:null,style:null})

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

  const handleDelete=(id)=>{
    personsService.deleteP(id).then(
      setPersons( persons.filter(p=>p.id!==id))
    )
  }

  const handleSubmit=(e)=>{
    e.preventDefault()
    if(newName!=='' & newNumber!==''){
      if(persons.some( person=>person.name===newName )){
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`))
        {
          let idExisted=persons.filter(p=>p.name===newName)[0].id
          let newUpdate={
            id:idExisted,
            name:newName,
            number:newNumber
          }
          personsService.update(newUpdate.id,newUpdate).then(res=>{
            setPersons(persons.map(p=>p.id===res.id?res:p))
            handleAlerts(newName)
          }).catch(error=>{
            handleAlerts(`Information of ${newName} has already been removed from server`,errorStyle)
            setPersons(persons.filter(p=>p.id!==idExisted))
          })        
        }
      }else{
        newPerson()
      }
    }else{
      showAlert('Empty field')
    }
  }

  const handleAlerts=(mess,style=successStyle)=>{
    setMessageAction({mess,style})
    setTimeout(()=>{
      setMessageAction({mess:null,style:null})
    },5000)
  }

  const newPerson =()=>{
    const newPerson ={
      name: newName,
      number: newNumber
    }
    personsService.create(newPerson)
      .then(res =>{
        setPersons(persons.concat(res))
        handleAlerts(newName)
      })   
  }
  const successStyle={
    color: "green",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  const errorStyle={
    color: "red",
    background: "lightgrey",
    fontSize: "20px",
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }
  
  const Notification =({content})=>{
    if (content['mess'] === null) {
      return null
    }
    return (
      <div style={content['style']}>
        {content['mess']}
      </div>
    )
  }

  const showAlert=(text)=>{
    alert(text)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification content ={messageAction}/>
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
      <Persons  
        numbers={persons.filter(
          person=> person.name.toLowerCase().includes(filter.toLowerCase())
        )}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App