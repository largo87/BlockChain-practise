pragma solidity >=0.4.21 <0.6.0;

/**
we declare the smart contract with the "contract" keyword, followed by the contract name.
 */
contract Premium{

     string value;

    constructor() public {
        value = "myValue";
    }

    function get() public view returns(string memory) {
        return value;
    }
     //when we change the value we update the blockchain
    function set(string memory _value) public {
        value = _value;
    }
}

