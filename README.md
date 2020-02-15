# prehack
little warm up to ETHDever hackathon

## Architecture Overview
```
 -------------------------
| NodeJS app              |
| 1. tshark + filter      |
| 2. awk for nice output  |
| 3. write data to files  |
| (web3.js)               | <---- Ethereum (watching TornadoCash contract)
| (read from file)        |
| (match wifi + ETH data) |
| (serve as REST API)     |
 -------------------------
        ^                
        |                
    REST API
        |                
        v                
 -------------------------
| Chrome extension        |
| (web frontend)          |
 -------------------------
 ```

## tshark
- Record only DNS responses
- For each DNS response we store:
  - time
  - requesting MAC address
  - domain
  - array of IPs

### tshark parameters
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



## NodeJS script
- Check if new wifi data is available
- Check if tornado.cash was anywhere in the responses
- If yes, check if some on-chain tx happened on TornadoCash smart contract
- If also yes, write value into some DB (e.g. text file for now)
- REST API endpoint serves that value

## Web UI (Chrome extension)
- Keep polling REST API data from endpoint (nicer design: use websockets to get responsive design)
- Popup (or change color of plugin icon?) when a new hit was found on REST API endpoint
