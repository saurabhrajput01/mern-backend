const { z } = require("zod");

const signupSchema = z.object({
  student: z
    .string({ required_error: "Name is required" })
    .trim()
    .min(3, { message: "At least 3 characters required" })
    .max(200, { message: "Maximum 200 characters allowed" }),

  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email format" })
    .max(200, { message: "Maximum 200 characters allowed" }),

  course: z
    .string({ required_error: "Course is required" })
    .trim()
    .min(2, { message: "Course name too short" })
    .max(100, { message: "Maximum 100 characters allowed" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" })
    .max(100, { message: "Password too long" }),

  role: z
    .enum(["Admin", "Student"])
    .optional()
    .default("Student"),
});

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email format" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(1, { message: "Password is required" }),
});

module.exports = { signupSchema, loginSchema };