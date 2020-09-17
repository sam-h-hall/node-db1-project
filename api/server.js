const express = require("express");
// const db = require("../data/dbConfig.js");
const accounts = require("../accounts/accounts-router.js");
const categories = require("../pg/categories.js");
const customers = require("../pg/customers.js");

const server = express();

server.use(express.json());
server.use("/api/accounts", accounts);
server.use("/api/categories", categories);
server.use("/api/customers", customers);

module.exports = server;