const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const web3 = require('web3');
const childProcess = require('child_process');

// SOCKET STUFF
const WebSocket = require("ws");
const wss = new WebSocket.Server({port: 3030});
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

// \END SOCKET STUFF

// REST API STUFF
const app = express();

var matches = [];

matches.push({
    "mac": "23:34:34:23:12",
    "trx": "0x243458990308505885830850358035358",
    "issueAt": "2020-02-13 06:30:23",
})


app.use(helmet());
app.use(cors());
app.use(bodyParser.json());
app.use(morgan('combined'));

app.get("/", (req, res) => {
    const m = matches.map(match => (
        {
            mac: match.mac,
            trx: match.trx,
            issueAt: match.issueAt,
        }
    ));
    res.send(m);
});

app.listen(8081, ()=>{
    console.log("Listening on port 8081");
});

// \END REST API STUFF

// BEGIN tshark SECTION

var wifiData = [];

const wifiInterfaceName = "en0"; // @NOTE: probably needs to be changed for Windows

// start tshark listening for DNS packets and recording for each packet
// time, requester MAC address, URL, IP(s)
const proc = childProcess.spawn(
  "tshark", 
  ["-i", "en0",
  "-I",
  "-l",
  "-Tjson",
  "-e", "frame.time", 
  "-e", "wlan.da", 
  "-e", "dns.qry.name", 
  "-e", "dns.a",
  "port 53"]
);

proc.stdout.on("data", (data) => {

  // Unfortunately tshark is not encoding valid JSON.
  // Since we flush the buffer at the end of each packet
  // it returns an unterminated single array entry.
  // Thus we have to add the opening `[` if it was missing
  // and add the add a closing `]` and strip commas

  // strip opening comma (if necessary)
  if (String.fromCharCode(data[0]) == ",") {
    data[0] = " ".charCodeAt(0);
  }

  // add opening bracket (if necessary)
  if (String.fromCharCode(data[0]) != "[") {
    data = "[" + data;
  }

  // strip closing comma (if necessary)
  if (String.fromCharCode(data[data.length - 1]) == ",") {
    data[data.length - 1] = "]".charCodeAt(0);
  }

  // add closing bracket (if necessary)
  if (String.fromCharCode(data[data.length - 1]) != "]") {
    data += "]";
  }


  //console.log("data: " + data);


  // now that JSON is repaired we can parse it
  let packets = JSON.parse(data);
  //console.log("length: " + packets.length);
  packets.forEach(packet => {
  //console.log("re-serialized: " + JSON.stringify(packet));
    let source = packet._source;
    let layers = source.layers;
  
    // skip this packet if it has no time, MAC address, URL or IP
    // typically this should only be missing dns.a
    // (in case it's a request and not a response)
    if (layers["frame.time"] === undefined ||
        layers["wlan.da"] === undefined ||
        layers["dns.qry.name"] === undefined ||
        layers["dns.a"] === undefined) {
      return;
    }

    let time = Date.parse(layers["frame.time"][0]);
    let MAC = layers["wlan.da"][0];
    let URL = layers["dns.qry.name"][0];
    let IPs = layers["dns.a"];

    // keep data in memory
    wifiData.push({
      "time": time,
      "MAC": MAC,
      "URL": URL,
      "IPs": IPs
    });

    console.log(time, "---", MAC, "---", URL, "---", JSON.stringify(IPs));
  });
});

proc.stderr.on("data", (data) => {
  console.error("stderr: ${data}");
});

proc.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});

// \END tshark SECTION


// LISTENING FOR TORNADO CONTRACT

web3js = new web3("wss://mainnet.infura.io/ws/v3/bffcc6c52d79446c82d56282b076400a");

const tornado_eht_01_abi = [{"constant":false,"inputs":[{"internalType":"address","name":"_newOperator","type":"address"}],"name":"changeOperator","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"nullifierHashes","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes","name":"_proof","type":"bytes"},{"internalType":"bytes32","name":"_root","type":"bytes32"},{"internalType":"bytes32","name":"_nullifierHash","type":"bytes32"},{"internalType":"address payable","name":"_recipient","type":"address"},{"internalType":"address payable","name":"_relayer","type":"address"},{"internalType":"uint256","name":"_fee","type":"uint256"},{"internalType":"uint256","name":"_refund","type":"uint256"}],"name":"withdraw","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"verifier","outputs":[{"internalType":"contract IVerifier","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_left","type":"bytes32"},{"internalType":"bytes32","name":"_right","type":"bytes32"}],"name":"hashLeftRight","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"pure","type":"function"},{"constant":true,"inputs":[],"name":"FIELD_SIZE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"levels","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"operator","outputs":[{"internalType":"address","name":"","type":"address"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32[]","name":"_filledSubtrees","type":"bytes32[]"},{"internalType":"bytes32","name":"_root","type":"bytes32"}],"name":"initializeTreeForMigration","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_root","type":"bytes32"}],"name":"isKnownRoot","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"name":"commitments","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[],"name":"finishMigration","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"denomination","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"currentRootIndex","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32[]","name":"_commitments","type":"bytes32[]"},{"internalType":"bytes32[]","name":"_nullifierHashes","type":"bytes32[]"}],"name":"migrateState","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"internalType":"address","name":"_newVerifier","type":"address"}],"name":"updateVerifier","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32[]","name":"_nullifierHashes","type":"bytes32[]"}],"name":"isSpentArray","outputs":[{"internalType":"bool[]","name":"spent","type":"bool[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"isMigrated","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"internalType":"bytes32","name":"_commitment","type":"bytes32"}],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[],"name":"getLastRoot","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"roots","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ROOT_HISTORY_SIZE","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"bytes32","name":"_nullifierHash","type":"bytes32"}],"name":"isSpent","outputs":[{"internalType":"bool","name":"","type":"bool"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"zeros","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"ZERO_VALUE","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"filledSubtrees","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"nextIndex","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"contract IVerifier","name":"_verifier","type":"address"},{"internalType":"uint256","name":"_denomination","type":"uint256"},{"internalType":"uint32","name":"_merkleTreeHeight","type":"uint32"},{"internalType":"address","name":"_operator","type":"address"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"bytes32","name":"commitment","type":"bytes32"},{"indexed":false,"internalType":"uint32","name":"leafIndex","type":"uint32"},{"indexed":false,"internalType":"uint256","name":"timestamp","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"bytes32","name":"nullifierHash","type":"bytes32"},{"indexed":true,"internalType":"address","name":"relayer","type":"address"},{"indexed":false,"internalType":"uint256","name":"fee","type":"uint256"}],"name":"Withdrawal","type":"event"}];
const tornado_eth_01_address = "0x12D66f87A04A9E220743712cE6d9bB1B5616B8Fc";

let tornado_eth_01_contract = new web3js.eth.Contract(tornado_eht_01_abi, tornado_eth_01_address);

tornado_eth_01_contract.events.allEvents(
  {
    fromBlock: 9487073, 
    //toBlock: "latest",
    //topics: ["0xa945e51eec50ab98c161376f0db4cf2aeba3ec92755fe2fcd388bdbbb80ff196", null],
  }
).on("connected", function(subscriptionId){
  console.log(`Connected: ${subscriptionId}`);
}).on("data", function(event){
  console.log("New data...");
  console.log(event);
}).on("error", function(err, receipt){
  console.log(err);
  console.log(receipt);
});