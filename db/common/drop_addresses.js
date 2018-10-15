const tokens = require('../data/tokens.json')
const MongoClient = require('mongodb').MongoClient
const url = process.env.AMP_MONGODB_URL || 'mongodb://localhost:27017'

let client, db, response

const drop = async () => {
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true })
    db = client.db('proofdex')
    response = await db.dropCollection('addresses')

    console.log(response)
  } catch (e) {
    console.log(e.message)
  } finally {
    db.close()
  }
}

drop()