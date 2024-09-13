const sql = require('mssql');
const sqlConfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    server: process.env.SERVER,
    options: {
        trustServerCertificate: true,
    },
};

const dbCon = async () => {
    try {
        let connection = await sql.connect(sqlConfig);
    } catch (err) {
        console.error(err);
    } 
}

const closeDbCon = async () => {
    try {
        await sql.close(connection) 
    }
    catch(err) {
        console.error(err);
    }
}

module.exports = {dbCon, closeDbCon};