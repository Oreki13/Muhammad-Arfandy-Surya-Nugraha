require("dotenv/config");
const mysql = require("mysql");

const dbConfig = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE
});

dbConfig.connect(error => {
  if (error) throw error;
});

module.exports = dbConfig;

// DB_HOST = 'localhost'
// DB_USER = 'root'
// DB_PASSWORD = ''
// DB_DATABASE = 'store_v2'
// PORT = 8080
// NODE_ENV = 'Devploment'
// SECRET_KEY = "skuy"
// REQUEST_HEADERS= 'soul'

// DB_HOST = 'remotemysql.com'
// DB_USER = 'uCVrrTvHJf'
// DB_PASSWORD = 'OS6klfusg4'
// DB_DATABASE = 'uCVrrTvHJf'
// PORT = 8080
// NODE_ENV = 'Devploment'
// SECRET_KEY = "skuy"
// REQUEST_HEADERS= 'soul'

// Username: B3oeWzP7kt

// Database name: B3oeWzP7kt

// Password: foovKL1p32

// Server: remotemysql.com

// Port: 3306
