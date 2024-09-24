const express = require('express');
const router = express.Router(); 
const cors= require('cors');

router.use(cors());
router.use(express.json())

router.get("/steam", async (_, res) => { 
    try {
      const response= await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json');
      const result = await response.json();
      res.send(result);
    } catch (err) {
        console.error(err);
        res.status(500).send('Database connection error');
    } 
});

module.exports = router;

