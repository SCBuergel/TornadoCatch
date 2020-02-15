pragma solidity >=0.4.22 <0.7.0;

contract Contract {
    uint public a = 123;

    event updatedValue(uint val, address caller);

    function setValue(uint newVal) external {
        a = newVal;
        emit updatedValue(newVal, msg.sender);
    }
}