const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { ERC20, Exchange } = require('../abis')
const { contractAddresses, baseTokens, quoteTokens } = require('../config')
const pk = process.env.AMP_RINKEBY_PRIVATE_KEY

const rinkebyAddresses = contractAddresses['4']
const rinkebyBaseTokens = baseTokens['4']
const rinkebyQuoteTokens = quoteTokens['4']

const provider = new providers.InfuraProvider('rinkeby')
const signer = new Wallet(pk, provider)
let exchange = new Contract(rinkebyAddresses['Exchange'], Exchange, signer)

const registerPairs = async () => {
  for (let quoteTokenSymbol of rinkebyQuoteTokens) {
    for (let baseTokenSymbol of rinkebyBaseTokens) {

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

