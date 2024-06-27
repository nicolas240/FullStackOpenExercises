const Blog = require('../models/blog')

const initialBlogs = [
    {
      content: 'HTML is easy',
      title: 'Prueba1',
      author: 'Carlos1',
      url: 'Prueba1.com',
      likes: 1  
    },
    {
      content: 'Browser can execute only JavaScript',
      title: 'Prueba2',
      author: 'Carlos2',
      url: 'Prueba2.com',
      likes: 2
    }
  ]

const nonExistingId = async () => {
  const blog = new Blog({ content: 'willremovethissoon' })
  await blog.save()
  await blog.deleteOne()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, nonExistingId, blogsInDb
}