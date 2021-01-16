const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

//Import Routes
const notesRoute = require("./routes/notes");

app.use("/notes", notesRoute);

//ROUTES
app.get("/", (req, res) => {
  res.send("It works");
});

//Connect to DB
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB!");
  }
);

app.listen(PORT);
