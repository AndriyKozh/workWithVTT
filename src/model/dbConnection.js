const mysql = require("mysql");
require("dotenv").config();

const { HOST, USER, DATABASE, PASSWORD } = process.env;

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "watch_history_youtube",
  password: "Kozhevnykov1311",
});

exports.db = db;
