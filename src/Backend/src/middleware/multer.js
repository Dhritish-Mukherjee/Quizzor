const multer = require('multer');
const path = require('path');
const fs = require('fs');


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../../public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });


async function pdfUploadMiddleware(req, res, next) {
  try {
    const filePath = req.file.path;

    req.pdfData = {
      fileInfo: req.file,
      filePath
    };

    next(); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { upload, pdfUploadMiddleware };