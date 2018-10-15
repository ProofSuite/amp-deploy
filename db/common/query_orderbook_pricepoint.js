const MongoClient = require('mongodb').MongoClient
const url = process.env.AMP_MONGODB_URL || 'mongodb://localhost:27017'
const utils = require('ethers').utils

const query = async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true })
  const db = client.db('proofdex')

  const pairs = await db.collection('pairs').find().toArray()
  const pair = pairs[0]
  const pricepoint = "59303"

  console.log(pair)

  const result = await db.collection('orders').aggregate([
    { $match: {
      "status": { $in: [ "OPEN", "PARTIALLY_FILLED" ]},
      "baseToken": utils.getAddress(pair.baseTokenAddress),
      "quoteToken": utils.getAddress(pair.quoteTokenAddress),
      "pricepoint": pricepoint
    }},
    {
      $project: {
        "_id": 0,
        "pricepoint": "$pricepoint",
        "volume": { $toString: { $sum: { $toDecimal: "$amount" } } },
      }
    }
  ]).toArray()

  console.log(result[0])
}

query()