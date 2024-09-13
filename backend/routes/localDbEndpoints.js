
const express = require('express');
const sql = require('mssql');
const {dbCon, closeDbCon} = require('../dbcon.js');
const router = express.Router(); 


router.get("/allGames", async (req, res) => {  // res er et objekt sender respons tilbake til klienten
    try {
        await dbCon();
        const result = await sql.query('SELECT * FROM dbo.Games'); // result er resultatet av sql-spørringen
        res.json(result.recordset)  
        // sender responsen som json til klienten. recordset er et 
        // property av result som inneholder radene som blir returnert av spørringen. Det er en array av objekter hvor hvert objekt representerer en rad med data. 
    } catch (err) {
        console.error(err);
        res.status(500).send('Database connection error');
    } finally {
        closeDbCon();
    }
});

module.exports = router;
