const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const fs = require("fs");
const web3 = require("web3");

// local dependencies
//require("./matchMaker.js");
require("./catcherApi.js");

// const app = express();

// var matches = [];

// matches.push({
//   "mac": "23:34:34:23:12",
//   "trx": "0x243458990308505885830850358035358",
//   "issueAt": "2020-02-13 06:30:23",
// })


// app.use(helmet());
// app.use(cors());
// app.use(bodyParser.json());
// app.use(morgan("combined"));

// app.get("/", (req, res) => {
//   const m = matches.map(match => (
//         {
//             mac: match.mac,
//             trx: match.trx,
//             issueAt: match.issueAt,
//         }
//     ));
//     res.send(m);
// });

// app.listen(8081, ()=>{
//     console.log("Listening on port 8081");
// });