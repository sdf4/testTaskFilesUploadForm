const express = require("express");
const app = express();
const routes = require("./routes");
const port = process.env.PORT || 3000;

var morgan = require("morgan");
var path = require("path");
var rfs = require("rotating-file-stream");

// create a rotating write stream
var accessLogStream = rfs.createStream("access.log", {
  size: "10M", // rotate every 10 MegaBytes written
  interval: "1d", // rotate daily
  compress: "gzip", // compress rotated files
  path: path.join(__dirname, "log"),
});

// setup the logger
app.use(morgan("combined", { stream: accessLogStream }));

app.use("/", routes);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
