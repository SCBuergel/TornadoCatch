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
    // match();
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

    const tx = txs[txs.length - 1];

    const targetDomain = ".com";
    const deltaTimeS = 100;

    // find all packets of target domain
    let targetPackets = [];
    console.log("going to process another match...");
    packets.forEach((packet) => {
        let url = packet.URL;
        if(packet.URL.includes(targetDomain)) {
            // we found a packet for the target domain!
            // now check if there are any transactions within +/- deltaTimeS
            // which match the dapp

            //console.log("found packet: " + JSON.stringify(packet));
            const txTime = tx.blockTime;
            const packetTime = packet.time / 1000;
            const dt = Math.abs(txTime - packetTime);
            //console.log("txTime: " + txTime + ", packetTime: " + packetTime + ", dt: " + dt);

            if(dt < deltaTimeS) {
                console.log("MATCH");
                matchMaker.emit("newMatch", {
                    MAC: packet.MAC,
                    time: tx.blockTime,
                    hash: tx.txHash,
                    URL: packet.URL
                });

                // in order to prevent multiple results, remove the tx and return
                txs.pop();
                return;
            }
        }
    })



}

module.exports = matchMaker;