const express = require("express");
const csv = require("csvtojson");
const fs = require("fs");
const Car = require("./Car");

const refractorData = async () => {
  let data = JSON.parse(fs.readFileSync("../db.json", "utf-8"));
  //   console.log(data);

  //   let newData = await csv().fromFile("../data.csv");
  //   newData = Array.from(newData);
  //   newData = newData.slice(0, 10);

  //   newData = newData.map((car) => {
  //     return {
  //       make: car.Make,
  //       model: car.Model,
  //       price: parseInt(car.MSRP),
  //       release_date: parseInt(car.Year),
  //       size: car["Vehicle Size"],
  //       style: car["Vehicle Style"],
  //       transmission_type: car["Transmission Type"],
  //     };
  //   });
  //   //   console.log(newData);
  //   data = newData;
  //   fs.writeFileSync("../db.json", JSON.stringify(data));
  await Car.create(data);
};

refractorData().catch((err) => console.log(err, "refract err"));
