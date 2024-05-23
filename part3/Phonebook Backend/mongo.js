const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url =
  `mongodb+srv://fullstack:${password}@clusterfullstack.d89wexs.mongodb.net/phonebookApp?retryWrites=true&w=majority&appName=ClusterFullstack`

mongoose.set('strictQuery',false)

mongoose.connect(url)
const personSchema = new mongoose.Schema({
  content: String,
  number: String,
  name: String,
})

const Person = mongoose.model('Person', personSchema)

if(process.argv.length===3){
  Person.find({}).then(result => {
    console.log('Phonebook:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })
}else{
  newName=process.argv[3]
  newNumber=process.argv[4]
  // create new person
  const person = new Person({
    content: 'HTML is easy',
    number: newNumber,
    name: newName,
  })
  person.save().then(result => {
    console.log(`added ${newName} ${newNumber} to phonebook`)
    mongoose.connection.close()
  })
}

