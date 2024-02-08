const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const mysql = require("mysql2/promise");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.js")[env];

const db = {};

let sequelize;

const checkDatabaseCreation = async () => {
  let connection;
  try {
    const { host, port, username: user, password, database } = config;
    connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${database};`);
    console.log("MYSQL Database has been created / updated : ", database);
  } catch (error) {
    console.error("Error while creating database: ", error.message);
  } finally {
    if (connection) await connection.close();
  }
};

sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.checkDatabaseCreation = checkDatabaseCreation;

module.exports = { db };
