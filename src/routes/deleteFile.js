const fs = require("fs");
const { promisify } = require("util");

const unlinkAsync = promisify(fs.unlink);

module.exports = async (req, res) => {
  let filename = decodeURIComponent(req.params["name"]);

  let fileFullpath = `./src/public/uploads/${filename}`;

  try {
    await unlinkAsync(fileFullpath);
  } catch (e) {
    console.log(e);
    res.status(500).end();
  }

  res.status(204).end();
};
