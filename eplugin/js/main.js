// const URL = 'ws://localhost:3030';
// let ws = new WebSocket(URL);
chrome.browserAction.setBadgeText({text: ""});

var numMatches = 0;

var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(xhttp.responseText);
        var matches = response;
        for (var c = numMatches; c < matches.length; c++ ){
            addRow(matches[c]);
        }
        numMatches = matches.length;
    }
};

const endpoint = "http://localhost:8080/matches"

xhttp.open("GET", endpoint, true);
xhttp.send();

// poll the number of entries every 2 seconds to render the notification
setInterval(() => {
    xhttp.open("GET", endpoint, true);
    xhttp.send();
}, 2000)

function addRow(rowData) { //Once required JSON file, pass variable instance of it to printTable
    //Initializing variable for creating HTML elements
    var tr = document.createElement("TR");

    var macAddress = document.createElement("TD");
    macAddress.setAttribute("id", "MAC");
    var a1 = document.createElement("A");
    a1.setAttribute("href", "https://kovan.etherscan.io/tx/" + rowData["hash"]);
    a1.setAttribute("target", "_blank");
    var addressText = document.createTextNode(rowData["MAC"]);
    a1.appendChild(addressText);
    macAddress.appendChild(a1);

    var time = document.createElement("TD");
    time.setAttribute("id", "time");
    var a2 = document.createElement("A");
    a2.setAttribute("href", "https://kovan.etherscan.io/tx/" + rowData["hash"]);
    a2.setAttribute("target", "_blank");
    var timeText = document.createTextNode(rowData["time"]);
    a2.appendChild(timeText);
    time.appendChild(a2);

    var hash = document.createElement("TD");
    hash.setAttribute("id", "hash");
    var a3 = document.createElement("A");
    a3.setAttribute("href", "https://kovan.etherscan.io/tx/" + rowData["hash"]);
    a3.setAttribute("target", "_blank");
    var hashText = document.createTextNode(rowData["hash"].substring(0, 8) + "...");
    a3.appendChild(hashText);
    hash.appendChild(a3);

    var URL = document.createElement("TD");
    URL.setAttribute("id", "URL");
    var a4 = document.createElement("A");
    a4.setAttribute("href", "https://kovan.etherscan.io/tx/" + rowData["hash"]);
    a4.setAttribute("target", "_blank");
    var URLText = document.createTextNode(rowData["URL"]);
    a4.appendChild(URLText);
    URL.appendChild(a4);

    var table = document.getElementById("mainTable");
    tr.appendChild(macAddress);
    tr.appendChild(time);
    tr.appendChild(hash);
    tr.appendChild(URL);
    table.appendChild(tr);
}