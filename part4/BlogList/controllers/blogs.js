const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

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

blogsRouter.post('/',middleware.userExtractor,async (request, response, next) => {
  const body = request.body
  const user= request.user
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

blogsRouter.delete('/:id', middleware.userExtractor,async (request, response,next) => {
  blogUser=request.user
  blogToDelete=await Blog.findById(request.params.id)
  blogOwner=await User.findById(blogToDelete.user.toString())
  if (blogOwner.toString() === blogUser.toString()){
    await Blog.deleteOne(blogToDelete)
    response.status(204).end()
  }
  else{
   response.status(401).json({ error: 'User is not allow to delete Blogs than belong to others clients'})
  }
})

module.exports = blogsRouter