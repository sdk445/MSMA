const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
    email: String,
    otp: String
});

//export the model

module.exports = mongoose.model("otp", otpSchema);
