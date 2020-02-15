const WebSocket = require("ws");

class CatcherAPI {

    constructor() {
        this.wss = new WebSocket.Server({port: 3031});

        this.wss.on("connection", function connection(ws) {
            console.log("WebSocket is online on port: 3030");
        
            ws.send(JSON.stringify({
                msg: "Hello World"
            }));
        
          ws.on("message", function incoming(data) {
            wss.clients.forEach(function each(client) {
              if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(data);
              }
            });
          });
        });
        
    }

    send(data) {
        if(this.wss)
            return this.wss.server.send(JSON.stringify(data));
        else
            return null;
    }
}

const catcherApi = new CatcherAPI();
module.exports = catcherApi;