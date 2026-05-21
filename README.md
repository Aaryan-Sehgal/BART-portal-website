# BARTNet

BARTNet is a full-stack BART transportation web application built using HTML, CSS, JavaScript, Node.js, Express, and PostgreSQL. The application provides users with real-time transportation-related features such as departures, alerts/advisories, account authentication, a personalized dashboard, favorite routes/stations, contact form submissions, and a BARTy chatbot with predefined prompts.

---

# Features

- User signup and login
- bcrypt password hashing
- Persistent login state using localStorage
- Restricted dashboard page
- Edit account email and password
- Save favorite BART routes
- Save favorite BART stations
- Contact form submissions saved to PostgreSQL
- Dynamic station dropdowns loaded from `stations.json`
- Shared navbar and consistent UI design
- BARTy chatbot with predefined prompts

---

# Technologies Used

## Frontend
- HTML
- CSS
- JavaScript

## Backend
- Node.js
- Express.js

## Database
- PostgreSQL

## Authentication
- bcrypt
- localStorage

---

# Installation & Setup

## 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

---

## 2. Install Dependencies

```bash
npm install
```

Required packages:

```bash
npm install express pg dotenv bcrypt
```

---

# Database Setup

You can either manually create the PostgreSQL tables or import the provided database dump files.

---

## Option 1: Create Database and Tables Manually

### Start PostgreSQL

```bash
sudo systemctl start postgresql
```

### Open PostgreSQL

```bash
sudo -u postgres psql
```

### Create Database and User

```sql
CREATE DATABASE webapp_db;

CREATE USER webapp WITH PASSWORD 'your_password';

GRANT ALL PRIVILEGES ON DATABASE webapp_db TO webapp;
```

### Connect to Database

```sql
\c webapp_db
```

### Create Tables

#### Users Table

```sql
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL
);
```

#### Contact Messages Table

