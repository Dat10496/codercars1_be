const Car = require("../models/Car");

const carController = {};

carController.createCar = async (req, res, next) => {
  const { make, model, transmission_type, size, style, release_date, price } =
    req.body;
  const info = {
    make,
    model,
    transmission_type,
    size,
    style,
    release_date,
    price,
  };
  try {
    const created = await Car.create(info);
    res.status(200).send({ message: "Create Car Successfully!", car: created });
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  try {
    const filter = {};

    let { page } = req.query;

    page = parseInt(page) || 1;
    const limit = 10;

    let offset = limit * (page - 1);

    const listOfCar = await Car.find({});
    let result = [];
    result = listOfCar;

    let total = listOfCar.length;
    result = result.slice(offset, offset + limit);

    res.status(200).send({
      cars: result,
      message: "Get Car List Successfully!",
      page: page,
      total: total,
    });
  } catch (error) {
    next(error);
  }
};

carController.editCar = async (req, res, next) => {
  const { id } = req.params;
  const { make, model, transmission_type, size, style, release_date, price } =
    req.body;
  const updateInfo = {
    make,
    model,
    transmission_type,
    size,
    style,
    release_date,
    price,
  };
  const targetId = id;
  const options = { new: true };

  try {
    const updated = await Car.findByIdAndUpdate(targetId, updateInfo, options);
    res.status(200).send({ message: "Edit car successfully", car: updated });
  } catch (err) {
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  const { id } = req.params;
  const targetId = id;
  const options = { new: true };
  try {
    const deleted = Car.findByIdAndDelete(targetId, options);

    res.status(200).send({ message: "Delete car successfully", car: [] });
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
