const User = require("../models/usermodels");

const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: "Student" }).select("-password");
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const getStudent = async (req, res) => {
  try {
    const student = await User.findById(req.user._id).select("-password");
    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { student, email, course } = req.body;
    const updated = await User.findByIdAndUpdate(
      req.params.id || req.user._id,
      { student, email, course },
      { new: true }
    ).select("-password");
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Student deleted" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = { getAllStudents, getStudent, updateStudent, deleteStudent };