import express, { json } from "express";
import pool from "./db/db.js";

const app = express();
app.use(json());
const port = 9000;
// app.use();

app.listen(port, () => {
  console.log(`Server Running on Port ${port}`);
});

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    res.status(200).json({
      code: 200,
      message: "Berhasil Register",
    });
  } catch (error) {}
});
