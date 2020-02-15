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
            //console.log(packet);
        });

        chainCatcher.on("newTx", (tx) => {
            console.log("NEW TX RECEIVED!!!")
            txs.push(tx);
            console.log(tx);
        });

        function match() {
            if (packets.length == 0 || txs.length == 0) {
                return;
            }
            
            pIndex = packets.length - 1;
            tIndex = txs.length - 1;

            // this.emit("newMatch", {
            //     MAC: packets[pIndex].MAC,
            //     time: txs[tIndex].
            // })
            // MAC
            // time
            // hash
            // URL    
        }
    
    }
}

const matchMaker = new MatchMaker();
module.exports = matchMaker;