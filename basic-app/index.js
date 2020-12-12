let provider
let signer


let contractAddress = "0x5aE7cefd41EeB139fBd7be138cAe3dF061c5b89a"//"0x498E7A298be34df2D5F4fcaE235E394cfd628b4c"//"0x9FEC7Dc40a3167d6971B0cFAb48841e00dBE2c26"
let contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_numValidators",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_adminFeeN",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_adminFeeD",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "depositor",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "fee",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "pubkey",
				"type": "bytes"
			}
		],
		"name": "DepositToEth2",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "previousOwner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "OwnershipTransferred",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "withdrawer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdrawal",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "ValidatorsUnderManagement",
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
		"inputs": [],
		"name": "adminFeeD",
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
		"inputs": [],
		"name": "adminFeeN",
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
		"inputs": [],
		"name": "cancelDeposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "collectedFees",
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
		"inputs": [],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "depositContractAddress",
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
		"name": "depositToEth2",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "depositable",
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
		"inputs": [],
		"name": "isOwner",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
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
		"name": "poolFull",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "pubkeys",
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
		"name": "renounceOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "repayStake",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_adminFeeN",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_adminfeeD",
				"type": "uint256"
			}
		],
		"name": "setAdminFee",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			}
		],
		"name": "transferOwnership",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "u",
		"outputs": [
			{
				"internalType": "contract uStakedEth",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "validatorStakesRepayed",
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
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "withdrawable",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]
let contract


let tokenAddress //"0xd4CC801D577E6B08A63D8C76097b98F7F2b38fee"//"0x59F9e6E5e495F2fB259963DeC5BA56CFBd5846e7"
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
	tokenAddress = contract.u()
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

async function cancelDeposit() {
	await contract.cancelDeposit({gasLimit:100000})
}

async function withdraw() {
	await contract.withdraw()
}

async function displayWithdrawable() {
	let contractBalance = await provider.getBalance(contractAddress)
	let tokenBalance = await token.balanceOf(signer._address)
	let totalWithdrawable = await contract.withdrawable()

	let withdrawable
	if(totalWithdrawable.eq(0)){
		withdrawable = ethers.utils.parseEther("0")
	} else {
		withdrawable = contractBalance.mul(tokenBalance).div(totalWithdrawable)
	}

	withdrawable = ethers.utils.formatEther(withdrawable)
	document.getElementById("withdrawableLabel").innerHTML = withdrawable + " ETH Withdrawable"
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

async function displayValidatorStatus() {
	let pubkey1
	let pubkey2
	let pubkey3
}
