const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017'

let client, db, response

const drop = async () => {
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true })
    db = client.db('proofdex')
    response = await db.dropCollection('tokens')
    console.log(response)
  } catch(e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

drop()