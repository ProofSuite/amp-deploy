const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { RewardPools, RewardCollector } = require('.../abis')
const { contractAddresses } = require('../config')

const rinkebyAddresses = contractAddresses['4']

let provider = new providers.InfuraProvider('homestead')
let signer = new Wallet(pk, provider)

const query = async () => {
  let rewardPools = new Contract(rinkebyAddresses['RewardPools'], RewardPools)
  let rewardCollector = new Contract(rinkebyAddresses['RewardCollector'], RewardCollector)

  let owner = await rewardPools.owner.call()
  let rewardPoolsAddress = await rewardCollector.rewardPools.call()
  let rewardCollectorOwner = await rewardCollector.owner.call()
  let rewardPoolsOwner = await rewardPools.owner.call()

  console.log('RewardCollector is owned by: ', rewardCollectorOwner)
  console.log('RewardPools is owned by: ', rewardPoolsOwner)
  console.log('RewardCollector rewardPools address is set to: ', rewardPoolsAddress)
}

query()