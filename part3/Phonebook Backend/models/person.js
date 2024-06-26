const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
// eslint-disable-next-line no-undef
const url = process.env.MONGODB_URI
console.log('connecting to', url)

mongoose.connect(url)
  .then(()=> {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })
const personSchema = new mongoose.Schema({
  content: {// Validación del campo
    type: String,
    minLength: [5,'Must be at least 5 characters long'],
    required: true
  },
  number: {
    minLength: [8,'Must be at least 8 characters long'],
    type: String,
    required: [true, 'Number required'],
    validate: {
      validator: function(v){
        let parts=v.split('-')
        if(parts.length!==2){
          return false
        }else{
          if(parts[0].length>1 & parts[0].length <4){
            return true
          }else{
            return false
          }          
        }
/*         return /\d{3}-\d/.test(v) || /\d{2}-\d/.test(v); */
      },
      message: props=>`${props.value} is not a valid phone number!`
    }
  },
  name: {
    type: String,
    minLength: [3,'Must be at least 3 characters long, got {VALUE}'],
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