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

// childProcess.exec('cat *.js missing_file | wc -l', (error, stdout, stderr) => {
//     if (error) {
//       console.error(`exec error: ${error}`);
//       return;
//     }
//     console.log(`stdout: ${stdout}`);
//     console.error(`stderr: ${stderr}`);
//   });
  
// tcpdump -I -i en0 -w tout "udp port 53"
// const ls = childProcess.spawn("tcpdump", ["-i", "en0", "-I", "udp port 53"]);
const ls = childProcess.spawn("tshark", ["-i", "en0", "-I", "-l", "port 53"]);
// const ls = childProcess.spawn("tshark", ["-i", "en0", "-I"]);
// const ls = childProcess.spawn("ls", ["index.js"]);

ls.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
  });
  
  ls.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });
  
  ls.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

//   setInterval(() => {
//       console.log("checking...");
//   }, (
//       1000
//   ));