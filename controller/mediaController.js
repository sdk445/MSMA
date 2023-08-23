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
    // log user activity
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
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(500).send(apiResponse);
  }
};

let getContent = async (req, res) => {
  try {
    contentType = req.query.contentType;
    let query = { contentType };
    let page = parseInt(req.query.page) || 1;
    let pageSize = 20;
    let totalCount = await Content.countDocuments(query);
    let totalPages = Math.ceil(totalCount / pageSize);

    let movies = await Content.find(query)
      .select(
        "_id title genre releaseYear director duration description contentType link watchCount poster cover_image"
      )
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    let responseData = {
      results: movies,
      pagination: {
        currentPage: page,
        totalPages,
        pageSize,
        totalCount,
      },
    };
    if (movies.length > 0) {
      let apiResponse = response.generate(false, "data fetched", responseData);
      return res.status(200).send(apiResponse);
    }
    let apiResponse = response.generate(false, "not found", null);
    res.status(404).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(500).send(apiResponse);
  }
};

let searchContent = async (req, res) => {
  try {
    let searchTerm = req.query.searchTerm;
    let searchBy = req.query.searchBy;
    let page = parseInt(req.query.page) || 1;
    let pageSize = 20;

    let query = {};

    query[searchBy] = { $regex: searchTerm, $options: "i" };

    let totalCount = await Content.countDocuments(query);
    let totalPages = Math.ceil(totalCount / pageSize);

    let movies = await Content.find(query)
      .select(
        "_id title genre releaseYear director duration description contentType link watchCount poster cover_image"
      )
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    let responseData = {
      results: movies,
      pagination: {
        currentPage: page,
        totalPages,
        pageSize,
        totalCount,
      },
    };

    if (movies.length > 0) {
      let apiResponse = response.generate(false, "data fetched", responseData);
      return res.status(200).send(apiResponse);
    }
    let apiResponse = response.generate(false, "not found", null);
    res.status(404).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(500).send(apiResponse);
  }
};
module.exports = {
  addMovie: addMovie,
  getContent: getContent,
  searchContent: searchContent,
};
