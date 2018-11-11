const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { Exchange } = require('./abis')
const { contractAddresses, operators } = require('./config')


const pk = process.env.AMP_MAINNET_PRIVATE_KEY
const rinkebyAddresses = contractAddresses['1']
const rinkebyOperators = operators['1']
const provider = new providers.InfuraProvider('homestead')
const signer = new Wallet(pk, provider)

const setOperators = async () => {
  for (let operator of operators) {
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


