const { test, after, beforeEach,describe,before } = require('node:test')
const assert = require('node:assert')
const Blog = require('../models/blog')
const User = require('../models/user')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

describe('Apli test, testing several records',()=>{
  before( async ()=>{
      await Blog.deleteMany({})
      await User.deleteMany({})
      const userObject = new User(helper.userTest[0])
      const promiseUser= await userObject.save()

      helper.token=undefined
      const credentials={
        username: "tester",
        password: "123"
      }
      const login = await api
        .post('/api/login')
        .send(credentials)
      helper.token=login.body.token
  })
  beforeEach(async () => {
      //seting blogs
      await Blog.deleteMany({})
      const blogObjects = helper.initialBlogs
        .map(blog=> new Blog(blog))
      const promiseArray = blogObjects.map(blog => blog.save())
      await Promise.all(promiseArray)
  })
  after(async ()=>{
    await Blog.deleteMany({})
    await User.deleteMany({})
    helper.token=undefined
  })

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
  test('Endpoint post without title or url', async () => {
    // without title
    const token = helper.token
    let newBlog = {
      author: 'Carlos0',
      url: 'Prueba0.com',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .set('Authorization',`Bearer ${token}`)
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
      .set('Authorization',`Bearer ${token}`)
      .expect(400)
    // without both
    newBlog = {
      author: 'Carlos0',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .set('Authorization',`Bearer ${token}`)
      .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length,
      helper.initialBlogs.length)
  })
})

describe('Apli test, posting single records',()=>{
  before( async ()=>{
    await Blog.deleteMany({})
    await User.deleteMany({})
    const userObject = new User(helper.userTest[0])
    const promiseUser= await userObject.save()

    helper.token=undefined
    const credentials={
      username: "tester",
      password: "123"
    }
    const login = await api
      .post('/api/login')
      .send(credentials)
    helper.token=login.body.token
  })
  beforeEach(async () => {
      //seting blogs
      await Blog.deleteMany({})
      const blogObjects = helper.initialBlogs
        .map(blog=> new Blog(blog))
      const promiseArray = blogObjects.map(blog => blog.save())
      await Promise.all(promiseArray)
  })
  after(async ()=>{
    await Blog.deleteMany({})
    await User.deleteMany({})
    helper.token=undefined
  })
  
  test('A blog can be added by HTTP POST ', async () => {
    const token = helper.token
    
    const newBlog = {
      content: 'async/await simplifies making async calls',
      title: 'Prueba0',
      author: 'Carlos0',
      url: 'Prueba0.com',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .set('Authorization',`Bearer ${token}`)
      .send(newBlog)
      .expect(201)
    
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
})

describe('Apli test, deleting single records',()=>{
  before( async ()=>{
    await Blog.deleteMany({})
    await User.deleteMany({})
    const userObject = await new User(helper.userTest[0])
    const promiseUser= await userObject.save()

    helper.token=undefined
    const credentials={
      username: "tester",
      password: "123"
    }
    const login = await api
      .post('/api/login')
      .send(credentials)
    helper.token=login.body.token
  })
  beforeEach(async () => {
      //seting blogs
      await Blog.deleteMany({})
      const userObjectsUser = await helper.usersInDb()
      let blogObjects = helper.initialBlogs
        .map(blog=> blog['user']=userObjectsUser[0].id)

      blogObjects = helper.initialBlogs
          .map(blog=> new Blog(blog))
      
      const promiseArray = blogObjects.map(blog => blog.save())
      await Promise.all(promiseArray)
  })
  after(async ()=>{
    await Blog.deleteMany({})
    await User.deleteMany({})
    helper.token=undefined
  })
  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    const token = helper.token
    res=await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization',`Bearer ${token}`)
      .send({content: 'Something'})
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    const contents = blogsAtEnd.map(r => r.content)
    assert(!contents.includes(blogToDelete.content))
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)
  })
})

describe('Apli test, putting single records',()=>{
  before( async ()=>{
    await Blog.deleteMany({})
    await User.deleteMany({})
    const userObject = new User(helper.userTest[0])
    const promiseUser= await userObject.save()

    helper.token=undefined
    const credentials={
      username: "tester",
      password: "123"
    }
    const login = await api
      .post('/api/login')
      .send(credentials)
    helper.token=login.body.token
  })
  beforeEach(async () => {
      //seting blogs
      await Blog.deleteMany({})
      const blogObjects = helper.initialBlogs
        .map(blog=> new Blog(blog))
      const promiseArray = blogObjects.map(blog => blog.save())
      await Promise.all(promiseArray)
  })
  after(async ()=>{
    await Blog.deleteMany({})
    await User.deleteMany({})
    helper.token=undefined
  })
  test('Likes of a publication can be updated', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const newBlog = {
      content: blogToUpdate.content,
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes+1,
    }
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd[0].likes, helper.initialBlogs[1].likes+1)
  })
})

describe('Unauthorized accions',()=>{
  before( async ()=>{
    await Blog.deleteMany({})
    await User.deleteMany({})
    const userObject = await new User(helper.userTest[0])
    const promiseUser= await userObject.save()

    helper.token=undefined
    const credentials={
      username: "tester",
      password: "123"
    }
    const login = await api
      .post('/api/login')
      .send(credentials)
    helper.token=login.body.token
  })
  beforeEach(async () => {
      //seting blogs
      await Blog.deleteMany({})
      const userObjectsUser = await helper.usersInDb()
      let blogObjects = helper.initialBlogs
        .map(blog=> blog['user']=userObjectsUser[0].id)

      blogObjects = helper.initialBlogs
          .map(blog=> new Blog(blog))
      
      const promiseArray = blogObjects.map(blog => blog.save())
      await Promise.all(promiseArray)
  })
  after(async ()=>{
    await Blog.deleteMany({})
    await User.deleteMany({})
    helper.token=undefined
  })
  test('A blog cant be posting without token', async () => {
    const blogsAtStart = await helper.blogsInDb()
    // without title
    let newBlog = {
      title: 'unauthorized',
      author: 'Carlos0',
      url: 'Prueba0.com',
      likes: 0
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
  })
})

after(async () => {
  await mongoose.connection.close()
})