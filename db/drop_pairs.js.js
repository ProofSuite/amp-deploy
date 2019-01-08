const MongoClient = require('mongodb').MongoClient
const argv = require('yargs').argv
const { getMongoURI } = require('../utils/helpers')

const mongoUrl = argv.mongo_url || 'mongodb://localhost:27017'
const mongoPassword = argv.mongo_password
const mongoUsername = argv.mongo_usernam

console.log(mongoUsername, mongoPassword)

let mongoURI

if (mongoUsername && mongoPassword) {
  mongoURI = getMongoURI(mongoUsername, mongoPassword, environment)
} else {
  mongoURI = mongoUrl 
}

console.log(mongoURI)

let client, db, response

const drop = async () => {
  try {
    client = await MongoClient.connect(mongoURI, { useNewUrlParser: true })
    db = client.db('proofdex')
    response = await db.dropCollection('pairs')
    console.log(response)
  } catch(e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

drop()