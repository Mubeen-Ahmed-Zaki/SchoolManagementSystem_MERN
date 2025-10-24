const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, ref: "User", 
        required: true 
    },
    roll: { 
        type: String, 
        required: true, 
        unique: true 
    },
    classId: { 
        type: mongoose.Schema.Types.ObjectId, ref: "Class", 
        required: false
    },
    guardian: {
        name: String,
        contact: String,
        relation: String
    }
    
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);
