const express = require("express");
const {signup, login, updateRole, viewProfile, updateProfile, adminUpdateUser, adminDeleteUser, getAllUsers} = require('../controller/userController')
const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isAdmin");

const userRoute = express.Router();

userRoute.post("/signup", signup);
userRoute.post("/login", login);
userRoute.put("/rolechange", isLoggedIn, isAdmin, updateRole);
userRoute.get("/viewProfile", isLoggedIn, viewProfile);
userRoute.put("/updateProfile", isLoggedIn, updateProfile);
userRoute.get("/admin/viewAllUsers", isLoggedIn, isAdmin, getAllUsers);
userRoute.put("/admin/update/:id", isLoggedIn, isAdmin, adminUpdateUser);
userRoute.delete("/admin/delete/:id", isLoggedIn, isAdmin, adminDeleteUser);

module.exports = userRoute;
