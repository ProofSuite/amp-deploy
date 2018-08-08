const tokens = require('../tokens.json')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

(async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true })

  const db = client.db('proofdex')
  const response = await db.dropCollection('trades')
  console.log(response)

})()