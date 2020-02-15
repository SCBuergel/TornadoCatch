const networkCatcher = require('./networkCatcher.js');
const chainCatcher = require('./chainCatcher.js');
const catcherApi = require("./catcherApi.js");

let netData = [];
let trxData = [];

networkCatcher.on("network", (data) => {
    console.log(data);
});

chainCatcher.on("new_trx", (trx) => {
    console.log(trx);
});



