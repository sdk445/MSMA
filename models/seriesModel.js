const mongoose = require("mongoose")

const seriesModel = new mongoose.Schema(
  {
    title: { type: String, required: true },
    genre: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    director: { type: String, required: true },
    duration: { type: Number, required: true },
    description: { type: String, required: true },
    contentType: { type: String, enum: ["movie", "series"], required: true },
    seasons: [{ seasonNumber: Number, episodes: {} }],
    watchCount: { type: Number, default: 0 },
    poster: String,
    cover_image: String,
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model("series", seriesModel)
