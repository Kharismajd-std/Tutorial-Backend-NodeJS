const Sequelize = require('sequelize');
const env = "development";
const config = require("./config.json")[env];

module.exports = new Sequelize(config.database, config.username, config.password, config);