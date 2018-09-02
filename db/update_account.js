const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const update = async () => {
  try {
    const client = await MongoClient.connect(url, { useNewUrlParser: true })
    const db = client.db('proofdex')
    const response = await db.collection('accounts').update(
      {
       address: '0xe8e84ee367bc63ddb38d3d01bccef106c194dc47',
      },
      {
        $set: {
          "tokenBalances.0xB8c77482e45F1F44dE1745F52C74426C631bDD52.balance": 1000
        }
      }
    )
  } catch (e) {
    console.log(e.message)
  }
}

update()

