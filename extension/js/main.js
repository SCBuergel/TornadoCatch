const data = require("../data.json"); //JSON file with data

function printTable() {
    data.forEach(block => {
        //Initializing variable for creating HTML elements
        var tr = document.createElement("TR");

        var macAddress = document.createElement("TD");
        macAddress.setAttribute("id", "macAddress");
        var addressText = document.createTextNode(block.macAddress);
        macAddress.appendChild(addressText);

        var time = document.createElement("TD");
        time.setAttribute("id", "time");
        var timeText = document.createTextNode(block.time);
        time.appendChild(timeText);

        var hash = document.createElement("TD");
        hash.setAttribute("id", "hash");
        var hashText = document.createTextNode(block.hash);
        hash.appendChild(hashText);

        var URL = document.createElement("TD");
        URL.setAttribute("id", "URL");
        var URLText = document.createTextNode(block.URL);
        URL.appendChild(URLText);

        var table = document.getElementById("table");
        tr.appendChild(macAddress);
        tr.appendChild(time);
        tr.appendChild(hash);
        tr.appendChild(URL);
        table.appendChild(tr);
    })
}

document.addEventListener("DOMContentLoaded", printTable);