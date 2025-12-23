const express = require("express");
const router = express.Router();
const { getAllStudents, getStudent, updateStudent, deleteStudent } = require("../controller/student-controller");
const { authMiddleware, adminOnly } = require("../middleware/auth");

router.get("/all", authMiddleware, adminOnly, getAllStudents);
router.get("/profile", authMiddleware, getStudent);
router.put("/update/:id", authMiddleware, adminOnly, updateStudent);
router.put("/profile", authMiddleware, updateStudent);
router.delete("/:id", authMiddleware, adminOnly, deleteStudent);

module.exports = router;