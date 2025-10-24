const express = require("express");
const studentRoute = express.Router();
const { addStudent, getAllStudents, getStudentById, updateStudent, deleteStudent, getMyProfile, assignedStudentToClass, removedStudentFromClass, getMyEnrolledClass } = require("../controller/studentController");
const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isAdmin");
const isStudent = require("../middleware/isStudent");
const isAdminOrTeacher = require("../middleware/isAdminOrTeacher");

// All routes protected
studentRoute.post("/createStudent", isLoggedIn, isAdminOrTeacher, addStudent);
studentRoute.get("/", isLoggedIn, isAdminOrTeacher, getAllStudents);
studentRoute.put("/assignedStudentToClass", isLoggedIn, isAdminOrTeacher, assignedStudentToClass);
studentRoute.put("/removedStudentFromClass", isLoggedIn, isAdminOrTeacher, removedStudentFromClass);

// Student apni profile dekhne ke liye
studentRoute.get("/me", isLoggedIn, getMyProfile);
studentRoute.get("/My-Enrolled-Class", isLoggedIn, isStudent, getMyEnrolledClass);

// Admin/Teacher kisi bhi student ki profile dekhne ke liye
studentRoute.get("/:id", isLoggedIn, isAdminOrTeacher, getStudentById);

studentRoute.put("/:id", isLoggedIn, isAdminOrTeacher, updateStudent);
studentRoute.delete("/:id", isLoggedIn, isAdmin, deleteStudent);

module.exports = studentRoute;