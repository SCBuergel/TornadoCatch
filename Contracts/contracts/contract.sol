pragma solidity >=0.4.22 <0.7.0;

contract Contract {
    uint public a = 123;

    function setValue(uint newVal) external {
        a = newVal;
    }

    //function returnValue returns ()
}