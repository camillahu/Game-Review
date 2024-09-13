require('dotenv').config();

const express = require('express');
const app = express();

const localDbEndpoints = require('./routes/localDbEndpoints');
const steamEndpoints = require('./routes/steamEndpoints');

app.use('/localdb', localDbEndpoints);
app.use('/steam', steamEndpoints);


const port = process.env.PORT ?? 3000;
app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

module.exports={app};
