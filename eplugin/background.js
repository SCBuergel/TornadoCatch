var numMatches = 0;
var xhttp = new XMLHttpRequest();

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(xhttp.responseText);
        var newMatches = response;
        if (newMatches > 0 && newMatches != numMatches) {
            // console.log("response: " + JSON.stringify(response) + ", lenght: " + newMatches);
            chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
            chrome.browserAction.setBadgeText({text: newMatches.toString()});
            numMatches = newMatches;
        }
    }
};

const endpoint = "http://localhost:8080/matchCount"

xhttp.open("GET", endpoint, true);
xhttp.send();

// poll the number of entries every 2 seconds to render the notification
setInterval(() => {
    xhttp.open("GET", endpoint, true);
    xhttp.send();
}, 2000)