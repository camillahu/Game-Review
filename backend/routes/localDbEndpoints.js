
const express = require('express');
const sql = require('mssql');
const {dbCon, closeDbCon} = require('../dbcon.js');
const router = express.Router();
const cors= require('cors');

router.use(cors());
router.use(express.json())


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

router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body; // bruker object destructoring til å hente ut username og password som blir sendt fra klienten. 
        await dbCon();

        const result = await sql.query`SELECT * FROM Users WHERE Username = ${username}`;  //mssql sin query gjør det trygt å bruke parameteret slikt i følge chatgpt.
        const user = result.recordset[0]; //her brukes recordset til å hente ut kun en verdi som er det vi forventer. 
        
        if(user) {
            if(password === user.UserPassword) {
                res.status(200).json({message: 'login successful'});
               
            } else {
                res.status(401).json({ message: 'invalid credentials' });
            }
        }
     else {
        res.status(404).json({ message: 'user not found' });
    }
        
    } catch (err) {
        console.error(err);
        res.status(500).send('database connection error');
    } finally {
        closeDbCon();
    }    
});

router.post("/signup", async (req, res) => {
    try {
        const {username, password} = req.body;
        await dbCon();

        const userNameExists = async (username) => {
            const usernameExistsResult = await sql.query`SELECT * FROM Users WHERE Username = ${username}`;
            return usernameExistsResult.recordset.length > 0;
        }
        if(await userNameExists(username)) {
            console.log('username already exists')
            return res.status(400).json({ message: 'Username already exists' });
        } else {
            const result = await sql.query`INSERT INTO USERS (Username, UserPassword) VALUES ('${username}', '${password}')`
            return result;
        }
    }
    catch(err) {
        console.error(err);
        res.status(500).send('database connection error');
        return res.status(500).send('Internal Server Error');
    }
    finally {
        closeDbCon();
    } 
});

module.exports = router;
