const pool = require("../db/db");

async function createUser(id, email, password) {
  return await pool.query(
    "INSERT INTO users (id, email, password) VALUES(?, ?, ?)",
    [id, email, password],
  );
}

async function getUserByUsername(email) {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
    email,
  ]);
  return rows[0];
}
async function getAlluser() {
  const [rows] = await pool.query("SELECT * FROM users");
  return rows[0];
}

async function getUserById(id) {
  const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
  return rows[0];
}

module.exports = { createUser, getUserByUsername, getUserById, getAlluser };
