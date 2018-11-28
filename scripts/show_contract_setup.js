const fs = require('fs')
const path = require('path');
const argv = require('yargs').argv
const MongoClient = require('mongodb').MongoClient
const consoleTable = require('console.table')
const { utils, providers, Wallet, Contract } = require('ethers')
const { RewardPools, RewardCollector, Exchange } = require('../utils/abis')
const { contractAddresses } = require('../config')

const { getInfuraKey, 
  getMongoURI, 
  getNetworkID, 
  getPrivateKeyFromEnvironment,
  getPairName
} = require('../utils/helpers')


const mongoUrl = argv.mongo_url || 'mongodb://localhost:27017'
const mongoUsername = argv.mongo_username
const mongoPassword = argv.mongo_password
const network = argv.network

if (!network) throw new Error('Usage: node show_contract_setup --network {network} --mongoUrl {mongoUrl} --mongoUsername {mongoUsername} --mongoPassword {mongoPassword}')
if (!mongoUrl && (!mongoUsername && !mongoPassword)) throw new Error('Usage: node show_contract_setup --network {network} --mongoUrl {mongoUrl} --mongoUsername {mongoUsername} --mongoPassword {mongoPassword}')

let mongoURI

if (mongoUsername && mongoPassword) {
  mongoURI = getMongoURI(mongoUsername, mongoPassword)
} else {
  mongoURI = mongoUrl 
}

const networkID = getNetworkID(network)
const infuraKey = getInfuraKey(network)
const pk = getPrivateKeyFromEnvironment(network)
const addresses = contractAddresses[networkID]

let provider = new providers.InfuraProvider(network, infuraKey)
let signer = new Wallet(pk, provider)



const show = async () => {
  const client = await MongoClient.connect(mongoURI, { useNewUrlParser: true })
  const db = client.db('proofdex')

  let operatorWallets = await db.collection('wallets').find().toArray()
  let pairs = await db.collection('pairs').find().toArray()

  let rewardPools = new Contract(addresses['RewardPools'], RewardPools, provider)
  let exchange = new Contract(addresses['Exchange'], Exchange, provider)
  let rewardCollector = new Contract(addresses['RewardCollector'], RewardCollector, provider)

  let infoCalls = [
      exchange.owner.call(),
      exchange.rewardAccount.call(),
      rewardPools.owner.call(),
      rewardCollector.owner.call(),
      rewardCollector.rewardPools.call(),
      rewardPools.currentEpoch.call(),
      rewardPools.currentPoolIndex.call(),
      rewardPools.currentPoolBalance.call(),
      rewardPools.blocksPerEpoch.call(),
      rewardPools.creationBlockNumber.call()
  ]

  let operatorRegistrationCalls = operatorWallets.map(operatorWallet => {
    let { address } = operatorWallet
    return exchange.operators(address)
  })

  let operatorBalanceCalls = operatorWallets.map(operatorWallet => {
    let { address } = operatorWallet
    return balance = provider.getBalance(address)
  })

  // let pairRegistrationCalls = pairs.map(pair => {
  //   let { baseTokenAddress, quoteTokenAddress } = pair
  //   return exchange.pairIsRegistered(baseTokenAddress, quoteTokenAddress)
  // })

  // let pairMultiplierCalls = pairs.map(pair => {
  //   let { baseTokenAddress, quoteTokenAddress } = pair
  //   return exchange.getPairMultiplier(baseTokenAddress, quoteTokenAddress)
  // })

  let [
    exchangeOwner,
    exchangeRewardAccount,
    rewardPoolsOwner,
    rewardCollectorOwner,
    rewardPoolsAddress,
    currentEpoch,
    currentPoolIndex,
    currentPoolBalance,
    rewardPoolsBlocksPerEpochSetting,
    creationBlockNumber
  ] = await Promise.all(infoCalls)

  let operatorRegistrations = await Promise.all(operatorRegistrationCalls)
  let operatorBalances = await Promise.all(operatorBalanceCalls)

  let walletsTable = operatorWallets.map((wallet, index) => {
    return {
      Address: wallet.address,
      Registered: operatorRegistrations[index],
      Balance: `${utils.formatEther(operatorBalances[index])} ETH`
    }
  })

  let pairsTable = pairs.map((pair, index) => {
    return {
      Name: getPairName(pair.baseTokenSymbol, pair.quoteTokenSymbol),
      BaseTokenDecimals: pair.baseTokenDecimals,
      QuoteTokenDecimals: pair.quoteTokenDecimals,
      PairMultiplier: '1e' + (18 + pair.baseTokenDecimals),
      MakeFee: pair.makeFee,
      TakeFee: pair.takeFee,
    }
  })

  console.log('**Exchange**')
  console.log('Owner: ', exchangeOwner)
  console.log('Reward Account: ', exchangeRewardAccount)
  console.log('\n')

  console.log('**RewardCollector**')
  console.log('Owner: ', rewardCollectorOwner)
  console.log('\n')

  console.log('**RewardPools**')
  console.log('Owner: ', rewardPoolsOwner)
  console.log('RewardCollector Setting: ', rewardPoolsAddress)
  console.log('Blocks per Epoch Setting', rewardPoolsBlocksPerEpochSetting.toString())
  console.log('Current Pool Index', currentPoolIndex.toString())
  console.log('Current Pool Balance', currentPoolBalance.toString())
  console.log('Current Epoch', currentEpoch.toString())
  console.log('\n')

  console.log("**Operators**")
  console.table(walletsTable)
  console.log('\n')

  console.log("**Pairs**")
  console.table(pairsTable)
  console.log('\n')

}

show()