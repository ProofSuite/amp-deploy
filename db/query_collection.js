const MongoClient = require('mongodb').MongoClient
const argv = require('yargs').argv
const { getMongoURI } = require('../utils/helpers')

const mongoUrl = argv.mongo_url || 'mongodb://localhost:27017'
const mongoUsername = argv.mongo_username
const mongoPassword = argv.mongo_password
const environment = argv.amp_environment
const collection = argv.collection

let mongoURI

if (mongoUsername && mongoPassword) {
  mongoURI = getMongoURI(mongoUsername, mongoPassword, environment)
} else {
  mongoURI = mongoUrl 
}


let client, db

const query = async () => {
  try {
    client = await MongoClient.connect(mongoURI, { useNewUrlParser: true })
    db = client.db('proofdex')

    const response = await db.collection(collection).find().toArray()
    console.log(response)

  } catch (e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

query()