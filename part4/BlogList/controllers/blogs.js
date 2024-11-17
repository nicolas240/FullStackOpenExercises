const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

/* const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    return authorization.replace('Bearer ', '')
  }
  return null
} */

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({})
      .populate(
        'user',
        { username: 1, name: 1 }
      )
    response.json(blogs)   
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body 
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    body,
     { new: true })
  response.json(updatedBlog)
})

blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  /* const decodedToken = jwt.verify(getTokenFrom(request), process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'token invalid' })
  } */

  const count = await User.countDocuments().exec();
  if (count === 0) return null; // No documents in the collection
  const randomIndex = Math.floor(Math.random() * count);

  const user= await User.findOne().skip(randomIndex)
  const blog = new Blog({
    content: body.content,
    title: body.title,
    author:body.author,
    url: body.url,
    likes: body.likes,
    user: user.id
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()
  response.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response,next) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

module.exports = blogsRouter