const Pool = require('pg').Pool

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'cafe-api',
  password: 'password',
  port: 5432,
})