require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const dbConnect = require("./db/dbConnect");
const router = require("./routes");

dbConnect();

app.use(cors({ origin: true, credentials: true}));
app.use(morgan("dev")); // Ghi log mọi request gửi đến server

app.use(express.json());

router(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})
