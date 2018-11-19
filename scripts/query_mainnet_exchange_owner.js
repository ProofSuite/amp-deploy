const fs = require('fs')
const path = require('path');
const { utils, providers, Wallet, Contract } = require('ethers')
const { Exchange } = require('../utils/abis')
const { contractAddresses } = require('../config')

const addresses = contractAddresses['4']

let provider = new providers.InfuraProvider('homestead')
let signer = new Wallet(pk, provider)

const queryOwner = async () => {
  let exchange = new Contract(addresses['Exchange'], Exchange)
  let owner = await exchange.owner.call()

  console.log('Exchange is owned by', owner)
}

queryOwner()