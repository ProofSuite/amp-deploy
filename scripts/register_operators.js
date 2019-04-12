const fs = require('fs')
const path = require('path');
const argv = require('yargs').argv
const { utils, providers, Wallet, Contract } = require('ethers')
const { Exchange } = require('../utils/abis')
const { contractAddresses, operatorAddresses } = require('../config')
const { getNetworkID, getPrivateKeyFromEnvironment, getInfuraKey } = require('../utils/helpers')

const network = argv.network
if (!network) throw new Error('Usage: node register_operators.js {network}')

const networkID = getNetworkID(network)
const pk = getPrivateKeyFromEnvironment(network)
const infuraKey = getInfuraKey(network)
const addresses = contractAddresses[networkID]
const operators = operatorAddresses[networkID]

let signer, provider

if (network === "quorum") {
  provider = new providers.JsonRpcProvider('http://127.0.0.1:22000')
  signer = new Wallet(pk, provider)
} else {
  provider = new providers.InfuraProvider(network, infuraKey)
  signer = new Wallet(pk, provider)
}


const setOperators = async () => {
  for (let operator of operators) {
    let exchange = new Contract(addresses['Exchange'], Exchange, signer)
    let tx = await exchange.setOperator(operator, true)
    let receipt = await signer.provider.waitForTransaction(tx.hash)

    if (receipt.status === 0) {
      console.log(`Transaction ${tx.hash} failed`)
    } else {
      console.log(`${operator} is now an operator`)
    }
  }
}

setOperators()


