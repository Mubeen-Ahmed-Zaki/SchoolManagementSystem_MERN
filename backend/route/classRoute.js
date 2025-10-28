const express = require("express");
const { createClass, getClasses, getClass, updateClass, deleteClass } = require("../controller/classController");
const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isAdmin");
const isAdminOrTeacher = require("../middleware/isAdminOrTeacher");

const classRoute = express.Router();

classRoute.post("/createClass", isLoggedIn, isAdmin, createClass);
classRoute.get("/getAllClasses", isLoggedIn, isAdmin, getClasses);
classRoute.get("/:id", isLoggedIn, isAdmin, getClass);
classRoute.put("/:id", updateClass);
classRoute.delete("/:id", deleteClass);

module.exports = classRoute;
