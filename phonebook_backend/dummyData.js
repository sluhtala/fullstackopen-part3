const persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1,
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2,
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3,
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4,
  },
]

const Person = require('./models/person')
const mongoose = require('mongoose')

persons.forEach((p) => {
  let person = new Person(p)
  person
    .save()
    .then(() => {
      console.log(`${p.name} added to database`)
      mongoose.connection.close()
    })
    .catch((e) => {
      console.error(e)
      mongoose.connection.close()
    })
})
