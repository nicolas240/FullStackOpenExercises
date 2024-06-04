const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

/* blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    content: body.content,
    important: body.important,
  }

  const updatedNote = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedNote)
}) */

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
    /* const body = request.body

  const blog = new Blog({
    content: body.content,
    important: body.important || false,
  })

  const savedNote = await blog.save()
  response.status(201).json(savedNote) */
})

/* blogsRouter.get('/:id', async (request, response) => {
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
}) */

module.exports = blogsRouter