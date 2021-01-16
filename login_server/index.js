//DEFINE REQUIRE
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

//DEFINE COSTANT
const PORT = 3000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

app.use("/api", authRoute);
app.use("/api", userRoute);

app.get("/healtcheck", (req, res) => {
  res.send("OK");
});

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB!");
  }
);

app.listen(PORT, () => {
  console.log("Server listen on " + PORT);
});
