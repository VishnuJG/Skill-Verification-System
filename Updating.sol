// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Skill{
    
    struct skillstruct{
        string[] skillnames;
        string[] certnames;
        int[] endor;
        address[][] endorvalidators;
    }

    int flag;
    string[] emps;
    string[] passes;
    // skillset[] empskills;
    mapping(address => skillstruct) skills;
    int maxval;
    constructor()  {
        flag=0;
        maxval=3;
    }

    function viewUsers() view public returns(string[] memory, string[] memory){
        return (emps, passes);
    }
    
    function addUsers(string memory uname, string memory passw) public {
        emps.push(uname);
        passes.push(passw);
    }
    
    function viewSenderSkills()view public returns(string[] memory, string[] memory, int[] memory){
        return (skills[msg.sender].skillnames, skills[msg.sender].certnames, skills[msg.sender].endor);
    }

    function viewAllSkills(address namesofusers)view public returns(string[] memory, string[] memory, int[] memory, address[][] memory){
        return (skills[namesofusers].skillnames, skills[namesofusers].certnames, skills[namesofusers].endor, skills[namesofusers].endorvalidators);
    }

    function addSkill(string memory nameOfSkill, string memory certOfSkill) public {
        
        // skillstruct memory temp=skillstruct([nameOfSkill, certOfSkill], maxval);
        skills[msg.sender].skillnames.push(nameOfSkill);
        skills[msg.sender].certnames.push(certOfSkill);
        skills[msg.sender].endor.push(maxval);
        skills[msg.sender].endorvalidators.push([msg.sender]);
    }

    function endorseSkills(string memory nameOfSkill, string memory certOfSkill, address namesofusers) public {
        uint i=0;
        for(;i<skills[namesofusers].skillnames.length;i++){
            if(keccak256(bytes(nameOfSkill))==keccak256(bytes(skills[namesofusers].skillnames[i]))){
                if(keccak256(bytes(certOfSkill))==keccak256(bytes(skills[namesofusers].certnames[i]))){
                    break;
                }
            }
        }
        if(skills[namesofusers].endor[i]>0){
            skills[namesofusers].endor[i]-=1;
            skills[namesofusers].endorvalidators[i].push(msg.sender);
        }
    }
}
