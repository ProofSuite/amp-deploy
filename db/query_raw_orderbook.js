const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const query = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')
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
    console.log(e)
  }
}

query()