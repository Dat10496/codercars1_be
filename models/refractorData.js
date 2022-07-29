const express = require("express");
const csv = require("csvtojson");
const fs = require("fs");
const Car = require("./Car");
const mongoose = require("mongoose");

const refractorData = async () => {
  let data = JSON.parse(fs.readFileSync("../db.json", "utf-8"));

  mongoose
    .connect(
      "mongodb+srv://datvo:admin123@cluster0.wna3a.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => console.log("Connected success!"))
    .catch((err) => console.log(err, "error connect"));

  let newData = await csv().fromFile("../data.csv");
  newData = Array.from(newData);

  newData = newData.map((car) => {
    return {
      make: car.Make,
      model: car.Model,
      price: parseInt(car.MSRP),
      release_date: parseInt(car.Year),
      size: car["Vehicle Size"],
      style: car["Vehicle Style"],
      transmission_type: car["Transmission Type"],
    };
  });

  data = newData;
  fs.writeFileSync("../db.json", JSON.stringify(data));
  // create document in dtb
  await Car.create(newData);
};

refractorData().catch((err) => console.log(err, "refract err"));
