const jwt = require("jsonwebtoken");
const User = require("../models/usermodels");

const authMiddleware = async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ msg: "No token provided" });
  }

  try {
    const jwtToken = token.replace("Bearer ", "");
    const decoded = jwt.verify(jwtToken, process.env.JWT);
    const userData = await User.findById(decoded.userId).select("-password");
    req.user = userData;
    next();
  } catch (error) {
    return res.status(401).json({ msg: "Invalid token" });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user.role !== "Admin") {
    return res.status(403).json({ msg: "Admin access required" });
  }
  next();
};

module.exports = { authMiddleware, adminOnly };