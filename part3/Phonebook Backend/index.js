require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()
const Person = require('./models/person')

morgan.token('post',(req)=>{
  let message
  if(req.method==='POST'){
    let log=Object.fromEntries(
      Object.entries(req.body).filter(
        (([key,value])=>key!=='content')
      )
    )
    return JSON.stringify(log)
  }
  if(req.method==='PUT'){
    return JSON.stringify(req.body)
  }
  return ''
})

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post'))
app.use(cors())
app.use(express.static('dist'))

const generateId = async  () => {
  const newId = Math.floor(Math.random()*10000+1)
  if(persons.some(p=>p.id===newId))
    return await generateId()
  else
    return newId
}

//post to add person on Phonebook
app.post('/api/persons', (request, response, next) => {
  const body = request.body
  // create new person
  const person = new Person({
    content: body.content,
    number: body.number,
    name: body.name,
  })
  person.save().then(result => {
    response.json(result)
  })
    .catch(error=>next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id).then(person => {
    if(person){
      response.json(person)
    }else{
      response.status(404).end()
    }
  })
  .catch(error=>{
    next(error)
  })
})

app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })  
})

app.get('/info', async (request, response) => {
  let length =await Person.countDocuments()
  let message =`<p>
   Phonebook has info form ${length} people<br> ${Date().toString()}
  </p>`
  response.send(message)
})

// 3.15 delete in Backend
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndDelete(request.params.id)
  .then(result => {
    response.status(204).end()
  })
  .catch(error => next(error))
})
//3.17 put in person
app.put('/api/persons/:id', async (request, response, next) => {
  const {content, number, name} = request.body
  await Person.findOneAndUpdate(
    { name: name},
    {content, number, name},
    {runValidators: true, context: 'query' },
  )
  .then(updatedPerson => {
    response.json(updatedPerson)
  })
  .catch(error => next(error))
})


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// controlador de solicitudes con endpoint desconocido
app.use(unknownEndpoint)

//3.16 middleware error handler
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError'){
    return response.status(400)
      .json({
        error: error.message
      })
  }
  next(error)
}

// este debe ser el último middleware cargado, ¡también todas las rutas deben ser registrada antes que esto!
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})