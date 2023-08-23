/**
 * @author Chinmoy Das
 * @created 23/08/2023
 */

const User = require("../models/userModel");
let response = require("../libs/responseLib");
let Content = require("../models/movieModel");
const ActivityLog = require("../models/activityLogModel");

let addMovie = async (req, res) => {
  try {
    const newMovie = new Content(req.body);
    await newMovie.save();

    const log = new ActivityLog({
      userId: req.user.userId,
      action: "Add",
      resource: "Movie",
    });
    await log.save();

    let apiResponse = response.generate(
      false,
      "content added successfully",
      newMovie
    );
    res.status(201).send(apiResponse);
  } catch (error) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(500).send(apiResponse);
  }
};

let getContent = async (req, res) => {
  try {
    const newMovie = new Content(req.body);
    await newMovie.save();
    let apiResponse = response.generate(
      false,
      "content added successfully",
      newMovie
    );
    res.status(201).send(apiResponse);
  } catch (error) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(500).send(apiResponse);
  }
};

module.exports = {
  addMovie: addMovie,
  getContent: getContent,
};
