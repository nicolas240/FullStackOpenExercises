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
/* 
const generateId = () => {
  const maxId = notes.length > 0
    ? Math.max(...notes.map(n => n.id))
    : 0
  return maxId + 1
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  if (!body.content) {
    return response.status(400).json({ 
      error: 'content missing' 
    })
  }
  const person = {
    content: body.content,
    important: Boolean(body.important) || false,
    id: generateId(),
  }
  notes = notes.concat(note)
  response.json(note)
})*/

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
  console.log(request)
  let message =`<p>
   Phonebook has info form ${persons.length} people<br> ${Date().toString()}
  </p>`
  response.send(message)
})

/* app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
}) */

const PORT = 3001
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`)
})