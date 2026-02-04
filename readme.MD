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

## 🔍 Explain

1. **Login**

Saat user melakukan login, backend akan memverifikasi email dan password.  
Password divalidasi menggunakan **bcrypt**, kemudian jika berhasil, backend akan membuat **JWT token** dan secara otomatis menyimpannya ke dalam **HttpOnly Cookie** di sisi client.

Cookie ini digunakan untuk autentikasi pada setiap request berikutnya tanpa perlu menyimpan token di localStorage.

---

2. **Limit Hit Endpoint**

Endpoint login dibatasi maksimal **5 request dalam 1 menit** menggunakan library **express-rate-limit**.

Jika jumlah request melebihi batas yang ditentukan, server akan langsung mengembalikan error untuk mencegah brute force attack.

---

3. **Logout**

Saat client melakukan request logout, backend akan menghapus JWT yang tersimpan di cookie dengan cara meng-clear cookie tersebut, sehingga session user langsung berakhir.

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
