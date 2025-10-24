const Student = require("../models/Student");
const User = require("../models/User");
const Class = require("../models/Class");
const asyncHandler = require("express-async-handler");


// @desc Add new student
// @route POST /api/v1/students
// @access Private (Admin/Teacher only)
exports.addStudent = asyncHandler(async (req, res, next) => {
    let { userId, classId, guardian } = req.body;

    if (!userId) {
        return next(new Error("UserId is required"));
    }

    // check if user exists
    const user = await User.findById(userId);
    if (!user) {
        return next(new Error("User not found!"));
    }

    if (user.role !== "Student") {
        return next(new Error("This user is not a Student, cannot assign as student"));
    }

    // check if student already exists
    const studentExist = await Student.findOne({ userId });
    if (studentExist) {
        return next(new Error("This student already exists"));
    }

    // roll number generate
    const lastStudent = await Student.findOne().sort({ createdAt: -1 });
    let newRoll = 1;
    if (lastStudent?.roll) {
        newRoll = parseInt(lastStudent.roll, 10) + 1;
    }

    // if classId empty string
    if (!classId || classId.trim() === "") {
        classId = null;
    }

    // prepare student data
    const studentData = { userId, roll: newRoll, classId, guardian };
    let classDoc = null;

    if (classId) {
        classDoc = await Class.findById(classId);
        if (!classDoc) {
            return next(new Error("Class not found!"));
        }
        studentData.classId = classId;
    }

    // create student
    const student = await Student.create(studentData);

    // if class exists then add the student
    if (classDoc) {
        classDoc.students.push(student._id);
        await classDoc.save();
    }

    res.status(201).json({
        status: "success",
        message: `Student added successfully${classDoc ? " and assigned to class" : ""}`,
        data: student,
    });
});


// @desc Add existing student to a class (or move to another class)
// @route PUT /api/v1/students/assignedStudentToClass
// @access Admin / Teacher
exports.assignedStudentToClass = asyncHandler(async (req, res, next) => {
    const { studentId, classId } = req.body;

    if (!classId) {
        return next(new Error("classId is required"));
    }

    // student check
    const student = await Student.findById(studentId);
    if (!student) {
        return next(new Error("Student not found!"));
    }

    // class check
    const classDoc = await Class.findById(classId);
    if (!classDoc) {
        return next(new Error("Class not found!"));
    }

    // if student already exist in another calss then remove this
    if (student.classId) {
        await Class.findByIdAndUpdate(student.classId, {
            $pull: { students: student._id }
        });
    }

    // assign new calss to student
    student.classId = classId;
    await student.save();

    // push class studentsin an array (not make a copy then use $addToSet)
    await Class.findByIdAndUpdate(classId, {
        $addToSet: { students: student._id }
    });

    res.status(200).json({
        status: "success",
        message: "Student successfully added to class",
        data: student,
    });
});


// @desc Add existing student to a class (or move to another class)
// @route PUT /api/v1/students/removedStudentFromClass
// @access Admin / Teacher
exports.removedStudentFromClass = asyncHandler(async (req, res, next) => {
    const { studentId, classId } = req.body;

    // if empty this fields
    if (!studentId || !classId) {
        return next(new Error("Student ID and Class ID are required"));
    }

    // Find both documents
    const student = await Student.findById(studentId);
    const classData = await Class.findById(classId);

    if (!student) {
        return next(new Error("Student not found"));
    }
    if (!classData) {
        return next(new Error("Class not found"));
    }

    // Check if student actually belongs to this class
    if (student.classId?.toString() !== classId.toString()) {
        return next(new Error("This student is not assigned to the given class"));
    }

    // Remove student reference from class
    await Class.findByIdAndUpdate(classId, {
        $pull: { students: student._id },
    });

    // Remove classId reference from student
    student.classId = null;
    await student.save();

    // Respond success
    res.status(200).json({
        status: "success",
        message: "Student removed from class successfully",
        data: student,
    });
});


// @desc Get all students
// @route GET /api/v1/students
// @access Private (Admin/Teacher only)
exports.getAllStudents = asyncHandler(async (req, res, next) => {
    const students = await Student.find()
        .populate("userId", "username email role")
        .populate("classId", "className section");

    res.json({
        status: "success",
        total: students.length,
        data: students,
    });
});


