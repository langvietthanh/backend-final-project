const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  console.log(process.env.DB_URL)
  mongoose
    .connect(process.env.DB_URL)
    // .connect("mongodb+srv://LangThanh:Thanh%402005@cluster0.tlpfnqr.mongodb.net/?appName=Cluster0")
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
}

module.exports = dbConnect;
