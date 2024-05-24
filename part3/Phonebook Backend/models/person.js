const mongoose = require('mongoose')

mongoose.set('strictQuery',false)

const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })
const personSchema = new mongoose.Schema({
  content: {// Validación del campo
    type: String,
    minLength: [5,'Must be at least 5, got {VALUE}'],
    required: true
  },
  number: {
    minLength: [8,'Must be at least 8, got {VALUE}'],
    type: String,
    required: [true, 'Number required'],
    validate: {
      validator: function(v){
        return /\d{3}-\d/.test(v) || /\d{2}-\d{3}/.test(v);
      },
      message: props=>`${props.value} is not a valid phone number!`
    }
  },
  name: {
    type: String,
    minLength: [3,'Must be at least 3, got {VALUE}'],
    required: [true, 'Name required']
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)