// @desc Get student by ID
// @route GET /api/v1/students/:id
// @access Private (Admin/Teacher)
exports.getStudentById = asyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.params.id)
        .populate("userId", "username email role")
        .populate({
            path: "classId",
            select: "className section subjects teachers",
            populate: {
                path: "teachers",
                select: "subject userId",
                populate: { path: "userId", select: "username email" },
            },
        });

    if (!student) {
        return next(new Error("Student not found"));
    }

    res.json({
        status: "success",
        data: student,
    });
});


// @desc Get logged-in student's profile
// @route GET /api/v1/students/me
// @access Student only
exports.getMyProfile = asyncHandler(async (req, res, next) => {
    if (req.user.role !== "Student") {
        return next(new Error("Access denied! Only students can view their profile"));
    }

    const student = await Student.findOne({ userId: req.user._id })
        .populate("userId", "username email role")
        .populate({
            path: "classId",
            select: "className section subjects teachers",
            populate: {
                path: "teachers",
                select: "subject userId",
                populate: { path: "userId", select: "username email" },
            },
        });

    if (!student) {
        return next(new Error("Student profile not found"));
    }

    res.json({
        status: "success",
        data: student,
    });
});


// @desc Update student
// @route PUT /api/v1/students/:id
// @access Private (Admin/Teacher only)
exports.updateStudent = asyncHandler(async (req, res, next) => {
    const { classId, guardian } = req.body;

    const student = await Student.findById(req.params.id);
    if (!student) {
        return next(new Error("Student not found"));
    }

    // If class is being changed
    if (classId && classId.toString() !== student.classId.toString()) {
        const newClass = await Class.findById(classId);
        if (!newClass) {
            return next(new Error("New class not found!"));
        }

        // Remove from old class
        await Class.findByIdAndUpdate(student.classId, {
            $pull: { students: student._id },
        });

        // Add to new class
        newClass.students.push(student._id);
        await newClass.save();

        student.classId = classId;
    }

    if (guardian) student.guardian = guardian;

    await student.save();

    res.json({
        status: "success",
        message: "Student updated successfully",
        data: student,
    });
});

// @desc Delete student
// @route DELETE /api/v1/students/:id
// @access Private (Admin only)
exports.deleteStudent = asyncHandler(async (req, res, next) => {
    const student = await Student.findById(req.params.id);
    if (!student) {
        return next(new Error("Student not found"));
    }

    // Remove from class
    await Class.findByIdAndUpdate(student.classId, {
        $pull: { students: student._id },
    });

    await student.deleteOne();

    res.json({
        status: "success",
        message: "Student deleted successfully",
    });
});


// @desc student check their class to enrolled
// @route DELETE /api/v1/students/MyEnrolledClass
// @access Private (student)
exports.getMyEnrolledClass = asyncHandler(async (req, res, next) => {
    
    const student = await Student.findOne({ userId: req.user._id })
        .populate("userId", "username email role");
        // .lean();

    if (!student) {
        return res.status(404).json({
            status: "fail",
            message: "Student profile not found.",
        });
    }

    
    const classData = await Class.findOne({ students: student._id })
        .select("className section subjects teachers")
        .populate({
            path: "teachers",
            select: "userId subject",
            populate: {
                path: "userId",
                select: "username email",
            },
        })
        .lean();

    if (!classData) {
        return res.status(200).json({
            status: "success",
            message: "Student is not enrolled in any class yet.",
            data: {
                student: {
                    id: student._id,
                    name: student.userId.username,
                    email: student.userId.email,
                    rollNo: student.roll || "N/A",
                },
                enrolledClass: null,
            },
        });
    }

    
    res.status(200).json({
        status: "success",
        data: {
            student: {
                id: student._id,
                name: student.userId.username,
                email: student.userId.email,
                rollNo: student.roll || "N/A",
            },
            enrolledClass: {
                className: classData.className,
                section: classData.section,
                subjects: classData.subjects, // subjects assigned to this class
                teachers: classData.teachers.map((t) => ({
                    name: t.userId?.username || "Unknown Teacher",
                    email: t.userId?.email || "N/A",
                    subject: t.subject,
                })),
            },
        },
    });
});