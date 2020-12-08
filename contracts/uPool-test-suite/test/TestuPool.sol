pragma solidity >=0.4.25 <=0.7.5;

import "truffle/Assert.sol";
import "truffle/DeployedAddresses.sol";
import "../contracts/uPool.sol";

contract TestuPool {
  uPool u = new uPool(1,1,100);
  uint public initialBalance = 99 ether;


  function testOwnerIsDeployer() public {
    Assert.equal(u.owner(),address(this),"owner should be deployer");
  }


  function testBalanceIs0() public {
    uint expected = 0;
    Assert.equal(u.balance(), expected, "balance should be 0");
  }

/*
  function testdeposit1() public payable{
      // uint balance = u.balance();
      // Assert.equal(balance,uint(0),"balance should be 0");
      // uint tokenBalance = uSE.totalSupply();
      // Assert.equal(uint(0),uint(0),"token balance should be 0");
      u.deposit{value:1 ether}();
      uint balance = u.balance();
      Assert.equal(balance,uint(1 ether),"balance should be 1 ETH");
    }


    function testdeposit2() public payable{
        // uint balance = u.balance();
        // Assert.equal(balance,uint(0),"balance should be 0");
        // uint tokenBalance = uSE.totalSupply();
        // Assert.equal(uint(0),uint(0),"token balance should be 0");
        u.deposit{value:31 ether}();
        uint balance = u.balance();
        Assert.equal(balance,uint(32),"balance should be 2.23456789012345678 ETH");
    }

    /// #sender: account-2
    function canceldeposit2() public{
        u.cancelDeposit();
        uint balance = u.balance();
        Assert.equal(balance,uint(1000000000000000000),"balance should be 1 ETH");
    }

    /// #sender: account-2
    /// #value: 31000000000000000000
    function deposit3() public payable{
        // uint balance = u.balance();
        // Assert.equal(balance,uint(0),"balance should be 0");
        // uint tokenBalance = uSE.totalSupply();
        // Assert.equal(uint(0),uint(0),"token balance should be 0");
        u.deposit{value:31000000000000000000}();

        Assert.equal(u.balance(),uint(32000000000000000000),"balance should be 2 ETH");
        Assert.equal(u.poolFull(),true,"pool should be marked as full");
    } */
}
