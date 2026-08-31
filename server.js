const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const goalRoutes = require("./routes/goalRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const connectDB = require("./config/db");

connectDB();

app.use("/auth", authRoutes);
app.use("/goals", goalRoutes);
app.use("/profile", profileRoutes);

app.get("/", (req, res) => {
    res.send("Student Management Server is running");
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});