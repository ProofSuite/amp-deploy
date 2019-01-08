const MongoClient = require('mongodb').MongoClient
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

let client, db

const query = async () => {
  try {
    client = await MongoClient.connect(mongoURI, { useNewUrlParser: true })
    db = client.db('proofdex')

    const pairs = await db.collection('pairs').find().toArray()
    const pair = pairs[0]
    const query = {
      "status": { $in: [ "OPEN", "PARTIALLY_FILLED" ]},
      "baseToken": pair.baseTokenAddress,
      "quoteToken": pair.quoteTokenAddress
    }

    const response = await db.collection('orders').find(query).toArray()
    console.log(response)

  } catch (e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

query()