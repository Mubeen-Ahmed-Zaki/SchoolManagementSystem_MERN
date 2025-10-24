const asyncHandler = require("express-async-handler");

const isTeacher = asyncHandler(async (req, res, next) => {

    if (!req.user) {
        return next(new Error("Not authorized, no teacher found"));
    }

    if (req.user && req.user.role.toLowerCase() === "teacher") {
        next();
    } else {
        return next(new Error("Access denied. Admin only."));
    }
});

module.exports = isTeacher;
