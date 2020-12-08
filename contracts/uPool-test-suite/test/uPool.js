const uPool = artifacts.require("uPool");
const uStakedEth = artifacts.require("uStakedEth");
let uPoolInstance
let uStakedEthInstance
let accounts
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
    await uPoolInstance.deposit({ from: accounts[2], value:1234567890123456789 });
  });
  it('uPool should have a balance of 2.234567890123456789 ETH, balance should equal total staked ETH + total collected Fees', async () => {
    const balance = await web3.eth.getBalance(uPoolInstance.address);
    const collectedFees = await uPoolInstance.collectedFees()
    const totalSupply = await uStakedEthInstance.totalSupply()
    assert.equal(collectedFees,22345678901234567,"collected Fees should be 0.022345678901234 ETH")
    assert.equal(balance, 2234567890123456789, "uPool has 2.2345678901234 ETH");
    assert.equal(balance,totalSupply.add(collectedFees),"Contract ETH Balance should equal contract token total supply plus collected fees")
  });
  it('account 2 should cancel deposit into uPool', async () => {
    await uPoolInstance.cancelDeposit({ from: accounts[2]});
  });
  it('uPool should have 31 ETH left depositable', async () => {
    const balance = await web3.eth.getBalance(uPoolInstance.address);
    assert.equal(balance, 1000000000000000000, "uPool has 1 ETH");

    let depositable = await uPoolInstance.depositable();
    assert.equal(depositable,31000000000000000000,"Depositable should be 31 ETH")
  });
  it('account 3 should depsoit 31 ETH into uPool', async () => {
    await uPoolInstance.deposit({ from: accounts[3], value:31000000000000000000 });
  });
  it('uPool should have a balance of 32 ETH, balance should equal total staked ETH + total collected Fees', async () => {
    const balance = await web3.eth.getBalance(uPoolInstance.address);
    const collectedFees = await uPoolInstance.collectedFees()
    const totalSupply = await uStakedEthInstance.totalSupply()
    assert.equal(balance, 32000000000000000000, "uPool has 32 ETH");
    assert.equal(balance,totalSupply.add(collectedFees),"Contract ETH Balance should equal contract token total supply plus collected fees")
  });


  // it('uPool should have a balance of 2.234567890123456789 ETH', async () => {
  //   const balance = await web3.eth.getBalance(uPoolInstance.address);
  //   assert.equal(balance.valueOf(), 2234567890123456789, "uPool has 1.234567890123456789 ETH");
  // });
  // it('account 2 should depsoit cancel deposit', async () => {
  //   await uPoolInstance.cancelDeposit({ from: accounts[2]});
  // });
  // it('uPool should have a balance of 1 ETH', async () => {
  //   const balance = await web3.eth.getBalance(uPoolInstance.address);
  //   assert.equal(balance.valueOf(), 1000000000000000000, "uPool has 1 ETH");
  // });








  // it('should send coin correctly', async () => {
  //   const metaCoinInstance = await MetaCoin.deployed();
  //
  //   // Setup 2 accounts.
  //   const accountOne = accounts[0];
  //   const accountTwo = accounts[1];
  //
  //   // Get initial balances of first and second account.
  //   const accountOneStartingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
  //   const accountTwoStartingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();
  //
  //   // Make transaction from first account to second.
  //   const amount = 10;
  //   await metaCoinInstance.sendCoin(accountTwo, amount, { from: accountOne });
  //
  //   // Get balances of first and second account after the transactions.
  //   const accountOneEndingBalance = (await metaCoinInstance.getBalance.call(accountOne)).toNumber();
  //   const accountTwoEndingBalance = (await metaCoinInstance.getBalance.call(accountTwo)).toNumber();
  //
  //
  //   assert.equal(accountOneEndingBalance, accountOneStartingBalance - amount, "Amount wasn't correctly taken from the sender");
  //   assert.equal(accountTwoEndingBalance, accountTwoStartingBalance + amount, "Amount wasn't correctly sent to the receiver");
  // });
});
