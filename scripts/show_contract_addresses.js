const process = require('process')
const contractAddresses = require('../config/contractAddresses.json')
const argv = require('yargs').argv
const { getNetworkID } = require('../utils/helpers')

const network = argv.network
if (!network) console.log('Usage: node show_contract_addresses {network}')

const networkId = getNetworkID(network)
if (!networkId) console.log('Network not found')

const addresses = contractAddresses[networkId]
Object.keys(addresses).forEach(symbol => console.log(`${symbol}: ${addresses[symbol]}`))
console.log('\n')