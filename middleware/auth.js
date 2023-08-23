/**
 * @author Chinmoy Das
 * @created 23/08/2023
 */
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({ error: "Access denied" });
  }

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid token" });
  }
};

let adminRoute = (req, res, next) => {
  if (req.user) {
    console.log(req.user);
    if (req.user.role == "admin") {
      next();
    } else {
      return res.status(400).json({ error: "not allowed" });
    }
  }
  
}

module.exports = { verifyToken: verifyToken, adminRoute: adminRoute };
