require("dotenv").config();
const { Pool } = require("pg");

// Use connectionString if available (standard for cloud services like Neon/Render)
// Otherwise, fall back to individual environment variables for local development
module.exports = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }, // Required by most cloud PostgreSQL hosts like Neon
      }
    : {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
      },
);
