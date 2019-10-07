const Premium = artifacts.require('Premium.sol')

module.exports = async function(calback) {
    const contract = await Premium.deployed()
    const value = await contract.get()
    console.log("Value: ", value)
        // web3.utils.isAddress("0xc2178b08c95df0ea1684CaDe88C343E66Ca96eea");
}