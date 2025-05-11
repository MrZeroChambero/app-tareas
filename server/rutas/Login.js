const express = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tareas",
});
