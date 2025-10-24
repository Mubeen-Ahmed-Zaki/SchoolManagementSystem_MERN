const jwt = require("jsonwebtoken");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");


const isLoggedIn = asyncHandler((req, res, next) => {
  //  fetch token from request
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return next(new Error("No token provided!"));
  }

  // verify the token
  jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
    if (err) {
      // iff unsuccessfull, then send the error message
      let error = new Error(err?.message);
      next(error);
    }
    else {
      // if, successfull then pass the user object to next object
      const userId = decoded?.user?.id;
      const user = await User.findById(userId).select("username email role _id");
      if (!user) {
        return res.status(401).json({ msg: "User not found" });
      }
      req.user = user;
      next();
    }
  })
});

module.exports = isLoggedIn;