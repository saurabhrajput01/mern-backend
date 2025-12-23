const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const authRouter = require("./router/auth-router");
const studentRouter = require("./router/student-router");
require("dotenv").config();
const db = require("./utils/db");
const errormiddleware = require("./middleware/errormidleware");

app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/students", studentRouter);

app.use(errormiddleware);
const PORT = 5000;
db();
app.listen(PORT,()=>{
    console.log("server is running")
});
