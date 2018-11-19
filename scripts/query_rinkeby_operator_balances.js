const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { Exchange } = require('../utils/abis')
const { operators } = require('../config')

const pk = process.env.AMP_RINKEBY_PRIVATE_KEY || '0xf4f803220d23b4ae3b4fecbd0ed9d3c11137571fd1c619154619ef832c8f196f'
const rinkebyOperators = operators['4']

let provider = new providers.InfuraProvider('rinkeby', '63739bbdf74143aeb0e6d8bb8307084f')
let signer = new Wallet(pk, provider)

const queryAccountBalances = async () => {
  for (let operator of rinkebyOperators) {
    let balance = await provider.getBalance()
    console.log(`${operator}: ${balance}`)
  }
}

queryAccountBalances()