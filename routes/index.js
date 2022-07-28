var express = require("express");
var router = express.Router();
const Car = require("../models/Car");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.send("Welcome to Coderschool !");
});

const carRouter = require("./car.api");
router.use("/car", carRouter);

module.exports = router;