```sql
CREATE TABLE contact_messages (
  message_id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  company VARCHAR(150),
  address1 VARCHAR(200) NOT NULL,
  address2 VARCHAR(200),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  zip VARCHAR(20) NOT NULL,
  country VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL,
  phone VARCHAR(30) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### Favorite Routes Table

```sql
CREATE TABLE favorite_routes (
  route_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  start_station VARCHAR(100) NOT NULL,
  end_station VARCHAR(100) NOT NULL
);
```

#### Favorite Stations Table

```sql
CREATE TABLE favorite_stations (
  station_id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(user_id) ON DELETE CASCADE,
  station_name VARCHAR(100) NOT NULL
);
```

---

## Option 2: Import Database Dump Files

The project includes:
- `dataDump.sql`
- `backup.tar`

### Import SQL Dump

```bash
psql -h localhost -U webapp -d webapp_db -f dataDump.sql
```

### Import Tar Backup

```bash
pg_restore -h localhost -U webapp -d webapp_db backup.tar
```

---

# Environment Variables

Create a `.env` file in the project root.

Example `.env.example`:

```env
PGHOST=localhost
PGUSER=webapp
PGPASSWORD=your_password_here
PGDATABASE=webapp_db
PGPORT=5432
DATABASE_URL=postgresql://webapp:your_encoded_password@localhost:5432/webapp_db
```

Example used during development:

```env
PGHOST=localhost
PGUSER=webapp
PGPASSWORD=BART@CSC317
PGDATABASE=webapp_db
PGPORT=5432
DATABASE_URL=postgresql://webapp:BART%40CSC317@localhost:5432/webapp_db
```

---

# Running the Application

Start the backend server:

```bash
node server.js
```

Open the website:

```text
http://localhost:3001
```

---

# Project Structure

```text
project/
├── db/
│   └── pool.js
│
├── routes/
│   ├── users.js
│   └── contact.js
│
├── public/
│   ├── css/
│   │   ├── contactstyles.css
│   │   ├── dashboard.css
│   │   ├── departures.css
│   │   ├── index.css
│   │   └── main.css
│   │
│   ├── data/
│   │   └── stations.json
│   │
│   ├── images/
│   │   ├── index
|   |   |     └──hero.webp
|   |   |     
│   │   ├── bart-map copy.png
│   │   ├── bart-map.png
│   │   ├── bart-train.png
│   │   ├── cutebarty.png
│   │   ├── default-profile.webp
│   │   ├── favicon.png
│   │   ├── ignited.png
│   │   ├── ladywaving.png
│   │   ├── profile.png
│   │   ├── site-icon.png
│   │   ├── spiderman.png
│   │   └── thankyou.png
│   │
│   ├── scripts/
│   │   ├── barty.js
│   │   └── departures.js
│   │
│   ├── about.html
│   ├── account.html
│   ├── barty.html
│   ├── contact.html
│   ├── dashboard.html
│   ├── departures.html
│   ├── index.html
│   ├── signup.html
│   └── thanks.html
│
├── backup.tar
├── dataDump.sql
├── server.js
├── test.json
├── .env
├── .gitignore
└── README.md
```

---

# System Architecture Summary

The application follows a full-stack web architecture consisting of a frontend, backend, and PostgreSQL database.

The frontend is built using HTML, CSS, and JavaScript and is stored inside the `public/` directory. Pages such as `index.html`, `account.html`, `signup.html`, `dashboard.html`, `departures.html`, and `contact.html` provide the user interface, while CSS files are stored in `public/css/` and images/assets are stored in `public/images/`. Additional frontend data, such as station information, is stored in `stations.json` and loaded dynamically into dropdown menus on the dashboard.

The backend is built using Node.js and Express. The main backend entry point is `server.js`, which initializes the Express application, serves static frontend files, handles JSON requests, and loads route modules. Backend functionality is separated into route files inside the `routes/` directory for organization and maintainability. The `users.js` route file handles authentication, account updates, and favorite routes/stations, while `contact.js` handles contact form submissions.

PostgreSQL is used as the database management system. Database connectivity is managed in `db/pool.js` using the `pg` library and environment variables stored in `.env`. The database contains relational tables including `users`, `contact_messages`, `favorite_routes`, and `favorite_stations`. User passwords are securely stored using bcrypt password hashing. The frontend communicates with the backend using JavaScript `fetch()` API calls, while the backend performs SQL queries and returns JSON responses. Login state is maintained on the frontend using `localStorage`, allowing restricted access to authenticated pages such as the dashboard.

---

# API Endpoint Documentation

## Authentication

### Signup

```http
POST /signup
```

### Login

```http
POST /login
```

---

## Account Management

### Update Email

```http
PUT /users/:id/email
```

### Update Password

```http
PUT /users/:id/password
```

---

## Favorite Routes

### Add Favorite Route

```http
POST /favorite-routes
```

### Get Favorite Routes

```http
GET /favorite-routes/:user_id
```

---

## Favorite Stations

### Add Favorite Station

```http
POST /favorite-stations
```

### Get Favorite Stations

```http
GET /favorite-stations/:user_id
```

---

## Contact Form

### Submit Contact Form

```http
POST /contact
```

---


# Known Limitations

- Login state is stored using localStorage instead of secure server-side sessions.
- Favorite routes and stations can currently be duplicated.
- No admin panel exists for viewing submitted contact messages.
- Form validation is primarily handled on the frontend.
- The BARTy chatbot uses predefined prompts rather than a live AI model.
- The application is intended for local development and has not been configured for production deployment.

---

# Database Backup

Create SQL dump:

```bash
pg_dump -h localhost -U webapp -W webapp_db > dataDump.sql
```

Create tar backup:

```bash
pg_dump -h localhost -U webapp -W -F t webapp_db > backup.tar
```

Restore SQL dump:

```bash
psql -h localhost -U webapp -d webapp_db -f dataDump.sql
```

Restore tar backup:

```bash
pg_restore -h localhost -U webapp -d webapp_db backup.tar
```