const uPool = artifacts.require("uPool");

module.exports = function(deployer) {
  deployer.deploy(uPool,1,1,100);
};
