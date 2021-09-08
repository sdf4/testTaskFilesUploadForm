const MAX_FILE_SIZE = 50000000; // 50mb
const MAX_FILES_COUNT = 100;
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_FILE_SIZE },
}).array("files-form1", MAX_FILES_COUNT);

module.exports = (req, res) => {
  upload(req, res, function (err) {
    if (err) {
      console.log(err);
      return res.end("Error uploading file.");
    }
    res.status(201).end();
  });
};
