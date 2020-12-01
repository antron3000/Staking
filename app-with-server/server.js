var express = require("express");
var path = require("path");
var onboard = require('bnc-onboard');
let Web3 = require('web3')


const PORT = process.env.PORT || 3030;

let app = express();


const onboard = Onboard({
  dappId: "f86fb323-1c63-488e-8f3b-30b49374dd96",       // [String] The API key created by step one above
  networkId: 5  // [Integer] The Ethereum network ID your Dapp uses.
  subscriptions: {
    wallet: wallet => {
       web3 = new Web3(wallet.provider)
    }
  }
});

app.use(express.static(__dirname + "/public"))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
});

app.listen(PORT, () => {
    console.log("Server listening on port " + PORT);
});
