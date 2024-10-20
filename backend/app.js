require('dotenv').config();

const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors'); 

app.use(cors());
app.use(express.json());

// Middleware to serve static files (this allows images in /public/img to be accessed)
app.use(express.static(path.join(__dirname, 'public')));

const localDbEndpoints = require('./routes/localDbEndpoints');
const steamEndpoints = require('./routes/steamEndpoints');
const uploadImgToServer = require('./routes/uploadImgToServer');

app.use('/localdb', localDbEndpoints);
app.use('/api', steamEndpoints);
app.use('/upload', uploadImgToServer);





const port = process.env.PORT ?? 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

module.exports={app};
