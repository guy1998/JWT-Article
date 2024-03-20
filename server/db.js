const mongoose = require("mongoose");
require("dotenv").config();

// Connection URI
const uri = process.env.CONN_STRING;

// Connect to the MongoDB server
const connect_db = (proceeding) => {
  mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to the database");
      proceeding();
    })
    .catch((error) => {
      console.error("Error connecting to the database:", error);
    });
};

module.exports = connect_db;
