const mongoose = require("mongoose");
require('dotenv').config();

async function dbConnect() {
  mongoose.connect(process.env.DB_URL)
  .then( () => {
    console.log("Successfully connected to MongoDB Atlas!")
  })
  .catch((err) => {
    console.log("Unable connecting to MongoDB Atlas!")
    console.log(`Error is: ${err}`);
  })
}

module.exports = dbConnect;
