const web3 = require('web3');
const metadata = require('../Contracts/build\\contracts/Contract.json');
const abi = metadata.abi;

web3js = new web3(new web3.providers.WebsocketProvider("ws://localhost:8545"));
web3js.eth.getBlockNumber().then(console.log);

const address = "0x846aC8F497a5A7569077655C61C521F0D5545508";

const myContract = new web3js.eth.Contract(abi, address);
myContract.methods.a().call()
.then(console.log);
myContract.methods.setValue(43223).send({
    "from": "0xfc2077CA7F403cBECA41B1B0F62D91B5EA631B5E"
});

myContract.getPastEvents("updatedValue", {
    "fromBlock": 0
}, function (error, event) { 
    console.log(" ondata ", event[0].returnValues.val);
});