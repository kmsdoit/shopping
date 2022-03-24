require("dotenv").config();
const mysql = require("mysql");

const connectionPool = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PW,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
});

// connectionPool.connect((err) => {
//   if (err) console.log(err);
//   else console.log("DB Connect Success");
// });

connectionPool.query("select * from user", (error, rows, field) => {
  if (error) throw error;
  //console.log("User Info is: ", rows);
});

// connectionPool.end();

module.exports = connectionPool;
