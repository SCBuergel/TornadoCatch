var data = [
    {
        "macAddress": "580293423",
        "time": "2/15/2020 18:10",
        "hash": "0x004kc32",
        "URL": "tornado.cash"
    },
    {
        "macAddress": "5844393423",
        "time": "2/15/2020 20:10",
        "hash": "0x4390004kc32",
        "URL": "tornado.cash"
    }
]

function printTable(d) { //Once required JSON file, pass variable instance of it to printTable
    d.forEach(block => {
        //Initializing variable for creating HTML elements
        var tr = document.createElement("TR");

        var macAddress = document.createElement("TD");
        macAddress.setAttribute("id", "macAddress");
        var a1 = document.createElement("A");
        a1.setAttribute("href", "https://etherscan.io/tx/" + block["hash"]);
        a1.setAttribute("target", "_blank");
        var addressText = document.createTextNode(block["macAddress"]);
        a1.appendChild(addressText);
        macAddress.appendChild(a1);

        var time = document.createElement("TD");
        time.setAttribute("id", "time");
        var a2 = document.createElement("A");
        a2.setAttribute("href", "https://etherscan.io/tx/" + block["hash"]);
        a2.setAttribute("target", "_blank");
        var timeText = document.createTextNode(block["time"]);
        a2.appendChild(timeText);
        time.appendChild(a2);

        var hash = document.createElement("TD");
        hash.setAttribute("id", "hash");
        var a3 = document.createElement("A");
        a3.setAttribute("href", "https://etherscan.io/tx/" + block["hash"]);
        a3.setAttribute("target", "_blank");
        var hashText = document.createTextNode(block["hash"]);
        a3.appendChild(hashText);
        hash.appendChild(a3);

        var URL = document.createElement("TD");
        URL.setAttribute("id", "URL");
        var a4 = document.createElement("A");
        a4.setAttribute("href", "https://etherscan.io/tx/" + block["hash"]);
        a4.setAttribute("target", "_blank");
        var URLText = document.createTextNode(block["URL"]);
        a4.appendChild(URLText);
        URL.appendChild(a4);

        var table = document.getElementById("mainTable");
        tr.appendChild(macAddress);
        tr.appendChild(time);
        tr.appendChild(hash);
        tr.appendChild(URL);
        table.appendChild(tr);
    })
}


window.onload = function() {
    printTable(data);
}