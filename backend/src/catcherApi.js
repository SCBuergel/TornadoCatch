const WebSocket = require("ws");

// local dependencies
const matchMaker = require("./matchMaker.js");

const wss = new WebSocket.Server({port: 3031});

wss.on("connection", function connection(ws) {
  console.log("WebSocket is online on port: 3031");

  matchMaker.on("newMatch", (matchData) => {
    console.log("NEW MATCH: " + JSON.stringify(matchData, null, 2));
    ws.send(JSON.stringify(matchData));
  })
  .on("error", (err) => {
    console.log("Catcher WS error: "+ err);
  });

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
});



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