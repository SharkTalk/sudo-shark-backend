const { Sequelize } = require("sequelize");
const postgres = require("postgres");

// var sequelize = new Sequelize();
// "postgres://localdev:localdev@localhost:5433/localhost_5433"

const sequelize = new Sequelize("postgres", "localdev", "localdev", {
  host: "localhost",
  port: process.env.DB_PORT,
  dialect: "postgres",
});

async function auth() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

module.exports = auth;
