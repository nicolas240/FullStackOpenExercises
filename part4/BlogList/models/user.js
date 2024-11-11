const mongoose = require('mongoose')
const config = require('../utils/config')

mongoose.set('strictQuery',false)
// eslint-disable-next-line no-undef
const url = config.MONGODB_URI
console.log('config.MONGODB_URI::: ', config.MONGODB_URI);
console.log('connecting to Users Schema', url)

mongoose.connect(url)
  .then(()=> {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true // esto asegura la unicidad de username, ya que mongoose no proporciona una manera directa
  },
  name: String,
  passwordHash: String,
  blogs:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'Blog'
  }],
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    // Se borra el hash del password
    delete returnedObject.passwordHash
  }
})

module.exports = mongoose.model('User', userSchema)