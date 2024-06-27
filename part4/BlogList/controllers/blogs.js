const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)   
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

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    
    const blog = new Blog({
      content: body.content,
      title: body.title,
      author:body.author,
      url: body.url,
      likes: body.likes
    })
    const savedBlog = await blog.save()
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