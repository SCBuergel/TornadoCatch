# TornadoCatch
TornadoCatch is a demonstrator to raise awareness for network-level privacy issues on Ethereum. It records wifi traffic and on-chain activity and tries to find matching activities. This would allow for de-anonymization of users. As an example we chose the popular token mixer Tornado.Cash.  

## Architecture Overview
The TornadoCatch application comprises a NodeJS catcher server that records data and attempts to find matches as well as a Chrome extension that connects to the catcher server and renders matches.
```
 ----------------------------
| NodeJS catcher server      |
| - tshark                   | <-- WiFi (watching DNS response packets)
| - web3.js                  | <-- Ethereum (watching TornadoCash contract)
| - find matches             |
| - serve matches via ws API |
 ----------------------------
        ^                
        |                
      WS API
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
    4.  Serve resulting matches via websocket API--> `backend/src/networkCatcher.js`
2. Chrome extension
   1. Connect to NodeJS catcher server (see above)
   2. Render button change upon new match
   3. Render table with all matches when clicking extension button

## `tshark`
tshark is a command line tool that allows recording and analysis of network packets. We use it to record DNS responses that we later attempt to match with on-chain activity.
For each DNS response we store:
  - time
  - requesting MAC address
  - domain
  - array of IPs (response)

### `tshark` Parameters
Complete command: `tshark -i en0 -I -l -Tjson -e frame.time -e wlan.da -e dns.qry.name -e dns.a "port 53"`
Breakdown of parameters:
- `-i en0` -> listens on interface en0 (wifi) 
- `-I` -> monitor mode (capture without associating with any wifi router)
- `-l` -> flushes the buffer after every packet instead of caching for longer
- `-Tfields` -> output the fields specified via the `-e` parameter(s)
- `-e frame.time` -> UTC time of when the frame was recorded
- `-e wlan.da` -> output the wifi destination MAC address
- `-e dns.qry.name` -> DNS query name (e.g. `www.google.com`)
- `-e dns.a` -> DNS response (e.g. `172.217.12.3`)
- `port 53` -> last parameter is the recording filter, `port 53` is the DNS protocol. Usually DNS uses UDP but might fall back to TCP therefore we do not specify UDP.

### Gotachs
- the wifi interface `en0` might be called differently on other operating systems
- despite the `-k` parameter, `tshark` is serving packes in a broken JSON array so we need to do some automatic post-processing of the recorded data before attempting to match data.
