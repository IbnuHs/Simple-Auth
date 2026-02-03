const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: "localhost",
  user: process.env.USER_DB || "root",
  password: process.env.PASSWORD_DB || "",
  database: "tester",
  waitForConnections: true,
});

module.exports = pool;
