/**
 * @author Chinmoy Das
 * @created 23/08/2023
 */

const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
let response = require("../libs/responseLib");
const jwt = require("jsonwebtoken");
const ActivityLog = require("../models/activityLogModel");

/**
 * function to register the user
 * @param {*} req
 * @param {*} res
 */
let register = async (req, res) => {
  try {
    console.log(req.body);
    let { email, password, name } = req.body;
    let get_date = await User.find({ email: email });
    if (get_date.length > 0) {
      let apiResponse = response.generate(false, "user already exists", null);
      res.status(409).send(apiResponse);
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        email,
        name,
        password: hashedPassword,
      });
      await newUser.save();
      let responsedata = {
        name: newUser.name,
        id: newUser._id,
      };
      let apiResponse = response.generate(false, "user created", responsedata);
      res.status(409).send(apiResponse);
    }
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(500).send(apiResponse);
  }
};
let login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    if (!user.allowed) {
      let apiResponse = response.generate(true, "Please Login again", null);
      return res.status(401).send(apiResponse);
    }

    // Check if the provided password matches the hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      let apiResponse = response.generate(true, "Invalid credentials", null);
      return res.status(401).send(apiResponse);
    }

    // Generate a JWT
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      "secretkey",
      { expiresIn: "1h" }
    );
    let responseData = {
      id: user._id,
      name: user.name,
      token: token,
    };
    let apiResponse = response.generate(false, "login succesful", responseData);
    res.status(200).send(apiResponse);
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(500).send(apiResponse);
  }
};

let getUserlog = async (req, res) => {
  try {
    let logs;

    if (req.query.userId) {
      // If userId is provided, search for logs for that userId
      logs = await ActivityLog.find({ userId: req.query.userId }).sort({
        timestamp: -1,
      });
    } else {
      // If userId is not provided, get all logs
      logs = await ActivityLog.find().sort({
        timestamp: -1,
      });
    }
    console.log(logs);

    if (logs.length > 0) {
      let apiResponse = response.generate(false, "Data found", logs);
      return res.status(200).send(apiResponse);
    } else {
      let apiResponse = response.generate(false, "Data not found", null);
      return res.status(404).send(apiResponse);
    }
  } catch (err) {
    let apiResponse = response.generate(true, err.message, null);
    res.status(500).send(apiResponse);
  }
};
module.exports = {
  register: register,
  login: login,
  getUserlog: getUserlog,
};
