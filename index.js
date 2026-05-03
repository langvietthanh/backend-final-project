const express = require("express");
const app = express();
const cors = require("cors");
const dbConnect = require("./db/dbConnect");
const router = require("./routes");

dbConnect();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use("/images", express.static("images"));

router(app);

app.listen(8081, () => {
  console.log("server listening on port 8081");
});
