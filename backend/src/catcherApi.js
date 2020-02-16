const express = require("express");
const cors = require("cors");

// local dependencies
const matchMaker = require("./matchMaker.js");

const app = express();
app.use(cors());

const port = 8080;

app.get("/matches", (req, res) => {
  const matches = matchMaker.matches;
  res.send(JSON.stringify(matches));
});

app.get("/matchCount", (req, res) => {
  const count = matchMaker.matches.length;
  res.send(count.toString());
});

app.listen(port, ()=>{
    console.log("Listening on port " + port);
});