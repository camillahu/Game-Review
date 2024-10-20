const express = require("express");
const multer = require("multer");  //npm install multer
const path = require("path");

const router = express.Router();

//all of this is taken from chatGPT, so I'm not claiming it as my own.

// Define storage for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      // Ensure that the images are stored in 'public/img' folder
      cb(null, path.join(__dirname, '../public/img'));  
    },
    filename: (req, file, cb) => {
      // Save file with a timestamp to ensure unique names
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
  // Initialize multer upload instance
  const upload = multer({ storage: storage });
  
  // Route to handle image upload
  router.post('/', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
  
      // Construct image file path for response
      const imgPath = `/img/${req.file.filename}`;
      res.json({ imgPath }); // Return the path to the client
    } catch (error) {
      console.error('Error during file upload:', error);
      res.status(500).json({ error: 'Error uploading file' });
    }
  });
  
  module.exports = router;