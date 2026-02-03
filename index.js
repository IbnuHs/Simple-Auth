const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { createUser, getUserByUsername } = require("./query/user.query.js");
const loginLimiter = require("./middleware/limiter.middleware.js");
const cookieParser = require("cookie-parser");
const isValidEmail = require("./utils/checkEmailValid.js");
const authMiddleware = require("./middleware/authMiddleware.js");
const cors = require("cors");
const seedUser = require("./utils/seedUser.js");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://simple-login-protected-route.vercel.app",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);
app.use(cookieParser());
const port = 3100;

app.get("/", (req, res) => {
  return res.status(200).json({ message: "Hello World" });
});

app.post("/auth/register", async (req, res) => {
  try {
    const { email, password } = req.body;
    const valid = isValidEmail(email);
    if (!valid) {
      return res.status(400).json({ code: 400, message: "Invalid Email" });
    }

    const emailExist = await getUserByUsername(email);
    if (emailExist) {
      return res.status(409).json({
        code: 409,
        message: "Username Sudah Ada",
      });
    }
    const id = crypto.randomUUID();
    const salt = await bcrypt.genSalt();
    const hashpassword = await bcrypt.hash(password, salt);
    await createUser(id, email, hashpassword);
    res.status(200).json({
      code: 200,
      message: "Berhasil Register",
    });
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
});

app.post("/auth/login", loginLimiter, async (req, res) => {
  try {
    const { email, password } = req.body;
    const valid = isValidEmail(email);
    if (!valid) {
      return res.status(400).json({ code: 400, message: "Invalid Email" });
    }

    if (!email || !password) {
      return res.status(400).json({
        code: 400,
        message: "Email atau Password Tidak Boleh Kosong",
      });
    }
    const user = await getUserByUsername(email);
    if (!user) {
      return res.status(401).json({
        code: 401,
        message: "Username atau Password Salah",
      });
    }
    const matchPassword = await bcrypt.compare(password, user.password);
    if (!matchPassword) {
      return res.status(401).json({
        code: 401,
        message: "Email atau Password Salah",
      });
    }
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.ACCESS_TOKEN,
      {
        expiresIn: "1d",
      },
    );
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      maxAge: 36000,
    });
    return res.status(200).json({
      code: 200,
      message: "Berhasil Login",
    });
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
});
app.get("/auth/me", authMiddleware, async (req, res) => {
  try {
    return res.json({ user: req.user });
    // const
  } catch (error) {
    return res.status(500).json({
      code: 500,
      message: error.message,
    });
  }
});

app.post("/auth/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "none",
  });
  res.status(200).json({
    message: "Berhasil Logout",
  });
});

app.listen(port, async () => {
  console.log(`Server Running on Port ${port}`);
  await seedUser();
});
