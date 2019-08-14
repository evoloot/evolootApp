const express = require("express");
const reload = require("reload");
const fs = require("fs");
const path = require("path");
const https = require("https");

const portNumber = 4080;
const certOptions = {
  key:fs.readFileSync(path.resolve("certificates/server.key")),
  cert: fs.readFileSync(path.resolve("certificates/server.crt"))
};


const app = express();
app.use(express.static(path.join(__dirname, 'dist')))

// Server works, but https must be added to the website url in order to access it
const server = https.createServer(certOptions,app).listen(portNumber, () => {
  console.log("Listening on port", portNumber);
});
