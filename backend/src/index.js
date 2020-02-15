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

  if (String.fromCharCode(data[0]) != "[") {
    data = "[" + data;
  }

  // strip 
  if (String.fromCharCode(data[data.length - 1]) != "]") {
    data[data.length - 1] = "]".charCodeAt(0);
  }
  console.log("data: " + data);

  // now that JSON is repaired we can parse it
  let packet = JSON.parse(data);
  console.log("re-serialized: " + JSON.stringify(packet));
  let source = packet._source;
  let layers = source.layers;

  // skip this packet if it has no time, MAC address, URL or IP
  // typically this should only be missing dns.a
  // (in case it's a request and not a response)
  if (!layers.hasOwnProperty("frame.time") ||
      !layers.hasOwnProperty("wlan.da") || 
      !layers.hasOwnProperty("dns.qry.name" ||
      !layers.hasOwnProperty("dns.a"))) {
        return;
      }

  let frametime = layers["frame.time"][0];
  let wlanda = layers["wlan.da"][0];
  let dnsqryname = layers["dns.qry.name"][0];
  let dnsas = layers["dns.a"];
  console.log(frametime, "---", wlanda, "---", dnsqryname, "---", JSON.stringify(dnsas));
  // TODO: process data here

});

proc.stderr.on("data", (data) => {
  console.error("stderr: ${data}");
});

proc.on("close", (code) => {
  console.log(`child process exited with code ${code}`);
});

// \END tshark SECTION
