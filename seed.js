const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();

const userSchema = new mongoose.Schema({
  student: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Admin", "Student"], default: "Student" },
  enrollmentDate: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

async function seedAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || process.env.MONGO_URI);
    
    const adminExists = await User.findOne({ email: "admin@test.com" });
    if (adminExists) {
      console.log("Admin already exists");
      return;
    }

    const salt = 10;
    const hashedPassword = await bcrypt.hash("admin123", salt);
    
    await User.create({
      student: "Admin User",
      email: "admin@test.com",
      course: "Administration",
      password: hashedPassword,
      role: "Admin"
    });
    
    console.log("Admin user created: admin@test.com / admin123");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    mongoose.disconnect();
  }
}

seedAdmin();