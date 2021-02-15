const uPool = artifacts.require("uPool");
const uStakedEth = artifacts.require("uStakedEth");
let uPoolInstance
let uStakedEthInstance
let accounts
let BN = web3.utils.BN;

contract('uPool', (accounts) => {
  it('should deploy uPool with 0 balance', async () => {
    uPoolInstance = await uPool.new(1,1,100)
    let uSEAddress = await uPoolInstance.uSE()
    uStakedEthInstance = await uStakedEth.at(uSEAddress)
    accounts = await web3.eth.getAccounts()

    const balance = await uPoolInstance.balance();

    assert.equal(balance.valueOf(), 0, "balance is 0");
  });
  it('should be the owner of uPool', async () => {

    const owner = await uPoolInstance.owner();

    assert.equal(owner.valueOf(), accounts[0], "owner is contract deployer");
  });
  it('account 1 should depsoit 1 ETH into uPool', async () => {
    await uPoolInstance.deposit({ from: accounts[1], value:1000000000000000000 });
  });
  it('uPool should have a balance of 1 ETH, balance should equal total staked ETH + total collected Fees', async () => {
    const balance = await web3.eth.getBalance(uPoolInstance.address);
    const collectedFees = await uPoolInstance.collectedFees()
    const totalSupply = await uStakedEthInstance.totalSupply()
    assert.equal(balance, 1000000000000000000, "uPool has 1 ETH");
    assert.equal(collectedFees,10000000000000000,"Collected Fees are 0.01 ETH")
    assert.equal(totalSupply,990000000000000000,"total Token Supply is 0.99 ETH")
    assert.equal(balance,totalSupply.add(collectedFees),"Contract ETH Balance should equal contract token total supply plus collected fees")
  });
  it('account 2 should depsoit 1.234567890123456789 ETH into uPool', async () => {
    await uPoolInstance.deposit({ from: accounts[2], value:1234567890123400000 });
  });
  it('uPool should have a balance of 2.2345678901234 ETH, balance should equal total staked ETH + total collected Fees', async () => {
    const balance = await web3.eth.getBalance(uPoolInstance.address);
    const collectedFees = await uPoolInstance.collectedFees()
    const totalSupply = await uStakedEthInstance.totalSupply()
    assert.equal(collectedFees,22345678901234000,"collected Fees should be 0.022345678901234567 ETH")
    assert.equal(balance, 2234567890123400000, "uPool has 2.234567890123456789 ETH");
    assert.equal(balance,totalSupply.add(collectedFees),"Contract ETH Balance should equal contract token total supply plus collected fees")
  });
  it('account 2 should cancel deposit into uPool', async () => {
    await uPoolInstance.cancelDeposit({ from: accounts[2]});
  });
  it('uPool should have 31 ETH left depositable', async () => {
    let balance = await web3.eth.getBalance(uPoolInstance.address);
    assert.equal(balance, 1000000000000000000, "uPool has 1 ETH");

    let depositable = await uPoolInstance.depositable();
    assert.equal(depositable,31000000000000000000,"Depositable should be 31 ETH")
  });
  it('account 3 should depsoit 31 ETH into uPool', async () => {
    await uPoolInstance.deposit({ from: accounts[3], value:31000000000000000000 });
  });
  it('uPool should have a balance of 32 ETH, balance should equal total staked ETH + total collected Fees', async () => {
    let balance = await web3.eth.getBalance(uPoolInstance.address);
    let collectedFees = await uPoolInstance.collectedFees()
    let totalSupply = await uStakedEthInstance.totalSupply()
    assert.equal(balance, 32000000000000000000, "uPool has 32 ETH");
    assert.equal(balance,totalSupply.add(collectedFees),"Contract ETH Balance should equal contract token total supply plus collected fees")
    let poolFull = await uPoolInstance.poolFull()
    assert.equal(poolFull, true, "Pool is Full");
  });
  it('pool owner should repay stake', async () => {
    await uPoolInstance.repayStake(new BN("32000000000000000000"),{from: accounts[0], value:32000000000000000000});
  });
  it('Account 0,1 and Account 3 should withdraw stake', async () => {
    await uPoolInstance.withdraw({from: accounts[0]});
    await uPoolInstance.withdraw({from: accounts[1]});
    await uPoolInstance.withdraw({from: accounts[3]});
  });

  it('Account 1 balance should be 101 ETH, Account 2 Balance should be 132 ETH', async () => {
    //let account1Balance = web3.eth.getBalance(accounts[1])
    //let account3Balance = web3.eth.getBalance(accounts[3])
    //assert.equal(account1Balance,101000000000000000000, "account1 balance should be 101 ETH")
    //assert.equal(account3Balance,new BN(132000000000000000000), "account3 balance should be 132 ETH")
  });

  it('Token Supply should be 0', async () => {

    let totalSupply = await uStakedEthInstance.totalSupply()
    assert.equal(totalSupply,0, "token Supply should be 0")
  });
});
