// middleware/isAdminOrTeacher.js
const asyncHandler = require("express-async-handler");

const isAdminOrTeacher = asyncHandler(async (req, res, next) => {
  if (req.user && (req.user.role === "Admin" || req.user.role === "Teacher")) {
    next();
  } else {
    res.status(403).json({ message: "Access denied, only Admins or Teachers allowed!" });
  }
});

module.exports = isAdminOrTeacher;
