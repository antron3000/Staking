let provider
let signer


let contractAddress = "0x2B0a079e788cA99f3956E6d401946E36b6D37D19"//"0x498E7A298be34df2D5F4fcaE235E394cfd628b4c"//"0x9FEC7Dc40a3167d6971B0cFAb48841e00dBE2c26"
let contractABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "pubkey",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "withdrawal_credentials",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "amount",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "signature",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "index",
				"type": "bytes"
			}
		],
		"name": "DepositEvent",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "pubkey",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "withdrawal_credentials",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "signature",
				"type": "bytes"
			},
			{
				"internalType": "bytes32",
				"name": "deposit_data_root",
				"type": "bytes32"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_deposit_count",
		"outputs": [
			{
				"internalType": "bytes",
				"name": "",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "get_deposit_root",
		"outputs": [
			{
				"internalType": "bytes32",
				"name": "",
				"type": "bytes32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let contract

let tokenAddress = "0x6174953260dF549d5f46147c5037ed1F1d6afaAB"//"0xd4CC801D577E6B08A63D8C76097b98F7F2b38fee"//"0x59F9e6E5e495F2fB259963DeC5BA56CFBd5846e7"
let tokenABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "minter",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "newMinter",
				"type": "address"
			}
		],
		"name": "MinterChanged",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "rawAmount",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "src",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "rawAmount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minimumTimeBetweenMints",
		"outputs": [
			{
				"internalType": "uint32",
				"name": "",
				"type": "uint32"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "dst",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "rawAmount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "minter",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "minter_",
				"type": "address"
			}
		],
		"name": "setMinter",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "dst",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "rawAmount",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "src",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "dst",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "rawAmount",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
]
let token

let decimals
let symbol

let addresses

async function init() {
  console.log("dApp Initialized")
	document.getElementById("contractLink").href = "https://goerli.etherscan.io/address/" + contractAddress

  await window.ethereum.enable();

  provider = new ethers.providers.Web3Provider(web3.currentProvider)
  let accounts = await provider.listAccounts()
  signer = await provider.getSigner(accounts[0])
  contract = new ethers.Contract(contractAddress,contractABI,signer)
  token = new ethers.Contract(tokenAddress,tokenABI,signer)
  decimals = await token.decimals()
  symbol = await token.symbol()

  await displayBalances()
	await displayWithdrawable()
  await displayContractInfo()

}

async function displayBalances() {
	document.getElementById("YouHave").innerHTML = "You Have: "
  let ethBalance = await provider.getBalance(signer._address)
  ethBalance = ethers.utils.formatEther(ethBalance)
  document.getElementById("EthBalanceLabel").innerHTML = ethBalance + " ETH"


  let balance = await token.balanceOf(signer._address)
  balance = ethers.utils.formatUnits(balance,decimals)
  balance = ethers.utils.commify(balance)
  document.getElementById("BalanceLabel").innerHTML = balance + " " + symbol
}

async function deposit() {
  let amount = document.getElementById("amountToDeposit").value
  amount = ethers.utils.parseEther(amount)

  let overrides = {
    value:amount
  }

  await contract.deposit({value:amount})

}

async function withdraw() {
  let amount = await token.balanceOf(signer._address);

await contract.withdraw(amount)
}

async function displayWithdrawable() {
	let withdrawable = await contract.getWithdrawable(signer._address)
	withdrawable = ethers.utils.parseUnits(withdrawable,decimals)
	document.getElementById("withdrawableLabel").innerHTML = withdrawable + " ETH"
}

async function getDepositable() {
  let depositable = await contract.depositable();
	depositable = ethers.utils.formatUnits(depositable,decimals)
  return(depositable)
}

async function getDeposited() {
	let depositable = await contract.depositable();
	let poolSpace = await contract.ValidatorsUnderManagement()
	poolSpace = poolSpace.mul("32000000000000000000")

  let deposited = poolSpace.sub(depositable)
  deposited = ethers.utils.formatUnits(deposited,decimals)
  return(deposited)
}

async function getWithdrawable() {

}


async function getNumValidators() {
  let numValidators = await contract.numValidators();
  console.log(numValidators)
  numValidators = ethers.utils.formatUnits(numValidators,0)
  return(numValidators)
}

async function populateMaxDeposit(){
	let depositable = await getDepositable()
	document.getElementById("amountToDeposit").value = depositable
}

async function getRemainingValidatorShares() {
  let maxValidatorShares = await contract.maxValidatorShares();
  let curValidatorShares = await contract.curValidatorShares();
  let remainingValidatorShares = maxValidatorShares.sub(curValidatorShares)
  remainingValidatorShares = ethers.utils.formatEther(remainingValidatorShares)
  return(remainingValidatorShares)
}

async function displayContractInfo() {
  let deposited = await getDeposited()
  let depositable = await getDepositable()
  let poolFull = await contract.poolFull()

  document.getElementById("deposited").innerHTML = "Deposited: " + deposited + " ETH"
	document.getElementById("depositable").innerHTML = "Remaining space for deposits: " + depositable + " ETH"

	if(poolFull){
		document.getElementById("poolFull").innerHTML = "The pool is full"
	} else {
		document.getElementById("poolFull").innerHTML = "There is still space in the pool"
	}



}
