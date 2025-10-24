const Teacher = require("../models/Teacher");
const User = require("../models/User");
const Class = require("../models/Class");
const asyncHandler = require("express-async-handler");

// @desc Create Teacher
// @route POST /api/v1/teachers
// @access Admin only
exports.createTeacher = asyncHandler(async (req, res, next) => {
    const { userId, subject } = req.body;

    if (!userId || !subject) {
        return next(new Error("UserId and Subject are required"));
    }

    // Check if teacher already exists
    const teacherExists = await Teacher.findOne({ userId });
    if (teacherExists) {
        return next(new Error("Teacher already exists for this user"));
    }

    // create teacher
    const teacher = await Teacher.create({
        userId,
        subject,
    });

    res.status(201).json({
        status: "success",
        message: "Teacher created successfully",
        teacher,
    });
});


// @ desc Assigned teacher to class
// @route POST /api/v1/teachers/assignTeacherToClass
// @access Admin only
exports.assignTeacherToClass = asyncHandler(async (req, res, next) => {
    const { teacherId, classId } = req.body;

    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
        return next(new Error("Teacher not found"));
    }

    const classDoc = await Class.findById(classId);
    if (!classDoc) {
        return next(new Error("Class not found"));
    }

    // check this subject is already assigned to any teacher in same class
    if (classDoc.subjects.includes(teacher.subject)) {
        return next(new Error(`Subject "${teacher.subject}" is already assigned to another teacher in this class`));
    }

    // if teacher is not assigned in this class then add
    if (!teacher.assignedClasses.includes(classId)) {
        teacher.assignedClasses.push(classId);
        await teacher.save();
    }

    // add teacher to class teacher list
    if (!classDoc.teachers.includes(teacher._id)) {
        classDoc.teachers.push(teacher._id);
    }

    // add subjects to class subjects list
    classDoc.subjects.push(teacher.subject);

    await classDoc.save();

    res.status(200).json({
        status: "success",
        message: "Teacher assigned to class successfully",
        teacher,
        class: classDoc
    });
});


// @desc Remove Teacher from a Class
// @route POST /api/v1/teachers/removeTeacherFromClass
// @access Admin only
exports.removeTeacherFromClass = asyncHandler(async (req, res, next) => {
    const { classId, teacherId } = req.body;

    const classDoc = await Class.findById(classId);
    if (!classDoc) {
        return next(new Error("Class not found"));
    }

    const teacher = await Teacher.findById(teacherId).populate("userId", "username email");
    if (!teacher) {
        return next(new Error("Teacher not found"));
    }

    // remove Class teachers from array
    classDoc.teachers = classDoc.teachers.filter(
        (tId) => tId.toString() !== teacher._id.toString()
    );

    // remove Teacher from assignedClasses
    teacher.assignedClasses = teacher.assignedClasses.filter(
        (cId) => cId.toString() !== classDoc._id.toString()
    );

    const stillTeaching = await Teacher.find({
        _id: { $in: classDoc.teachers },
        subject: teacher.subject,
    });

    if (stillTeaching.length === 0) {
        // remove in class of subjects array
        classDoc.subjects = classDoc.subjects.filter(
            (subj) => subj !== teacher.subject
        );
    }

    // 6. Save both
    await classDoc.save();
    await teacher.save();

    res.status(200).json({
        status: "success",
        message: `Teacher '${teacher.userId?.username}' removed from class '${classDoc.className}' successfully.`,
        class: classDoc,
        teacher,
    });
});



// @desc View Teacher Profile
// @route POST /api/v1/teachers/viewProfile
// @access private
exports.teacherProfile = asyncHandler(async (req, res, next) => {
    const teacher = await Teacher.findOne({ userId: req?.user?._id })
        .populate("userId", "username email role -_id")
        .populate("assignedClasses", "className section subjects students");

    if (!teacher) {
        return next(new Error("Teacher profile not found"));
    }

    res.status(200).json({
        status: "success",
        data: teacher,
    });
});


// @desc Get all Teachers
// @route GET /api/v1/teachers
// @access Admin
exports.getTeachers = asyncHandler(async (req, res, next) => {
    const teachers = await Teacher.find()
        .populate("userId", "username email role")
        .populate("assignedClasses", "className section subjects");

    res.status(200).json({
        status: "success",
        results: teachers.length,
        teachers,
    });
});

// @desc Get single Teacher
// @route GET /api/v1/teachers/:id
// @access Admin
exports.getTeacher = asyncHandler(async (req, res, next) => {
    const teacher = await Teacher.findById(req.params.id)
        .populate("userId", "username email role")
        .populate("assignedClasses", "className section subjects");

    if (!teacher) {
        return next(new Error("Teacher not found"));
    }

    res.status(200).json({
        status: "success",
        teacher,
    });
});

