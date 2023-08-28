/**
 * @author Chinmoy Das
 * @created 23/08/2023
 */

const User = require("../models/userModel")
let response = require("../libs/responseLib")
let Content = require("../models/movieModel")
let Series = require("../models/seriesModel")
const ActivityLog = require("../models/activityLogModel")
const mongoose = require("mongoose")

let addMovie = async (req, res) => {
  try {
    const newMovie = new Content(req.body)
    await newMovie.save()
    // log user activity
    const log = new ActivityLog({
      userId: req.user.userId,
      action: "Add",
      resource: "Movie",
    })
    await log.save()

    let apiResponse = response.generate(
      false,
      "content added successfully",
      newMovie
    )
    res.status(201).send(apiResponse)
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null)
    res.status(500).send(apiResponse)
  }
}

let getContent = async (req, res) => {
  try {
    contentType = req.query.contentType
    let page = parseInt(req.query.page) || 1
    let pageSize = 20
    let resData = await fetchCombinedSortedData(page, pageSize)
    console.log(resData.data)
    if (resData.data.length > 0) {
      let apiResponse = response.generate(false, "data fetched", resData)
      return res.status(200).send(apiResponse)
    }
    let apiResponse = response.generate(false, "not found", null)
    res.status(404).send(apiResponse)
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null)
    res.status(500).send(apiResponse)
  }
}

let searchContent = async (req, res) => {
  try {
    let searchTerm = req.query.searchTerm
    let searchBy = req.query.searchBy
    let page = parseInt(req.query.page) || 1
    let pageSize = 20

    let query = {}

    query[searchBy] = { $regex: searchTerm, $options: "i" }

    let totalCount = await Content.countDocuments(query)
    let totalPages = Math.ceil(totalCount / pageSize)

    let movies = await Content.find(query)
      .select(
        "_id title genre releaseYear director duration description contentType link watchCount poster cover_image"
      )
      .skip((page - 1) * pageSize)
      .limit(pageSize)

    let responseData = {
      results: movies,
      pagination: {
        currentPage: page,
        totalPages,
        pageSize,
        totalCount,
      },
    }

    if (movies.length > 0) {
      let apiResponse = response.generate(false, "data fetched", responseData)
      return res.status(200).send(apiResponse)
    }
    let apiResponse = response.generate(false, "not found", null)
    res.status(404).send(apiResponse)
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null)
    res.status(500).send(apiResponse)
  }
}

let addseries = async (req, res) => {
  try {
    const newSeries = new Series(req.body)
    await newSeries.save()
    // log user activity
    const log = new ActivityLog({
      userId: req.user.userId,
      action: "Add",
      resource: "Series",
    })
    await log.save()

    let apiResponse = response.generate(
      false,
      "content added successfully",
      newSeries
    )
    res.status(201).send(apiResponse)
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null)
    res.status(500).send(apiResponse)
  }
}

let fetchCombinedSortedData = async (page, pageSize) => {
  const skip = (page - 1) * pageSize

  const totalCount = (
    await Promise.all([Content.countDocuments(), Series.countDocuments()])
  ).reduce((total, count) => total + count, 0)

  const totalPages = Math.ceil(totalCount / pageSize)

  const combinedData = (
    await Promise.all([
      Content.aggregate([
        { $sort: { watchCount: -1 } },
        { $skip: skip },
        { $limit: pageSize },
      ]),
      Series.aggregate([
        { $sort: { watchCount: -1 } },
        { $skip: skip },
        { $limit: pageSize },
      ]),
    ])
  )
    .flat()
    .sort((a, b) => b.watchCount - a.watchCount)

  return {
    data: combinedData,
    currentPage: page,
    totalPages,
  }
}

let getSeries = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1
    let pageSize = 20
    const skip = (page - 1) * pageSize
    let data = await Series.aggregate([
      { $sort: { watchCount: -1 } },
      { $skip: skip },
      { $limit: pageSize },
    ])
    if (data.length > 0) {
      let apiResponse = response.generate(false, "data fetched", data)
      return res.status(200).send(apiResponse)
    }
    let apiResponse = response.generate(false, "not found", null)
    res.status(404).send(apiResponse)
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null)
    res.status(500).send(apiResponse)
  }
}
let addnewSeason = async (req, res) => {
  try {
    const seriesId = mongoose.Types.ObjectId.createFromHexString(req.body.id) // Replace with your series ID
    const newSeason = req.body.season
    console.log(newSeason)

    const updatedSeries = await Series.aggregate([
      { $match: { _id: seriesId } },
      {
        $set: {
          seasons: {
            $concatArrays: ["$seasons", [newSeason]],
          },
        },
      },
    ])

    if (updatedSeries) {
      let apiResponse = response.generate(
        false,
        "series updated",
        updatedSeries
      )
      return res.status(200).send(apiResponse)
    } else {
      let apiResponse = response.generate(false, "not found", null)
      res.status(404).send(apiResponse)
    }
  } catch (err) {
    console.error(err)
    let apiResponse = response.generate(true, err.message, null)
    res.status(500).send(apiResponse)
  }
}

let updateSeries = async (req, res) => {
  try {
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null)
    res.status(500).send(apiResponse)
  }
}
let deleteSeries = async (req, res) => {
  try {
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null)
    res.status(500).send(apiResponse)
  }
}
module.exports = {
  addMovie: addMovie,
  getContent: getContent,
  searchContent: searchContent,
  addseries: addseries,
  updateSeries: updateSeries,
  getSeries: getSeries,
  addnewSeason: addnewSeason,
  deleteSeries: deleteSeries,
}
