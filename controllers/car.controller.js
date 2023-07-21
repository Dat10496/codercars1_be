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

  if (!info) throw new Error("field required");

  try {
    const created = await Car.create(info);
    res.status(200).send({ message: "Create Car Successfully!", car: created });
  } catch (err) {
    next(err);
  }
};

carController.getCars = async (req, res, next) => {
  try {
    const filter = { isDeleted: false };
    const { page = 1 } = req.query;
    const limit = 10;
    const offset = limit * (page - 1);

    const listOfCar = await Car.find(filter)
      .sort({
        createdAt: -1,
        updatedAt: -1,
      })
      .skip(offset)
      .limit(limit);

    const total = parseInt((await Car.countDocuments(filter)) / limit);

    res.status(200).send({
      cars: listOfCar,
      message: "Get Car List Successfully!",
      page,
      total,
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

  if (!Object.keys(updateInfo)) throw new Error("field is invalid");

  try {
    const updated = await Car.findByIdAndUpdate(
      targetId,
      { $set: updateInfo },
      options
    );
    res.status(200).send({ message: "Edit car successfully", car: updated });
  } catch (err) {
    next(err);
  }
};

carController.deleteCar = async (req, res, next) => {
  const { id } = req.params;
  const options = { new: true };

  try {
    const deletedCar = await Car.findByIdAndUpdate(
      id,
      {
        $set: { isDeleted: true },
      },
      options
    );

    res
      .status(200)
      .send({ cars: deletedCar, message: "Delete car successfully" });
  } catch (err) {
    next(err);
  }
};

module.exports = carController;
