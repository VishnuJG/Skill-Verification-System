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
function createlistitems(skillname, skillcert, skillendor, username){
	var tempcol="#FF8C00";
	if(skillendor==0){
		tempcol="#008000";
	}
  
  document.querySelector('#tasks').innerHTML += `
      <div class="task" style="background-color:${tempcol}">
	  		<span id="taskname" >
              ${username}
              
          	</span>
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
          contract = new web3.eth.Contract(abi, contractAddress);
            contract.methods.endorseSkills(skillname, skillcert, '0x7DD03D0Ea0dC1EDB92Cc0Ff4421C2F60c671c814').send({from: accounts[0]}).then(function(){
                console.log("Skill endorsed successfully");
                alert("Skill successfully endorsed");
                window.location.reload();
                this.parentNode.remove();
            });

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

function endorseFromValidator(){
	var usernamehere=document.querySelector('#userid').value;
	var skillnameshere=document.querySelector("#skills").value;
	var certnameshere=document.querySelector('#skillcert').value;
	console.log(usernamehere);
	console.log(certnameshere);
	contract = new web3.eth.Contract(abi, contractAddress);
	contract.methods.endorseSkills(skillnameshere, certnameshere, usernamehere).send({from: accounts[0]}).then(function(){
		console.log("Skill endorsed successfully");
		alert("Skill successfully endorsed");
		window.location.reload();
		this.parentNode.remove();
	});
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
	var userids;
	contract.methods.viewUsers().call().then(function (info) {
		console.log(info[0]);
		for(let i = 0; i < info[0].length; i++) {
			viewSkillonDashboard(info[0][i]);
		}
	});
	
    // contract.methods.viewAllSkills('0x7DD03D0Ea0dC1EDB92Cc0Ff4421C2F60c671c814').call().then(function(skillist,y ,z){
    //   console.log(skillist);
    //   tempskillist=skillist;
    //   for(let i=0;i<tempskillist[0].length;i++){
    //     createlistitems(tempskillist[0][i], tempskillist[1][i], tempskillist[2][i], tempskillist[3][0]);
    //   }
    // });
  });
  
function viewSkillonDashboard(usname){
	contract.methods.viewAllSkills(usname).call().then(function(skillist,y ,z){
		console.log(skillist);
		tempskillist=skillist;
		for(let i=0;i<tempskillist[0].length;i++){
		  createlistitems(tempskillist[0][i], tempskillist[1][i], tempskillist[2][i], usname);
		}
	  });
}

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
  }
  
  function registerGetInfo() {
    contract = new web3.eth.Contract(abi, contractAddress);
    
  }



  
  