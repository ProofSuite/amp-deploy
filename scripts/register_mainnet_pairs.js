const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { ERC20, Exchange } = require('../abis')
const { contractAddresses, baseTokens, quoteTokens } = require('../config')
const pk = process.env.AMP_MAINNET_PRIVATE_KEY

const mainnetAddresses = contractAddresses['1']
const mainnetBaseTokens = baseTokens['1']
const mainnetQuoteTokens = quoteTokens['1']

const provider = new providers.InfuraProvider('homestead')
const signer = new Wallet(pk, provider)
const exchange = new Contract(mainnetAddresses['Exchange'], Exchange, signer)

const registerPairs = async () => {
  for (let quoteTokenSymbol of mainnetQuoteTokens) {
    for (let baseTokenSymbol of mainnetBaseTokens) {
      baseTokenAddress = rinkebyAddresses[baseTokenSymbol]
      quoteTokenAddress = rinkebyAddresses[quoteTokenSymbol]

      //TODO custom pricepoint multiplier
      let tx = await exchange.registerPair(baseTokenAddress, quoteTokenAddress, 1e9)
      let receipt = await signer.provider.waitForTransaction(tx.hash)

      if (receipt.status === 1) {
        console.log(`${baseTokenSymbol}/${quoteTokenSymbol} registration successful`)
        } else {
        console.log(`${baseTokenSymbol}/${quoteTokenSymbol} registration failed`)
      }
    }
  }
}

registerPairs()

