const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  timestamp: { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true },
  resource: { type: String, required: true },
});

module.exports = mongoose.model("ActivityLog", activityLogSchema);
