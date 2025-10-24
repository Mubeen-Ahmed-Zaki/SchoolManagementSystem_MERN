const bcrypt = require("bcryptjs");
const User = require("./models/User"); // apne user model ka path

async function createDefaultAdmin() {
  try {
    const adminExists = await User.findOne({ role: "Admin" });
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash("admin123", 10);
      const admin = new User({
        username: "Admin",
        email: "admin@school.com",
        password: hashedPassword,
        role: "Admin"
      });
      await admin.save();
      console.log("✅ Default Admin Created: email=admin@school.com, password=admin123");
    } else {
      console.log("ℹ️ Admin already exists, skipping seed.");
    }
  } catch (err) {
    console.error("❌ Error creating default admin:", err);
  }
}

module.exports = createDefaultAdmin;
