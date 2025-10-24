const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    className: {
        type: String,
        required: true,
    },
    section: {
        type: String,
        required: true,
    },
    // subjects ke sath teacher jura hoga
    subjects: [
        { type: String }
    ],
    // students ka array (Student model se link hoga)
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student", // ya "Student" agar alag Student model hai
        }
    ],
    // teachers ka array (Teacher model se link hoga)
    teachers: [
        {
            type: mongoose.Schema.Types.ObjectId,ref: "Teacher", // ya "Teacher" agar alag Teacher model hai
        }
    ]
}, { timestamps: true });

module.exports = mongoose.model("Class", classSchema);