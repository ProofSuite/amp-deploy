const fs = require('fs')
const path = require('path');
const argv = require('yargs').argv
const { utils, providers, Wallet, Contract } = require('ethers')
const { ERC20, Exchange } = require('../utils/abis')
const { getNetworkID, getPrivateKeyFromEnvironment, getInfuraKey } = require('../utils/helpers')
const { contractAddresses, baseTokens, quoteTokens, decimals } = require('../config')

const network = argv.network
if (!network) console.log('Usage: node register_pairs {network}')

const networkID = getNetworkID(network)
const pk = getPrivateKeyFromEnvironment(network)
const infuraKey = getInfuraKey(network)

const addresses = contractAddresses[networkID]
const provider = new providers.InfuraProvider(network, infuraKey)
const signer = new Wallet(pk, provider)

let exchange = new Contract(addresses['Exchange'], Exchange, signer)

const registerPairs = async () => {
  for (let quoteTokenSymbol of quoteTokens) {
    for (let baseTokenSymbol of baseTokens) {
      baseTokenDecimals = decimals[baseTokenSymbol]
      quoteTokenDecimals = decimals[quoteTokenSymbol]
      baseTokenAddress = addresses[baseTokenSymbol]
      quoteTokenAddress = addresses[quoteTokenSymbol]

      let defaultPricepointMultiplier = utils.bigNumberify(10).pow(18)
      let baseMultiplier = utils.bigNumberify(10).pow(baseTokenDecimals)
      let pricepointMultiplier = defaultPricepointMultiplier.mul(baseMultiplier)

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

