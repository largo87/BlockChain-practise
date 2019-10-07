const Premium = artifacts.require('./Premium.sol');

contract('Premium', (accounts) => {
    it('initializes with the correct value', async() => {
        const premium = await Premium.deployed()
        const value = await premium.get()
        assert.equal(value, 'myValue')
    })
    it('can update the value', async() => {
        const premium = await Premium.deployed()
        premium.set('Hamdi');
        const value = await premium.get()
        assert.equal(value, 'Hamdi')

    })
})