// Source code to interact with smart contract
	
// web3 provider with fallback for old version

  var accounts;
window.addEventListener('load', async () => {
    // New web3 provider
    alert("Login Successful");
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

  
  // Accounts
  var account;
  
  function registerSetInfo() {
    contract = new web3.eth.Contract(abi, contractAddress);
    info = $("#newInfo").val();
	
    contract.methods.verifyDoc(info).send( {from: accounts[0]}).then(function() {
      
      $('#status').html(info);
    });
    
  }
  
  function registerGetInfo() {
    contract = new web3.eth.Contract(abi, contractAddress);
    contract.methods.viewStatus().call().then( function( info ) {
      console.log("Status: ", info);
      document.getElementById('lastInfo').innerHTML = info;
    });
  }
  