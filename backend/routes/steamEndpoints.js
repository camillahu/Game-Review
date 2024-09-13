const express = require('express');
const router = express.Router(); 

router.get("/steam", async (req, res) => {  // res er et objekt sender respons tilbake til klienten
    try {
      const result= await GetAppList();
      res.send(await result.json())
    } catch (err) {
        console.error(err);
        res.status(500).send('Database connection error');
    } 
});

async function GetAppList() {

    const result = await fetch('https://api.steampowered.com/ISteamApps/GetAppList/v0002/?format=json')
    return result;
}

module.exports = router;