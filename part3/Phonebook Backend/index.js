const express = require('express')
const app = express()
app.use(express.json())

let persons=[
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]

const generateId = async  () => {
  const newId = Math.floor(Math.random()*10000+1)
  if(persons.some(p=>p.id===newId))
    return await generateId()
  else
    return newId
}

app.post('/api/persons', async (request, response) => {
  const body = request.body
  let newId = await generateId()
  const person = {
    id: newId,
    name: body.name || null,
    number: body.number || null
  }
  persons = persons.concat(person)
  response.json(person)
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)
  if (person) {
      response.json(person)
    } else {
      response.status(404).end()
    }
})

app.get('/api/persons', (request, response) => {
  if (persons) {
      response.json(persons)
  }else {
      response.status(404).end()
  }
})

app.get('/info', (request, response) => {
  let message =`<p>
   Phonebook has info form ${persons.length} people<br> ${Date().toString()}
  </p>`
  response.send(message)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})