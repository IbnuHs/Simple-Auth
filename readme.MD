# Simple Auth API - Express MySQL

## 🚀 Tech Stack

- **Framework:** Express.js
- **Database:** MySQL
- **Token:** JSON Web Token (JWT)
- **Middleware:** cookie-parser, CORS, express-rate-limit, bcrypt
- **Link:** https://simple-auth-inky.vercel.app

---

## 🏗️ Arsitektur Aplikasi

1. **(`index.js`)**  
   Inisialisasi server, setup middleware utama (CORS, body parser, cookie parser), dan routing.

2. **(`query/user.query.js`)**  
   berisi query SQL.

3. **Middleware**
   - `authMiddleware`: Validasi token JWT dari cookie.
   - `limiter.middleware`: Limit request login.

4. **Utils**  
   Fungsi pembantu untuk validasi input dan auto-seeding user default saat startup.

---

## 🛠️ Cara Menjalankan Project

### 1. Clone Repository dan Masuk ke Folder Project

```bash
git clone https://github.com/IbnuHs/Simple-Auth.git
cd Simple-Auth
```

### 2. Install Dependenso

```bash
npm Install
```

### 3. Buat File env

```
ACCESS_TOKEN=your_jwt_secret_key
EMAIL=your_default_email@example.com
PASSWORD=your_default_password
```

### 5. Buat Database Baru

```
CREATE DATABASE tester;
USE tester;
```

### 6. Buat Table users

```
CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 7 Jalankan

```
npm run dev
```
