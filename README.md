# TornadoCatch
TornadoCatch is a demonstrator to raise awareness for network-level privacy issues on Ethereum. It records wifi traffic and on-chain activity and (optimistically) find matching activities based on temporal overlap. This allow for de-anonymization of dapp users. As an example we chose the popular token mixer Tornado.Cash. A Tornado.Cash user who is on the same wifi is the recording server is thus at risk of being de-anonymized and should use at least a VPN, ideally TOR - or reach out to the HOPR.network team.

## Architecture Overview
The TornadoCatch application comprises a NodeJS catcher server that records data and attempts to find matches as well as a Chrome extension that connects to the catcher server and renders matches.
```
 ----------------------------
| NodeJS catcher server      |
| - tshark                   | <-- WiFi (watching DNS response packets)
| - web3.js                  | <-- Ethereum (watching TornadoCash contract)
| - find matches             |
| - serve matches via API    |
 ----------------------------
        ^                
        |                
  REST-JSON API
        |                
        v                
 -------------------------
| Chrome extension        |
| - Receive matches       |
| - Render matches        |
 -------------------------
 ```

## Functional Overview
1. NodeJS catcher server --> `backend/src/index.js`
    1.  Record wifi data via tshark --> `backend/src/networkCatcher.js`
    2.  Record on-chain data via web3.js --> `backend/src/chainCatcher.js`
    3.  Look for matches between network and on-chain data --> `backend/src/matchMaker.js`
    4.  Serve resulting matches via REST-JSON API--> `backend/src/networkCatcher.js`
2. Chrome extension
   1. Connect to NodeJS catcher server (see above)
   2. Render button change upon new match
   3. Render table with all matches when clicking extension button

## `tshark`
TornadoCatch requires `tshark` to be installed. `tshark` is usually installed along with Wireshark and the installer can be obtained from their [website](https://wireshark.org/). `tshark` is a command line tool that allows recording and analysis of network packets. We use it to record data packets responses that we later attempt to match with on-chain activity. In our solution, packets are filtered by IP addresses that belong to the TornadoCash webservers.
For each packet response we store:
  - time
  - requesting MAC address
  - domain
  - URL

### `tshark` Parameters
Complete command: `tshark -i en0 -I -l -Tjson -e frame.time -e wlan.da "src 185.199.108.153 or src 185.199.109.153 or src 185.199.110.153 or src 185.199.111.153"`
Breakdown of parameters:
- `-i en0` -> listens on interface en0 (wifi) 
- `-I` -> monitor mode (capture without associating with any wifi router)
- `-l` -> flushes the buffer after every packet instead of caching for longer
- `-Tfields` -> output the fields specified via the `-e` parameter(s)
- `-e frame.time` -> UTC time of when the frame was recorded
- `-e wlan.da` -> output the wifi destination MAC address
- `src 185.199.108.153 or src 185.199.109.153 or src 185.199.110.153 or src 185.199.111.153` -> last parameter is the recording filter here we filter all traffic from Tornado.Cash webservers.

### Gotachs
- the wifi interface `en0` might be called differently on other operating systems
- despite the `-l` parameter, `tshark` is serving packets in a broken JSON array so we need to do some automatic post-processing of the recorded data before attempting to match data

## Requirement
- NodeJS 12 with `npm`
- tshark
- unencrypted wifi (otherwise the tshark command needs to be amended)

## Chrome Extension and Demo
1. Clone or download this repository onto your laptop
2. In order to load the Chrome extension, open Chrome (or Brave) and navigate to [chrome://extensions](chrome://extensions). Enable developer mode (top right corner) and then click the `Load unpacked` button (top lef corner) and select the `eplugin` folder from this repository on your computer.
3. You should now see a little Ethereum logo as an icon in your browser extension list.
4. Open your terminal and navigate to the `backend` folder of this repository. Install the dependencies by typing `npm install`.
5. Run the backend server by typing `node src`, you should see the output `Listening on port 8080`
6. Now open tornado.cash from a browser on the same or a neighboring laptop on the same wifi, and immediately deposit funds. You should see how the TornadoCatcher Extension shows a red counter and when you click it, you see the list of de-anonymized transactions.