// @desc Update Teacher
// @route PUT /api/v1/teachers/:id
// @access Admin/Teacher
exports.updateTeacher = asyncHandler(async (req, res, next) => {
    let teacher;

    // Teacher update his profile
    // if (req.user.role === "Teacher") {
    //     teacher = await Teacher.findOne({ userId: req.user._id });
    //     if (!teacher) {
    //         return next(new Error("Teacher profile not found"));
    //     }

    //     if (req.body.subject) {
    //         teacher.subject = req.body.subject;
    //     } else {
    //         return next(new Error("Teachers can only update their subject"));
    //     }
    // }

    // Admin update any teacher
    if (req.user.role === "Admin") {
        const { id } = req.params;
        teacher = await Teacher.findById(id);
        if (!teacher) {
            return next(new Error("Teacher not found"));
        }

        if (req.body.subject) teacher.subject = req.body.subject;
        if (req.body.assignedClasses) teacher.assignedClasses = req.body.assignedClasses;
    }

    else {
        return res.status(403).json({ msg: "Access denied" });
    }

    await teacher.save();

    // ---- Class ke saath sync (update case) ----
    if (req.body.assignedClasses) {
        await Promise.all(
            req.body.assignedClasses.map(async (classId) => {
                const classDoc = await Class.findById(classId);
                if (classDoc) {
                    if (!classDoc.teachers.includes(teacher._id)) {
                        classDoc.teachers.push(teacher._id);
                    }

                    if (!classDoc.subjects.includes(teacher.subject)) {
                        classDoc.subjects.push(teacher.subject);
                    }

                    await classDoc.save();
                }
            })
        );
    }

    const populatedTeacher = await Teacher.findById(teacher._id)
        .populate("userId", "username email -_id")
        .populate("assignedClasses", "className section subjects -_id");

    res.json({
        status: "success",
        msg: "Teacher updated successfully",
        teacher: populatedTeacher,
    });
});

// @desc Delete Teacher
// @route DELETE /api/v1/teachers/:id
// @access Admin only
exports.deleteTeacher = asyncHandler(async (req, res, next) => {
    const teacher = await Teacher.findById(req.params.id);
    if (!teacher) {
        return next(new Error("Teacher not found"));
    }

    // ---- Class ke saath sync (remove teacher + subject) ----
    await Promise.all(
        teacher.assignedClasses.map(async (classId) => {
            const classDoc = await Class.findById(classId);
            if (classDoc) {
                // remove teacher from teachers array
                classDoc.teachers = classDoc.teachers.filter(
                    (tId) => tId.toString() !== teacher._id.toString()
                );

                // check if any teacher teach same subject
                const otherTeachers = await Teacher.find({
                    _id: { $in: classDoc.teachers },
                    subject: teacher.subject,
                });

                // check if any teacher of same subject was not found then remove
                if (otherTeachers.length === 0) {
                    classDoc.subjects = classDoc.subjects.filter(
                        (subj) => subj !== teacher.subject
                    );
                }

                await classDoc.save();
            }
        })
    );

    // ab teacher ko hatao
    await teacher.deleteOne();

    res.status(200).json({
        status: "success",
        message: "Teacher deleted successfully",
    });
});


// @desc Get logged-in teacher’s classes with students
// @route GET /api/v1/teachers/myClasses
// @access Private (Teacher only)
exports.getMyClassesWithStudents = asyncHandler(async (req, res, next) => {
    
    const teacher = await Teacher.findOne({ userId: req.user._id })
        .populate("userId", "username email role");
        // .lean(); // faster than doc with methods

    if (!teacher) {
        return res.status(404).json({
            status: "fail",
            message: "Teacher profile not found.",
        });
    }

    if (!teacher.assignedClasses || teacher.assignedClasses.length === 0) {
        return res.status(200).json({
            status: "success",
            message: "No classes assigned to this teacher yet.",
            data: {
                teacher: {
                    name: teacher.userId.username,
                    email: teacher.userId.email,
                    subject: teacher.subject,
                },
                classes: [],
            },
        });
    }

    const classes = await Class.find({ _id: { $in: teacher.assignedClasses } })
        .select("className section students")
        .populate({
            path: "students",
            select: "roll userId",
            populate: {
                path: "userId",
                select: "username email", 
            },
        })
        .lean();

    res.status(200).json({
        status: "success",
        message: "Teacher classes and students fetched successfully.",
        data: {
            teacher: {
                id: teacher._id,
                username: teacher.userId.username,
                email: teacher.userId.email,
                role: teacher.userId.role,
                subject: teacher.subject,
            },
            classes,
        },
    });
});