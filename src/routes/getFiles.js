const fs = require("fs");
const { promisify } = require("util");

const readDirAsync = promisify(fs.readdir);

module.exports = async (req, res) => {
  let files;
  try {
    files = await readDirAsync("./src/public/uploads/");
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }

  let filesUrls = files.map(function (fileName) {
    return `http://${req.headers.host}/uploads/${encodeURIComponent(fileName)}`;
  });

  res.json(filesUrls);
};
