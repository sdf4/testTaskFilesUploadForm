const express = require("express");
const routes = express();
const loadFiles = require("./loadFiles");
const getFiles = require("./getFiles");
const deleteFile = require("./deleteFile");

routes.use(express.static("./src/public"));
routes.post("/files", loadFiles);
routes.get("/files", getFiles);
routes.delete("/files/:name", deleteFile);

module.exports = routes;
