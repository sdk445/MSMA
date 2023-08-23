const mongoose = require("mongoose");

const activityLogSchema = new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  action: { type: String, required: true },
  resource: { type: String, required: true },
  // Additional fields like IP address, user agent, etc.
});

module.exports = mongoose.model("ActivityLog", activityLogSchema);
