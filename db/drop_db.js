const MongoClient = require('mongodb').MongoClient
const argv = require('yargs').argv
const { getMongoURI } = require('../utils/helpers')

const mongoUrl = argv.mongo_url || 'mongodb://localhost:27017'
const mongoUsername = argv.mongo_username
const mongoPassword = argv.mongo_password
const environment = argv.amp_environment

let mongoURI

if (mongoUsername && mongoPassword) {
  mongoURI = getMongoURI(mongoUsername, mongoPassword, environment)
} else {
  mongoURI = mongoUrl 
}

let client, db, response

const drop = async () => {
  try {
    client = await MongoClient.connect(mongoURI, { useNewUrlParser: true })
    db = client.db('proofdex')
    response = await db.dropDatabase()

    client.close()
    console.log(response)
  } catch (e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

drop()