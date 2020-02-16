// const URL = 'ws://localhost:3030';
// let ws = new WebSocket(URL);

// ws.onopen = () => {
//     // on connecting, do nothing but log it to the console
//     console.log('socket connected')
// }

// ws.onmessage = evt => {
//     // on receiving a message, add it to the list of messages
//     const message = JSON.parse(evt.data)
//     console.log(evt.data);
//     addRow(message);
//     chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
//     chrome.browserAction.setBadgeText({text: "New"});
// }

// ws.onerror = (err) => {
//     console.log("WS error: " + err);
// }

// // this.ws.onclose = () => {
// //     console.log('socket disconnected')
// //     // automatically try to reconnect on connection loss
// //     this.setState({
// //         ws: new WebSocket(URL),
// //     })
// // }

// document.addEventListener("click", function() {
//     chrome.browserAction.setBadgeText({text: ""});
// });

// function addRow(rowData) { //Once required JSON file, pass variable instance of it to printTable
//     //Initializing variable for creating HTML elements
//     var tr = document.createElement("TR");

//     var macAddress = document.createElement("TD");
//     macAddress.setAttribute("id", "MAC");
//     var a1 = document.createElement("A");
//     a1.setAttribute("href", "https://kovan.etherscan.io/tx/" + rowData["hash"]);
//     a1.setAttribute("target", "_blank");
//     var addressText = document.createTextNode(rowData["MAC"]);
//     a1.appendChild(addressText);
//     macAddress.appendChild(a1);

//     var time = document.createElement("TD");
//     time.setAttribute("id", "time");
//     var a2 = document.createElement("A");
//     a2.setAttribute("href", "https://kovan.etherscan.io/tx/" + rowData["hash"]);
//     a2.setAttribute("target", "_blank");
//     var timeText = document.createTextNode(rowData["time"]);
//     a2.appendChild(timeText);
//     time.appendChild(a2);

//     var hash = document.createElement("TD");
//     hash.setAttribute("id", "hash");
//     var a3 = document.createElement("A");
//     a3.setAttribute("href", "https://kovan.etherscan.io/tx/" + rowData["hash"]);
//     a3.setAttribute("target", "_blank");
//     var hashText = document.createTextNode(rowData["hash"].substring(0, 8) + "...");
//     a3.appendChild(hashText);
//     hash.appendChild(a3);

//     var URL = document.createElement("TD");
//     URL.setAttribute("id", "URL");
//     var a4 = document.createElement("A");
//     a4.setAttribute("href", "https://kovan.etherscan.io/tx/" + rowData["hash"]);
//     a4.setAttribute("target", "_blank");
//     var URLText = document.createTextNode(rowData["URL"]);
//     a4.appendChild(URLText);
//     URL.appendChild(a4);

//     var table = document.getElementById("mainTable");
//     tr.appendChild(macAddress);
//     tr.appendChild(time);
//     tr.appendChild(hash);
//     tr.appendChild(URL);
//     table.appendChild(tr);
// }