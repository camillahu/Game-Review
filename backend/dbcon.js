const sql = require("mssql");
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
    return await sql.connect(sqlConfig);
  } catch (err) {
    console.error(err);
    throw err;
  }
};

const closeDbCon = async () => {
  try {
    if (sql.pool && sql.pool.connected) {
      await sql.pool.close();
    } else {
      await sql.close();
    }
  } catch (err) {
    console.error("Error closing database connection:", err);
  }
};

module.exports = { dbCon, closeDbCon };
