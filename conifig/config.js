require("dotenv").config();
var serverConfig = {};
serverConfig.port = process.env.SERVER_PORT;

var dbConfig = {};
dbConfig.name = process.env.DATABASE_NAME;
dbConfig.port = process.env.DATABASE_PORT;
dbConfig.server = process.env.DATABASE_SERVER;
dbConfig.pass = process.env.MONGO_PASSWORD;
dbConfig.user = process.env.MONGO_USER;

serverConfig.db = dbConfig;

module.exports = serverConfig;
