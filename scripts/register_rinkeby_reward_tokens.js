const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { ERC20, Rewards } = require('../utils/abis')
const { contractAddresses, baseTokens, quoteTokens } = require('../config')
const pk = process.env.AMP_RINKEBY_PRIVATE_KEY

const rinkebyAddresses = contractAddresses['4']

const provider = new providers.InfuraProvider('rinkeby')
const signer = new Wallet(pk, provider)
let rewards = new Contract(rinkebyAddresses['RewardPools'], Rewards, signer)

const registerPairs = async () => {
  for (let quoteTokenSymbol of quoteTokens) {
    quoteTokenAddress = rinkebyAddresses[quoteTokenSymbol]

    //TODO custom pricepoint multiplier
    let tx = await rewards.registerQuoteToken(quoteTokenAddress)
    let receipt = await signer.provider.waitForTransaction(tx.hash)

    if (receipt.status === 1) {
      console.log(`${baseTokenSymbol}/${quoteTokenSymbol} registration successful`)
      } else {
      console.log(`${baseTokenSymbol}/${quoteTokenSymbol} registration failed`)
    }
  }
}

registerPairs()

