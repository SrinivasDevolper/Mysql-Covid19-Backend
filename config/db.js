const mySql = require("mysql2");
const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "Srinivas@123",
  database: "covidbackend",
});
connection.connect((err) => {
  if (err) {
    console.log("Db is not connected");
  }
  console.log("Database is Connected");
});

// const greeting = "Hello good morning";

module.exports = connection;
