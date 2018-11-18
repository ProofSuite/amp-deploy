const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { ERC20, RewardPools } = require('../abis')
const { contractAddresses, baseTokens, quoteTokens } = require('../config')
const pk = process.env.AMP_RINKEBY_PRIVATE_KEY

const rinkebyAddresses = contractAddresses['1']
const rinkebyBaseTokens = baseTokens['1']
const rinkebyQuoteTokens = quoteTokens['1']

const provider = new providers.InfuraProvider('mainnet')
const signer = new Wallet(pk, provider)
let rewardPools = new Contract(rinkebyAddresses['RewardPools'], RewardPools, signer)

const register = async () => {
  for (let quoteTokenSymbol of rinkebyQuoteTokens) {
      quoteTokenAddress = rinkebyAddresses[quoteTokenSymbol]

      //TODO custom pricepoint multiplier
      let tx = await rewardPools.registerQuoteToken(quoteTokenAddress)
      let receipt = await signer.provider.waitForTransaction(tx.hash)

    if (receipt.status === 1) {
      console.log(`${baseTokenSymbol}/${quoteTokenSymbol} registration successful`)
      } else {
      console.log(`${baseTokenSymbol}/${quoteTokenSymbol} registration failed`)
    }
  }
}

register()