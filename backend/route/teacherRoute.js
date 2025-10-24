const express = require("express");
const { createTeacher, getTeachers, getTeacher, updateTeacher, deleteTeacher, teacherProfile, assignTeacherToClass, removeTeacherFromClass, getMyClassesWithStudents } = require("../controller/teacherController");
const isLoggedIn = require("../middleware/isLoggedIn");
const isAdmin = require("../middleware/isAdmin");
const isAdminOrTeacher = require("../middleware/isAdminOrTeacher");
const isTeacher = require("../middleware/isTeacher");


const teacherRoute = express.Router();

teacherRoute.post("/createTeacher", isLoggedIn, isAdmin, createTeacher);
teacherRoute.post("/assignTeacherToClass", isLoggedIn, isAdmin, assignTeacherToClass);  // teacher updates himself
teacherRoute.put("/removeTeacherFromClass", isLoggedIn, isAdmin, removeTeacherFromClass);  // teacher updates himself
teacherRoute.get("/viewProfile", isLoggedIn, teacherProfile);
teacherRoute.get("/my-Classes", isLoggedIn, isTeacher, getMyClassesWithStudents);
teacherRoute.get("/getTeachers", isLoggedIn, isAdmin, getTeachers);
teacherRoute.get("/:id", isLoggedIn, isAdmin, getTeacher);
teacherRoute.put("/:id", isLoggedIn, isAdmin, updateTeacher);       // admin updates any teacher
teacherRoute.delete("/:id", isLoggedIn, isAdmin, deleteTeacher);

module.exports = teacherRoute;
