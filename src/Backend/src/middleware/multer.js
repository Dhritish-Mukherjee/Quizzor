const multer = require('multer');
const path = require('path');
const fs = require('fs');
const pdf = require('pdf-parse');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, './public/uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

async function extractPDFText(filePath) {
  const dataBuffer = fs.readFileSync(filePath);
  const data = await pdf(dataBuffer);
  return data.text;
}

// Middleware function
async function pdfUploadMiddleware(req, res, next) {
  try {
    const fileUrl = `/uploads/${req.file.filename}`;
    const filePath = req.file.path;

    const extractedText = await extractPDFText(filePath);

    // Delete file after extraction
    fs.unlinkSync(filePath);

    // Attach extracted data to req object for next middleware/route handler
    req.pdfData = {
      extractedText,
      fileInfo: req.file,
      fileUrl
    };

    next(); // Pass control to next middleware/route handler
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Usage example:
// app.post('/upload', upload.single('file'), pdfUploadMiddleware, (req, res) => {
//   res.json({
//     message: "File uploaded successfully!",
//     ...req.pdfData
//   });
// });

module.exports = { upload, pdfUploadMiddleware };