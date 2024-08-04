import db from 'mysql2/promise';
import dotenv from 'dotenv';
dotenv.config();
const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
};
export { config, db };