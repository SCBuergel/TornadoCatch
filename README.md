# prehack
little warm up to ETHDever hackathon

## Architecture Overview
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

## Raspberry Pi Setup
Running Kali Linux

### tshark
- Record only DNS responses
- For each DNS response we store:
  - requesting MAC address
  - time
  - domain
  - array of IPs

## NodeJS script 1 (matching)
- Check if a new file was being written (means previous file is done)
- Check if tornado.cash was anywhere in the responses
- If yes, check if some on-chain tx happened on TornadoCash smart contract
- If also yes, write value into some DB (e.g. text file for now)
- REST API endpoint serves that value

## Node script 2 (webserver)
- serves static web content
- connects to REST API from script 1


