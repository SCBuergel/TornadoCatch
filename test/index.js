const web3 = require('web3');
const metadata = require('../Contracts/build\\contracts/Contract.json');
const abi = metadata.abi;
//console.log(JSON.stringify(abi));

web3js = new web3(new web3.providers.HttpProvider("http://localhost:7545"));
web3js.eth.getBlockNumber().then(console.log);

const address = metadata.networks[5777].address;
//console.log(address);
const myContract = new web3js.eth.Contract(abi, address);
myContract.methods.a().call()
.then(console.log);