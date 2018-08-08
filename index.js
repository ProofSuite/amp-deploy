const fetch = require('node-fetch')

const main = async () => {
  try {
    let response = await fetch('http://127.0.0.1:8081/tokens')
    let tokens = await response.json()
    console.log(tokens)
  }
  catch (e) {
    console.log(e)
  }
}

const getTokens = async () => {
  const response = await fetch('http://127.0.0.1:8081/tokens')
  const tokens = await response.json()
  console.log(tokens)
}

const createToken = async () => {
  const rawResponse = await fetch('http://127.0.0.1:8081/tokens', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-type': 'application/json'
    },
    body: JSON.stringify({
      "name":"HotPotCoin",
      "symbol":"HPC",
      "decimal":18,
      "contractAddress":"0x1888a8db0b7db59413ce07150b3373972bf818d3",
      "active":true,
      "quote":true
    })
  })

  const content = await rawResponse.json()
  console.log(content)
}


getTokens()