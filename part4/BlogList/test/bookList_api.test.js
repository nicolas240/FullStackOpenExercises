const { test, after, beforeEach,describe  } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogObjects = helper.initialBlogs
    .map(blog=> new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('Apli test, supertest',()=>{
  test('Blog list lenght and json format', async () => {
    let res= await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.strictEqual(res.body.length, helper.initialBlogs.length)
  })
  test('Blog identificator format as id', async () => {
    let newBlog= new Blog(helper.initialBlogs[0])
    newBlog=newBlog.toJSON()
    assert('id' in newBlog && newBlog['_id']===undefined, 'Blog identificator is not formated as id')
  })  
  test('A blog can be added by HTTP POST ', async () => {
    const newBlog = {
      content: 'async/await simplifies making async calls',
      title: 'Prueba0',
      author: 'Carlos0',
      url: 'Prueba0.com',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length,
      helper.initialBlogs.length + 1)
  
    const contents = blogsAtEnd.map(n => n.content)
    assert(contents.includes('async/await simplifies making async calls'))
  })
  test('Blog request without likes', async () => {
    const newBlog = {
      content: 'async/await simplifies making async calls',
      title: 'Prueba3',
      author: 'Carlos3',
      url: 'Prueba3.com',
    }
    let blogSaved=new Blog(newBlog)
    await blogSaved.save()
    await blogSaved.deleteOne()
    assert(blogSaved['likes']===0, 'Blog likes in 0 by default')
  })
  test('Endpoint post without title or url', async () => {
    // without title
    let newBlog = {
      author: 'Carlos0',
      url: 'Prueba0.com',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    // without url
    newBlog = {
      title: 'Prueba0',
      author: 'Carlos0',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    // without both
    newBlog = {
      author: 'Carlos0',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length,
      helper.initialBlogs.length)
  })
  /*test('the first blog is about HTTP methods', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(e => e.content)
    assert(contents.includes('HTML is easy'))
  })
  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    assert.deepStrictEqual(resultBlog.body, blogToView)
  })
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
  
    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
  
    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(r => r.content)
    assert(!contents.includes(blogToDelete.content))
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  }) */
})

after(async () => {
  await mongoose.connection.close()
})