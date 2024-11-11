const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.post('/', async (request, response) => {
  const {username,name,password} = request.body
  
  //using bcrupt for exersice 4.15:
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password,saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await user.save()
  response.status(201).json(savedUser)
})
usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate(
      'blogs',
      { 
        content: 1,
        title: 1,
        author: 1,
        url: 1,
        likes: 1
      }
    )
  //fin 4.15
  response.json(users)
})

module.exports = usersRouter