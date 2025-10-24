const Class = require("../models/Class");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const asyncHandler = require("express-async-handler");


// @desc Create a new class
// @route POST /api/v1/classes
// @access Admin / Teacher
exports.createClass = asyncHandler(async (req, res, next) => {
    const { className, section } = req.body;

    // check duplicate class (className + section)
    const existingClass = await Class.findOne({ className, section });
    if (existingClass) {
        return next(new Error("This class with the same section already exists!"));
    }

    // create empty class (teachers[], students[], subjects[])
    const newClass = await Class.create({
        className,
        section,
        teachers: [],
        students: [],
        subjects: []
    });

    res.status(201).json({
        status: "success",
        msg: "Class created successfully!",
        data: newClass,
    });
});


// @desc Get all classes
// @route GET /api/v1/classes
// @access Admin
exports.getClasses = asyncHandler(async (req, res, next) => {
    const classes = await Class.find()
        .populate({
            path: "teachers",
            populate: {
                path: "userId",
                select: "username email"
            }
        })
        .populate({
            path: "students",
            populate: {
                path: "userId",
                select: "username email"
            }
        }).sort({ createdAt: -1 });

    if (!classes || classes.length === 0) {
        return next(new Error("No classes found!"));
    }

    res.json({
        status: "success",
        msg: "All Classes fetched Successfully:",
        total: classes.length,
        data: classes,
    });
});


// @desc Get single class
// @route GET /api/v1/classes/:id
// @access Admin / Teacher
exports.getClass = asyncHandler(async (req, res, next) => {
    const clas = await Class.findById(req.params.id)
        .populate({
            path: "teachers",
            populate: { path: "userId", select: "username email" }
        })
        .populate("students", "roll userId");

    if (!clas) {
        return next(new Error("Class not found!"));
    }

    res.json({
        status: "success",
        data: clas,
    });
});


// @desc Update class
// @route PUT /api/v1/classes/:id
// @access Admin only
exports.updateClass = asyncHandler(async (req, res, next) => {
    const { className, section, subjects, teachers } = req.body;
    const clas = await Class.findById(req.params.id);

    if (!clas) {
        return next(new Error("Class not found!"));
    }

    // update
    if (className) clas.className = className;
    if (section) clas.section = section;

    const updatedClass = await clas.save();

    res.json({
        status: "success",
        msg: "Class updated successfully!",
        data: updatedClass,
    });
});


// @desc Delete class
// @route DELETE /api/v1/classes/:id
// @access Admin only
exports.deleteClass = asyncHandler(async (req, res, next) => {
    const clas = await Class.findById(req.params.id);
    if (!clas) {
        return next(new Error("Class not found!"));
    }

    // Students cleanup
    await Student.updateMany(
        { classId: clas._id },
        { $unset: { classId: "" } }
    );

    // Teachers cleanup
    await Teacher.updateMany(
        { assignedClasses: clas._id },
        { $pull: { assignedClasses: clas._id } }
    );

    // ab class delete karo
    await clas.deleteOne();

    res.json({
        status: "success",
        msg: "Class deleted successfully and references cleaned up!",
    });
});
