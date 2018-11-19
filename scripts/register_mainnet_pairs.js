const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { ERC20, Exchange } = require('../utils/abis')
const { contractAddresses, baseTokens, quoteTokens, decimals } = require('../config')
const pk = process.env.AMP_MAINNET_PRIVATE_KEY

const mainnetAddresses = contractAddresses['1']

const provider = new providers.InfuraProvider('homestead')
const signer = new Wallet(pk, provider)
const exchange = new Contract(mainnetAddresses['Exchange'], Exchange, signer)

const registerPairs = async () => {
  for (let quoteTokenSymbol of quoteTokens) {
    for (let baseTokenSymbol of baseTokens) {
      baseTokenDecimals = decimals[baseTokenSymbol]
      quoteTokenDecimals = decimals[quoteTokenSymbol]
      baseTokenAddress = rinkebyAddresses[baseTokenSymbol]
      quoteTokenAddress = rinkebyAddresses[quoteTokenSymbol]

      let defaultPricepointMultiplier = utils.bigNumberify(1e9)
      let decimalsPricepointMultiplier = utils.bigNumberify((10 ** (baseTokenDecimals - quoteTokenDecimals)).toString())
      let pricepointMultiplier = defaultPricepointMultiplier.mul(decimalsPricepointMultiplier)

      let tx = await exchange.registerPair(baseTokenAddress, quoteTokenAddress, pricepointMultiplier)
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

