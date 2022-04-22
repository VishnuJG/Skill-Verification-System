var accounts;
var profs;
var pars;
var contract;
window.addEventListener('load', async () => {
    // New web3 provider
    accounts = await ethereum.request({ method: 'eth_accounts' });
	console.log(accounts[0]);
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // ask user for permission
            await ethereum.enable();
            // user approved permission
        } catch (error) {
            // user rejected permission
            console.log('user rejected permission');
        }
    }
    // Old web3 provider
    else if (window.web3) {
        window.web3 = new Web3(web3.currentProvider);
        // no need to ask for permission
    }
    // No web3 provider
    else {
        console.log('No web3 provider detected');
    }
	var contractAddress = '0xaC1752A9331868Da14c132068D85238dBA0a66b0';
  
  var abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nameOfSkill",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "certOfSkill",
				"type": "string"
			}
		],
		"name": "addSkill",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "uname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "passw",
				"type": "string"
			}
		],
		"name": "addUsers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nameOfSkill",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "certOfSkill",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "namesofusers",
				"type": "address"
			}
		],
		"name": "endorseSkills",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "namesofusers",
				"type": "address"
			}
		],
		"name": "viewAllSkills",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "int256[]",
				"name": "",
				"type": "int256[]"
			},
			{
				"internalType": "address[][]",
				"name": "",
				"type": "address[][]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewSenderSkills",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "int256[]",
				"name": "",
				"type": "int256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewUsers",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
	contract = new web3.eth.Contract(abi, contractAddress);
	
	contract.methods.viewUsers().call().then(function(x){
        console.log(x[0]);
		profs=x[0];
		pars=x[1];
    });
  });
  
  
  // contractAddress and abi are setted after contract deploy
  var contractAddress = '0xaC1752A9331868Da14c132068D85238dBA0a66b0';
  
  var abi = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nameOfSkill",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "certOfSkill",
				"type": "string"
			}
		],
		"name": "addSkill",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "uname",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "passw",
				"type": "string"
			}
		],
		"name": "addUsers",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "nameOfSkill",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "certOfSkill",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "namesofusers",
				"type": "address"
			}
		],
		"name": "endorseSkills",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "namesofusers",
				"type": "address"
			}
		],
		"name": "viewAllSkills",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "int256[]",
				"name": "",
				"type": "int256[]"
			},
			{
				"internalType": "address[][]",
				"name": "",
				"type": "address[][]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewSenderSkills",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "int256[]",
				"name": "",
				"type": "int256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "viewUsers",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			},
			{
				"internalType": "string[]",
				"name": "",
				"type": "string[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
	
function checkUser(emailval, passval){
	var res=0;
	console.log("here");
	for(let i=0; i<profs.length;i++){
		if(profs[i]==emailval ){
			res=1;
			if(passval!=pars[i]){
			res=-1;
			}
		}
	}
	return res;
}

function addUser(){
    contract = new web3.eth.Contract(abi, contractAddress);
    console.log("welcome");
    var emailval = document.getElementById("email").value;
    var passval = document.getElementById("password").value;
	var res=checkUser(emailval,passval);
	
    console.log(res);
	if(res==1){
		console.log("Valid User");
		window.location.href = 'dashboard.html';
		alert("Login Successful");
	}
	else if(res==-1){
		console.log("Invalid Password");
		alert("Invalid Password");
	}
	else{
		console.log("User not Registered");
	
		contract.methods.addUsers(emailval, passval).send({from: accounts[0]}).then(async function(){
			$("#addedUser").html="New user added";
			console.log("added new user successfully");
		});
		contract.methods.viewUsers().call().then(function(x){
			console.log(x[0]);
		});
	}
}



function showUsers(){
	contract = new web3.eth.Contract(abi, contractAddress);
	contract.methods.viewUsers().call().then(function(x){
        console.log(x[0]);
    });
}