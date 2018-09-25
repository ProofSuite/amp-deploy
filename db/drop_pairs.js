const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

let client

const drop = async () => {
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')
    const response = await db.dropCollection('pairs')
    console.log(response)
  } catch(e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

drop()