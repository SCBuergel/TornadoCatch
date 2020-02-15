const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const fs = require('fs');
const web3 = require('web3');
const childProcess = require('child_process');

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

web3js = new web3(new web3.providers.HttpProvider("https://mainnet.infura.io/v3/bffcc6c52d79446c82d56282b076400a"));

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
