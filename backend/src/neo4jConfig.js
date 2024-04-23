const neo4j = require('neo4j-driver');
require('dotenv').config();

const uri = process.env.DB_URI
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD

console.log(uri)

const driver = neo4j.driver(uri, neo4j.auth.basic(username, password));


module.exports = driver;