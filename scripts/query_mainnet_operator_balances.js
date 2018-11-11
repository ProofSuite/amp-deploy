const { utils, providers, Wallet, Contract } = require('ethers')
const { contractAddresses, operators } = require('./config')
const pk = process.env.AMP_MAINNET_PRIVATE_KEY
const mainnetAddresses = contractAddresses['1']
const mainnetOperators = operators['1']

let provider = new providers.InfuraProvider('mainnet')
let signer = new Wallet(pk, provider)

const queryAccountBalances = async () => {
  for (let operator of mainnetOperators) {
    let balance = await provider.getBalance()
    console.log(`${operator}: ${balance}`)
  }
}

queryAccountBalances()