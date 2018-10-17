const MongoClient = require('mongodb').MongoClient
const url = process.env.MONGODB_URL || 'mongodb://localhost:27017'
const date = require('date-fns')

const query = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')

    let now = new Date()
    let yesterday = date.addDays(now, -1)

    const response = await db.collection('trades').aggregate([
      {
        $match: {
          createdAt: {
            $gte: yesterday,
            $lt: now
          },
          status: {"$in": ["SUCCESS"]}
        },
      },
      {
        $sort: {
          createdAt: 1
        }
      },
      {
        $group: {
          _id: {
            baseToken: "$baseToken",
            quoteToken: "$quoteToken",
          },
          open: { $first: { $toInt: "$pricepoint" } },
          high: { $max: { $toInt: "$pricepoint" } },
          low: { $min: { $toInt: "$pricepoint" } },
          volume: { $sum: { $toDecimal: "$amount" } },
          close: { $last: { $toInt: "$pricepoint" } },
        }
      }

    ]).toArray()

    console.log(response)



    // console.log(response)

    // const response = await db.collection('trades').aggregate([
    //   {
    //     $match: {
    //       createdAt: ""
    //     }
    //   },
    //   {
    //     $project: {
    //       tokenBalances: {
    //         $objectToArray: "$tokenBalances"
    //       },
    //       _id: 0
    //     }
    //   },
    //   {
    //     $addFields: {
    //       "tokenBalances": {
    //         $filter: {
    //           input: "$tokenBalances",
    //           as: "kv",
    //           cond: {
    //             $eq: [ "$$kv.k", "0xe41d2489571d322189246dafa5ebde1f4699f498" ]
    //           }
    //         }
    //       }
    //     }
    //   },
    //   {
    //     $addFields: {
    //       "tokenBalances": {
    //         $arrayToObject: "$tokenBalances",
    //       }
    //     }
    //   }
    // ]).toArray()

    // console.log(JSON.stringify(response[0].tokenBalances, null, 2))

  } catch (e) {
    console.log(e)
  }
}

query()
