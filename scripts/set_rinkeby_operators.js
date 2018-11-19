const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { Exchange } = require('../utils/abis')
const { contractAddresses, operators } = require('../config')

const pk = process.env.AMP_RINKEBY_PRIVATE_KEY
const rinkebyAddresses = contractAddresses['4']
const rinkebyOperators = operators['4']
const provider = new providers.InfuraProvider('rinkeby')
const signer = new Wallet(pk, provider)

const setOperators = async () => {
  for (let operator of rinkebyOperators) {
    let exchange = new Contract(rinkebyAddresses['Exchange'], Exchange, signer)
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


