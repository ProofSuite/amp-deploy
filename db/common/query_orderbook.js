const MongoClient = require('mongodb').MongoClient
const url = process.env.AMP_MONGODB_URL || 'mongodb://localhost:27017'
const utils = require('ethers').utils

let client, db

const query = async () => {
  try {
    client = await MongoClient.connect(url, { useNewUrlParser: true })
    db = client.db('proofdex')

    const pairs = await db.collection('pairs').find({ 'baseTokenSymbol': 'PRFT' }).toArray()
    console.log(pairs)
    const pair = pairs[0]

    const bids = await db.collection('orders').aggregate([
      { $match: {
        "status": { $in: [ "OPEN", "PARTIALLY_FILLED" ]},
        "baseToken": utils.getAddress(pair.baseTokenAddress),
        "quoteToken": utils.getAddress(pair.quoteTokenAddress),
        "side": "BUY"
      }},
      {
        $group: {
          "_id": "$pricepoint",
          "amount": {
            $sum: {
              $subtract: [ { $toDecimal: "$amount" } , { $toDecimal: "$filledAmount" }]
            },
          },
        },
      },
      {
        $sort: {
          "_id": 1
        }
      },
      {
        $project: {
          "_id": 0,
          "pricepoint": "$_id",
          "amount": { $toString: "$amount" }
        }
      }
    ]).toArray()

    const asks = await db.collection('orders').aggregate([
      { $match: {
        "status": { $in: [ "OPEN", "PARTIALLY_FILLED" ]},
        "baseToken": utils.getAddress(pair.baseTokenAddress),
        "quoteToken": utils.getAddress(pair.quoteTokenAddress),
        "side": "SELL"
      }},
      {
        $group: {
          "_id": "$pricepoint",
          "amount": {
            $sum: {
              $subtract: [ { $toDecimal: "$amount" }, { $toDecimal: "$filledAmount" }]
            },
          },
        },
      },
      {
        $sort: {
          "_id": 1
        }
      },
      {
        $project: {
          "_id": 0,
          "pricepoint": "$_id",
          "amount": { $toString: "$amount" }
        }
      }
    ]).toArray()

    console.log(asks)
    console.log(bids)
  } catch (e) {
    console.log(e.message)
  } finally {
    client.close()
  }
}

query()