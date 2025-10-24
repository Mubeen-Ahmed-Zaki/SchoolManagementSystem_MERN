const asyncHandler = require("express-async-handler");

const isAdmin = asyncHandler((req, res, next) => {

  if (!req.user) {
    return next(new Error("Not authorized, no admin found"));
  }

  if (req.user && req.user.role.toLowerCase() === "admin") {
    next();
  } else {
    return next(new Error("Access denied. Admin only."));
  }
});

module.exports = isAdmin;