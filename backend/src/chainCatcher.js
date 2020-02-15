const web3 = require("web3");
const EventEmitter = require("events");

// const network = "mainnet"; 
const network = "kovan"; 

class ChainCatcher extends EventEmitter {
    constructor() {
        super();

        // this.web3js = new web3("wss://" + network + ".infura.io/ws/v3/bffcc6c52d79446c82d56282b076400a");
        let web3js = new web3("wss://" + network + ".infura.io/ws/v3/bffcc6c52d79446c82d56282b076400a");

        // const tornado_eht_01_abi = [{"constant":false,"inputs":[{"internalType":"address","name":"_newOperator","type":"address"}],"name":"changeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"nullifierHashes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes","name":"_proof","type":"bytes"},{"internalType":"bytes32","name":"_root","type":"bytes32"},{"internalType":"bytes32","name":"_nullifierHash","type":"bytes32"},{"internalType":"address payable","name":"_recipient","type":"address"},{"internalType":"address payable","name":"_relayer","type":"address"},{"internalType":"uint256","name":"_fee","type":"uint256"},{"internalType":"uint256","name":"_refund","type":"uint256"}],"name":"withdraw","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"verifier","outputs":[{"internalType":"contract IVerifier","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_left","type":"bytes32"},{"internalType":"bytes32","name":"_right","type":"bytes32"}],"name":"hashLeftRight","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"FIELD_SIZE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"levels","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32[]","name":"_filledSubtrees","type":"bytes32[]"},{"internalType":"bytes32","name":"_root","type":"bytes32"}],"name":"initializeTreeForMigration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_root","type":"bytes32"}],"name":"isKnownRoot","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"commitments","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMigration","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"denomination","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentRootIndex","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32[]","name":"_commitments","type":"bytes32[]"},{"internalType":"bytes32[]","name":"_nullifierHashes","type":"bytes32[]"}],"name":"migrateState","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newVerifier","type":"address"}],"name":"updateVerifier","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32[]","name":"_nullifierHashes","type":"bytes32[]"}],"name":"isSpentArray","outputs":[{"internalType":"bool[]","name":"spent","type":"bool[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isMigrated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_commitment","type":"bytes32"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getLastRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roots","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ROOT_HISTORY_SIZE","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_nullifierHash","type":"bytes32"}],"name":"isSpent","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"zeros","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ZERO_VALUE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"filledSubtrees","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextIndex","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IVerifier","name":"_verifier","type":"address"},{"internalType":"uint256","name":"_denomination","type":"uint256"},{"internalType":"uint32","name":"_merkleTreeHeight","type":"uint32"},{"internalType":"address","name":"_operator","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"commitment","type":"bytes32"},{"indexed":false,"internalType":"uint32","name":"leafIndex","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"bytes32","name":"nullifierHash","type":"bytes32"},{"indexed":true,"internalType":"address","name":"relayer","type":"address"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"Withdrawal","type":"event"}];
        // const tornado_eth_01_address = "0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc";
        // const tornadoEventTopic = "0xa945e51eec50ab98c161376f0db4cf2aeba3ec92755fe2fcd388bdbbb80ff196";

        // let tornado_eth_01_contract = new this.web3js.eth.Contract(tornado_eht_01_abi, tornado_eth_01_address);

        const tornado_eht_01_abi = [{"anonymous":false,"inputs":[{"indexed":false,"internalType":"uint256","name":"newVal","type":"uint256"},{"indexed":false,"internalType":"address","name":"caller","type":"address"},{"indexed":false,"internalType":"uint256","name":"time","type":"uint256"}],"name":"myEvent","type":"event"},{"inputs":[{"internalType":"uint256","name":"newVal","type":"uint256"}],"name":"setVal","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"u","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}];
        const tornado_eth_01_address = "0x1f0241592fda095e17fc421da6ecfd5c5e483df5";
        const tornadoEventTopic = "0x489201d5079d06a755c9d1464533c05813c9d42dc1fac3bfe81bc8fab6b66161";
        let tornado_eth_01_contract = new web3js.eth.Contract(tornado_eht_01_abi, tornado_eth_01_address);
        tornado_eth_01_contract.events.allEvents({
            fromBlock: 0, //9487073
            toBlock: 'latest',
            topics: [tornadoEventTopic]
        })
        .on("data", function(eventData) {
            console.log("onData: " + JSON.stringify(eventData));
            web3js.eth.getBlock(eventData.blockHash)
            .then((blockData) => {
                console.log("received blockData: " + JSON.stringify(blockData));
                let txData = {
                    txHash: eventData.txHash,
                    contractAddress: eventData.address,
                    blockHash: eventData.blockHash,
                    blockTime: blockData.timestamp
                }
                console.log("about to emit event: " + JSON.stringify(txData));
                this.emit("newTx", txData);
            });
        })
        .on("connected", function(subscriptionId){
            console.log("Connected: ${subscriptionId}");
        })
        .on("error", function(err, receipt){
            console.log(err);
            console.log(receipt);
        });
        // .on("data", function(event){
        //     console.log(JSON.stringify(event));
        //     this.emit("newTx", event);
        // })

    }
}

const chainCatcher = new ChainCatcher();
module.exports = chainCatcher;