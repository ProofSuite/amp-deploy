const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const query = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')
    const response = await db.collection('tokens').find().toArray()
    console.log(response)
  } catch (e) {
    console.log(e)
  }
}

query()