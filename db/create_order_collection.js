const tokens = require('../tokens.json')
const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017'

const create = async () => {
  const client = await MongoClient.connect(url, { useNewUrlParser: true })

  const db = client.db('proofdex')
  const response = await db.createCollection('orders', {
    validator:  {
      $jsonSchema: 'object',
      required: [
         'buyToken',
         'sellToken',
         'baseTokenAddress',
         'quoteTokenAddress',
         'amountBuy',
         'amountSell',
         'exchangeAddress',
         'filledAmount',
         'amount',
         'price',
         'sel' 'quoteTokenAddress'],
      properties:  {
        baseToken: {
          bsonType: "string",
        },
        quoteToken: {
          bsonType: "string",
        },
        buyToken: {
          bsonType: "string"
        },
        sellToken: {
          bsonType: "string"
        },
        baseTokenAddress: {
          bsonType: "string"
        },
        quoteTokenAddress: {
          bsonType: "string"
        },
        filledAmount: {
          bsonType: "long"
        },
        amount: {
          bsonType: "long"
        },
        price: {
          bsonType: "long"
        },
        fee: {
          bsonType: "long"
        },
        makeFee: {
          bsonType: "long"
        },
        takeFee: {
          bsonType: "long"
        },
        side: {
          bsonType: "string"
        },
        amountBuy: {
          bsonType: "amountBuy"
        },
        amountSell: {
          bsonType: "amountSell"
        },
        exchangeAddress: {
          bsonType: "string"
        },
        signature: {
          bsonType: "object"
        },
        pairID: {
          bsonType: "objectID"
        },
        pairName: {
          bsonType: "string"
        },
        hash: {
          bsonType: "string"
        },
        userAddress: {
          bsonType: "string"
        },
        orderBook: {
          bsonType: "object"
        },
        createdAt: {
          bsonType: "string"
        },
        updatedAt: {
          bsonType: "string"
        }
      }
      }
    })

  console.log(response)
}

create()