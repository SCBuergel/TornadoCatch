const EventEmitter = require("events");

// local dependencies
const networkCatcher = require("./networkCatcher.js");
const chainCatcher = require("./chainCatcher.js");
const catcherApi = require("./catcherApi.js");

class MatchMaker extends EventEmitter {
    constructor() {
        super();
        let packets = [];
        let txs = [];

        networkCatcher.on("newPacket", (packet) => {
            packets.push(packet);
            console.log(packet);
        });

        chainCatcher.on("newTx", (tx) => {
            txs.push(tx);
            console.log(tx);
        });

        function match() {
            // MAC
            // time
            // hash
            // URL    
        }
    
    }
}

const matchMaker = new MatchMaker();
module.exports = matchMaker;