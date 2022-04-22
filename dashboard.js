// Source code to interact with smart contract
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
function createlistitems(skillname, skillcert, skillendor){
	var tempcol="#FF8C00";
	if(skillendor==0){
		tempcol="#008000";
	}
  
  document.querySelector('#tasks').innerHTML += `
      <div class="task" style="background-color:${tempcol}">
          <span id="taskname" >
              ${skillname}
              
          </span>
          <span id="taskname">
              ${skillcert}
            
        </span>
          <button class="delete">
              <i class="far fa-trash-alt"></i>
          </button>
      </div>
  `;

  var current_tasks = document.querySelectorAll(".delete");
  for(var i=0; i<current_tasks.length; i++){
      current_tasks[i].onclick = function(){
          this.parentNode.remove();
      }
  }
}
// web3 provider with fallback for old version

function landingList(){
  document.querySelector('#push').onclick = function(){
    if(document.querySelector('#skills').value.length == 0){
        alert("Please Enter a Skill");
    }
    else if(document.querySelector('#skillcert').value.length == 0){
        alert("Please Enter a Skill Certificate");
    }
    else{
        var tempcol="#FF8C00";
        document.querySelector('#tasks').innerHTML += `
            <div class="task" style="background-color:${tempcol}">
                <span id="taskname" >
                    ${document.querySelector('#skills').value}
                    
                </span>
                <span id="taskname">
                   ${document.querySelector('#skillcert').value}
                  
              </span>
                <button class="delete">
                    <i class="far fa-trash-alt"></i>
                </button>
            </div>
        `;

        var current_tasks = document.querySelectorAll(".delete");
        for(var i=0; i<current_tasks.length; i++){
            current_tasks[i].onclick = function(){
                this.parentNode.remove();
            }
        }
		var skillnameshere=document.querySelector("#skills").value;
		var certnameshere=document.querySelector('#skillcert').value;
		console.log(skillnameshere);
		console.log(certnameshere);
        contract = new web3.eth.Contract(abi, contractAddress);
        contract.methods.addSkill(skillnameshere, certnameshere).send({from: accounts[0]}).then(function(){
			console.log("Skill successfully added");
			alert("Skill successfully added for endorsement");
			window.location.reload();
		});
    }
  }
}

var accounts;
var contract;
var tempskillist;
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
    contract.methods.viewAllSkills(accounts[0]).call().then(function(skillist,y ,z){
      console.log(skillist);
	  console.log(y);
      tempskillist=skillist;
      for(let i=0;i<tempskillist[0].length;i++){
        createlistitems(tempskillist[0][i], tempskillist[1][i], tempskillist[2][i]);
      }
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
  
  // Accounts
  var account;
  
  function registerSetInfo() {
    contract = new web3.eth.Contract(abi, contractAddress);
    info = $("#newInfo").val();
	
    // contract.methods.verifyDoc(info).send( {from: accounts[0]}).then(function() {
    //   if(info==0){
    //     $('#lastInfo').html("Awaited");
    //   }
    //   else if(info==1){
    //     $('#lastInfo').html("Validated successfully");
    //   }
    //   else{
    //     $('#lastInfo').html("Failed to verify skill");
    //   }
      
    // });
    
  }
  
  function registerGetInfo() {
    contract = new web3.eth.Contract(abi, contractAddress);
    // contract.methods.viewStatus().call().then( function( info ) {
    //   console.log("Status: ", info);
    //   if(info==0){
    //     $('#lastInfo').css("color","brown");
    //     $('#lastInfo').css("font-size","18px");
    //     $('#lastInfo').html(" Awaited");
    //   }
    //   else if(info==1){
    //     $('#lastInfo').css("color","green");
    //     $('#lastInfo').css("font-size","18px");
    //     $('#lastInfo').html("&nbsp;&#10003; Validated successfully!!");
    //   }
    //   else{
    //     $('#lastInfo').css("color","red");
    //     $('#lastInfo').css("font-size","18px");
    //     $('#lastInfo').html("&nbsp;&#9746;Failed to verify skill ");
    //   }
    // });
  }



  
  