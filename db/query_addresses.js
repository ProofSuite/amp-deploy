const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

let client, db

const query = async () => {
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true })
    db = client.db('proofdex')

    const response = await db.collection('accounts').find({}).project({ address: 1, _id: 0 }).toArray()
    const addresses = response.map(elem => elem.address)
    console.log(addresses)
  } catch (e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

query()