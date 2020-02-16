const express = require("express");

// local dependencies
const matchMaker = require("./matchMaker.js");

const app = express();

const port = 8080;

app.get("/getMatches", (req, res) => {
  const matches = matchMaker.matches;
  res.send(JSON.stringify(matches));
});

app.listen(port, ()=>{
    console.log("Listening on port " + port);
});


// const WebSocket = require("ws");

// local dependencies
//const matchMaker = require("./matchMaker.js");

// const wss = new WebSocket.Server({port: 3030});

// wss.on("connection", function connection(ws) {
//   console.log("WebSocket is online on port: 3030");

//   matchMaker.on("newMatch", (matchData) => {
//     console.log("NEW MATCH: " + JSON.stringify(matchData, null, 2));
//     console.log("ws: " + JSON.stringify(ws));
//     ws.send(JSON.stringify(matchData));
//   })
//   .on("error", (err) => {
//     console.log("Catcher WS error 1: "+ err);
//   });

//   ws.on("error", (err) => {
//     console.log("CATCHER WS error 1.b: " + err);
//   });

  // ws.on("message", function incoming(data) {
  //   wss.clients.forEach(function each(client) {
  //     if (client !== ws && client.readyState === WebSocket.OPEN) {
  //       client.send(data);
  //     }
  //   });
  // })
  // .on("error", (err) => {
  //   console.log("Web Socket error: " + err);
  // })
// })
// .on("error", (err) => {
//   console.log("Catcher WS error 2: "+ err);
// });


// class CatcherAPI {
//     // send(data) {
//     //     if(this.wss)
//     //         return this.wss.server.send(JSON.stringify(data));
//     //     else
//     //         return null;
//     // }
// }

// const catcherApi = new CatcherAPI();
// module.exports = catcherApi;