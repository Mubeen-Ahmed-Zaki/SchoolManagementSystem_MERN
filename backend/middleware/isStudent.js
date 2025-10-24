const asyncHandler = require("express-async-handler");

const isStudent = asyncHandler(async (req, res, next) => {

    if (!req.user) {
        return next(new Error("Not authorized, no student found"));
    }

    if (req.user && req.user.role.toLowerCase() === "student") {
        next();
    } else {
        return next(new Error("Access denied. Admin only."));
    }
});

module.exports = isStudent;
