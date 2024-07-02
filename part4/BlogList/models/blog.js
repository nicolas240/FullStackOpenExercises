const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.set('strictQuery',false)
// eslint-disable-next-line no-undef
const url = config.MONGODB_URI
console.log('config.MONGODB_URI::: ', config.MONGODB_URI);
console.log('connecting to', url)

mongoose.connect(url)
  .then(()=> {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })
const blogSchema = new mongoose.Schema({
  content: {// Validación del campo
    type: String,
    required: true
  },
  title: String,
  author: String,
  url: String,
  likes: {type: Number, default: 0}
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)