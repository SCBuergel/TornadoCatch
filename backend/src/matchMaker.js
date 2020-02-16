const EventEmitter = require("events");

// local dependencies
const networkCatcher = require("./networkCatcher.js");
const chainCatcher = require("./chainCatcher.js");
//const catcherApi = require("./catcherApi.js");

class MatchMaker extends EventEmitter {}

const matchMaker = new MatchMaker();

let packets = [];
let txs = [];

networkCatcher.on("newPacket", (packet) => {
    packets.push(packet);
    match();
});

chainCatcher.on("newTx", (tx) => {
    txs.push(tx);
    match();
});

function match() {
    if (packets.length == 0 || txs.length == 0) {
        console.log("no tx or packets available...");
        return;
    }

    pIndex = packets.length - 1;
    tIndex = txs.length - 1;

    matchMaker.emit("newMatch", {
        MAC: packets[pIndex].MAC,
        time: txs[tIndex].blockTime,
        hash: txs[tIndex].txHash,
        URL: packets[pIndex].URL
    });
}

module.exports = matchMaker;