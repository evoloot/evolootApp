const express = require("express");
const reload = require("reload");
const path = require("path");
const watch = require("watch");
const helmet = require("helmet");
const app = express();

app.use(helmet());
app.use(helmet.hidePoweredBy({ setTo: 'PHP 7.0.30' }));
app.use(helmet.frameguard());
app.use(helmet.xssFilter());
app.use(helmet.noSniff());

const portNumber = 4000;
const distDirectory = path.join(__dirname, 'dist');
const binDirectory = path.join(__dirname, 'bin');
// app.get("/", (req, res) => {
//   res.sendFile(path.join(distDirectory, 'index.html'));
// });

app.use(express.static(distDirectory));
const reloadServer = reload(app);


watch.watchTree(binDirectory, (f, curr, prev) => {
  console.log("watching files");
  reloadServer.reload();
});

app.listen(portNumber, () => {
  console.log("Listening on port number: " + portNumber)
});
