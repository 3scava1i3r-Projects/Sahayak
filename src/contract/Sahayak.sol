pragma solidity >=0.4.22 <0.7.0;

contract Sahayak {

    string public skylink;

    function store(string memory _skylink) public{
        _skylink = skylink;
    }

}
