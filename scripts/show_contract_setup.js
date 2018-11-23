const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { RewardPools, RewardCollector, Exchange } = require('../utils/abis')
const { contractAddresses } = require('../config')
const { getNetworkID, getPrivateKeyFromEnvironment } = require('../utils/helpers')

const network = process.argv[2]
if (!network) throw new Error('Usage: node show_contract_setup {network}')

const networkID = getNetworkID(network)
const pk = getPrivateKeyFromEnvironment(network)

const addresses = contractAddresses[networkID]
let provider = new providers.InfuraProvider(network)
let signer = new Wallet(pk, provider)

const show = async () => {
  let rewardPools = new Contract(addresses['RewardPools'], RewardPools, provider)
  let exchange = new Contract(addresses['Exchange'], Exchange, provider)
  let rewardCollector = new Contract(addresses['RewardCollector'], RewardCollector, provider)

  let exchangeOwner = await exchange.owner.call()  
  let exchangeRewardAccount = await exchange.rewardAccount.call()
  let rewardPoolsOwner = await rewardPools.owner.call()
  let rewardCollectorOwner = await rewardCollector.owner.call()
  let rewardPoolsAddress = await rewardCollector.rewardPools.call()
  let currentEpoch = await rewardPools.currentEpoch.call()
  let currentPoolIndex = await rewardPools.currentPoolIndex.call()
  let currentPoolBalance = await rewardPools.currentPoolBalance.call()
  let rewardPoolsBlocksPerEpochSetting = await rewardPools.blocksPerEpoch.call()
  let creationBlockNumber = await rewardPools.creationBlockNumber.call()
  
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
}

show()