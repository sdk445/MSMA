const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String
});


module.exports = mongoose.model("otp", otpSchema);
