const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: "User",
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    assignedClasses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Class" }]
    
}, { timestamps: true });

module.exports = mongoose.model("Teacher", teacherSchema);
