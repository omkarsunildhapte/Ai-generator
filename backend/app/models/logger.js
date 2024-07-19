const winston = require('winston');
const { MySQL } = require('winston-mysql');
const dbPool = require('../../db/config'); // Import your MySQL connection pool from db.js
require('dotenv').config();

const options = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  table: 'api_logs',
  pool: dbPool // Use the MySQL connection pool from db.js
};

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new MySQL(options)
  ],
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  )
});

module.exports = logger;
