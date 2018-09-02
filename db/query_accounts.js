const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const query = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')
    const response = await db.collection('accounts').aggregate([
      {
        $match: {
          address: "0xe8e84ee367bc63ddb38d3d01bccef106c194dc47"
        }
      },
      {
        $project: {
          tokenBalances: {
            $objectToArray: "$tokenBalances"
          },
          _id: 0
        }
      },
      {
        $addFields: {
          "tokenBalances": {
            $filter: {
              input: "$tokenBalances",
              as: "kv",
              cond: {
                $eq: [ "$$kv.k", "0xe41d2489571d322189246dafa5ebde1f4699f498" ]
              }
            }
          }
        }
      },
      {
        $addFields: {
          "tokenBalances": {
            $arrayToObject: "$tokenBalances",
          }
        }
      }
    ]).toArray()

    console.log(JSON.stringify(response[0].tokenBalances, null, 2))

  } catch (e) {
    console.log(e)
  }
}

query()
