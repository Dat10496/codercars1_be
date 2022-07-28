var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");

require("dotenv").config();

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const mongoose = require("mongoose");
const mongoUri = process.env.MONGO_URI;

mongoose
  .connect(mongoUri)
  .then(() => console.log("Connected success!"))
  .catch((err) => console.log(err, "ERROR"));

app.use("/", indexRouter);

app.use((req, res, next) => {
  const err = new Error("404 server not found");
  next(err);
});

app.use((err, res, req, next) => {
  console.log("ERROR", err);
  err.statusCode = 404;
  res.status(err.statusCode).send(err.message);
});

module.exports = app;
